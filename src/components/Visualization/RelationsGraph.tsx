import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './index.css';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { RelationsGraph_data as GraphData } from './__generated__/RelationsGraph_data.graphql';

type NodeTypes = 'location' | 'person';

interface SimulationLink {
  source: {id: string; x: number; y: number};
  target: {id: string; x: number; y: number};
}

type SimulationNode = (PersonNode | LocationNode) & {
  x: number;
  y: number;
  weight: number;
}
type PersonNode = GraphData['relations']['edges'][0]['node']['person'] & {type: 'person'}

type LocationNode = GraphData['relations']['edges'][0]['node']['locationInstance'] & {type: 'location'}

interface LocationTypeToggleInfo {
  enabled: boolean;
  name: string;
}

interface LocationTypesTogglesState {
  [key: string]: LocationTypeToggleInfo;
}

/**
 * @param props
 */
function RelationsGraph(props: {
  data: GraphData;
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);
  const [locationTypesToggles, setLocationTypesToggles] = useState<LocationTypesTogglesState>(
    props.data.locationTypes.reduce((acc, val) => ({
      ...acc,
      [val.id]: {
        enabled: true,
        name: val.name,
      },
    }), {})
  );

  const drag = (simulation: d3.Simulation<SimulationNode, undefined>): d3.DragBehavior<SVGCircleElement, SimulationNode, SimulationNode | d3.SubjectPosition> => {
    /**
     * @param d
     */
    function dragstarted(d: d3.SimulationNodeDatum): void {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    /**
     * @param d
     */
    function dragged(d: d3.SimulationNodeDatum): void {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    /**
     * @param d
     */
    function dragended(d: d3.SimulationNodeDatum): void {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    return d3.drag<SVGCircleElement, SimulationNode>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  useEffect(() => {
    const width = 1000;
    const height = 600;
    const svg = d3.select(plotRef.current).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0, 0, ${width * 3}, ${height * 3}`);

    const g = svg.append('g');

    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([ [0, 0], [width, height] ])
      .scaleExtent([0, 8])
      .on('zoom', () => g.attr('transform', d3.event.transform)));

    const links: d3.SimulationLinkDatum<SimulationNode>[] = [];

    const persons: Record<string, { id: string; type: NodeTypes; weight: number }> = {};
    const locations: Record<string, { id: string; type: NodeTypes; weight: number }> = {};
    const relations: Record<string, string[]> = {};

    props.data.relations.edges.forEach(relationEdge => {
      const relation = relationEdge.node;

      if (!relation.person || !relation.locationInstance) {
        return;
      }

      if (relations[relation.person.id]) {
        relations[relation.person.id].push(relation.locationInstance.id);
      } else {
        relations[relation.person.id] = [ relation.locationInstance.id ];
      }

      if (relations[relation.locationInstance.id]) {
        relations[relation.locationInstance.id].push(relation.person.id);
      } else {
        relations[relation.locationInstance.id] = [ relation.person.id ];
      }

      if (!persons[relation.person.id]) {
        persons[relation.person.id] = {
          ...relation.person,
          type: 'person',
          weight: 1,
        };
      } else {
        persons[relation.person.id].weight++;
      }

      if (!locations[relation.locationInstance.id]) {
        locations[relation.locationInstance.id] = {
          ...relation.locationInstance,
          type: 'location',
          weight: 1,
        };
      } else {
        locations[relation.locationInstance.id].weight++;
      }

      links.push({
        source: relation.person.id,
        target: relation.locationInstance.id,
      });
    });

    const nodes = [...Object.values(persons), ...Object.values(locations)];

    const linkForce = d3.forceLink<SimulationNode, d3.SimulationLinkDatum<SimulationNode>>(links)
      .id((d) => d.id)
      .distance(100);
    const simulation = d3.forceSimulation(nodes as unknown as SimulationNode[])
      .force('link', linkForce)
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide<SimulationNode>()
        .radius((d) => 10 + d.weight * 0.6)
        .iterations(2))
      .force('center', d3.forceCenter(width * 3 / 2, height * 3 / 2));

    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('a simple tooltip');

    const link = g.append('g')
      .style('stroke', '#aaa')
      .selectAll('line')
      .data(linkForce.links() as SimulationLink[])
      .enter()
      .append('line');

    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(simulation.nodes())
      .enter()
      .append('circle')
      .attr('r', (d) => 10 + d.weight * 0.6)
      .style('fill', (d) => d.type === 'location' ? '#ffd248' : '#90a2fc')
      .style('stroke', '#424242')
      .style('stroke-width', '1px')
      .style('cursor', 'pointer')
      .on('mouseover', d => {
        tooltip
          .style('visibility', 'visible')
          .text(d.type === 'location' ? d.name || '' : `${d.lastName} ${d.firstName} ${d.patronymic}`)
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mousemove', () => {
        tooltip
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip
          .style('visibility', 'hidden');
      })
      .on('click', function (d) {
        const currentDatum = d.id;

        link.style('stroke', (_d) =>
          (_d.source.id === currentDatum || _d.target.id === currentDatum) ? '#ff0000' : '#aaa');
        node.style('stroke', (_d) =>
          relations[currentDatum].findIndex(rel => rel === _d.id) >= 0 ? '#ff0000' : '#424242');
        d3.select(this)
          .style('stroke', '#ff0000');
      })
      .call(drag(simulation));

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  }, []);

  useEffect(() => {
    console.log('effect');
  }, [ locationTypesToggles ]);

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Relations graph</h2>
      <div className={'visualization-block__content'} ref={plotRef}/>
      <div>
        <div>
          {Object.entries(locationTypesToggles).map(([id, locType]) => (
            <React.Fragment key={id}>
              <input id={'graph-filter' + id} type={'checkbox'} checked={locType.enabled} onChange={(): void => setLocationTypesToggles({
                ...locationTypesToggles,
                [id]: {
                  name: locType.name,
                  enabled: !locType.enabled,
                },
              })}/> <label htmlFor={'graph-filter' + id}>{locType.name}</label> <br/>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default createFragmentContainer(RelationsGraph, {
  data: graphql`
    fragment RelationsGraph_data on Query {
      relations {
        edges {
          node {
            id
            person {
              id
              lastName
              firstName
              patronymic
            }
            locationInstance {
              id
              name
              locationTypes {
                id
              }
            }
          }
        }
      }
      locationTypes {
        id
        name
      }
    }
  `,
});
