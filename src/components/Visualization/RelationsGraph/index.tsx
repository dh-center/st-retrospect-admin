/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './index.css';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { RelationsGraph_data as GraphData } from './__generated__/RelationsGraph_data.graphql';
import { Accordion, Button, Card } from 'react-bootstrap';
type NodeTypes = 'location' | 'person';

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode>{
  source: SimulationNode | string;
  target: SimulationNode | string;
}

interface AbstractSimulationNode extends d3.SimulationNodeDatum{
  id: string;
  x?: number;
  y?: number;
  weight: number;
  type: NodeTypes;
}

interface PersonNode extends AbstractSimulationNode {
  type: 'person';
  firstName: string | null;
  lastName: string | null;
  patronymic: string | null;
}

interface LocationType {
  readonly id: string;
}

interface LocationNode extends AbstractSimulationNode{
  name: string | null;
  readonly locationTypes: readonly (LocationType)[];
  type: 'location';
}

type SimulationNode = PersonNode | LocationNode;

interface LocationTypeToggleInfo {
  enabled: boolean;
  name: string;
}

interface LocationTypesTogglesState {
  [key: string]: LocationTypeToggleInfo;
}

/**
 * Graph for visualization relations between persons and locations
 *
 * @param props - props for component rendering
 */
function Index(props: {
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
  const nodes = useRef<SimulationNode[]>([]);
  const linkForce = useRef<d3.ForceLink<SimulationNode, SimulationLink> | null>(null);
  const simulation = useRef<d3.Simulation<SimulationNode, SimulationLink> | null>(null);
  const node = useRef<d3.Selection<d3.BaseType, SimulationNode, SVGGElement, unknown>>();
  const tooltip = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, unknown>>();
  const link = useRef<d3.Selection<SVGLineElement, SimulationLink, SVGGElement, unknown>>();
  const links = useRef<SimulationLink[]>([]);

  /**
   * Handler for node's drag events
   *
   * @param sim - force simulation that calculates nodes position
   */
  const drag = (sim: d3.Simulation<SimulationNode, undefined>): d3.DragBehavior<SVGCircleElement, SimulationNode, SimulationNode | d3.SubjectPosition> => {
    /**
     * Handler for started drag event
     *
     * @param d - node data
     */
    function dragstarted(d: d3.SimulationNodeDatum): void {
      if (!d3.event.active) {
        sim.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    /**
     * Handler for started dragging
     *
     * @param d - node data
     */
    function dragged(d: d3.SimulationNodeDatum): void {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    /**
     * Handler for ending drag event
     *
     * @param d - node data
     */
    function dragended(d: d3.SimulationNodeDatum): void {
      if (!d3.event.active) {
        sim.alphaTarget(0);
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
      .attr('viewBox', `0 0 ${width * 3} ${height * 3}`);

    const g = svg.append('g');

    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([ [0, 0], [width, height] ])
      .scaleExtent([0, 8])
      .on('zoom', () => g.attr('transform', d3.event.transform)));

    linkForce.current = d3.forceLink<SimulationNode, SimulationLink>()
      .id((d) => d.id)
      .distance(100);

    simulation.current = d3.forceSimulation(nodes.current)
      .force('link', linkForce.current)
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide<SimulationNode>()
        .radius((d) => 10 + d.weight * 0.6)
        .iterations(2))
      .force('center', d3.forceCenter(width * 3 / 2, height * 3 / 2));

    tooltip.current = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('top', '0')
      .style('color', 'white')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('a simple tooltip');

    link.current = g.append('g')
      .style('stroke', '#aaa')
      .selectAll('line');

    node.current = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle');

    simulation.current.on('tick', () => {
      link.current!
        .attr('x1', d => (d.source as SimulationNode).x!)
        .attr('y1', d => (d.source as SimulationNode).y!)
        .attr('x2', d => (d.target as SimulationNode).x!)
        .attr('y2', d => (d.target as SimulationNode).y!);

      node.current!
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    links.current = [];
    const persons: Record<string, PersonNode> = {};
    const locations: Record<string, LocationNode> = {};
    const relations: Record<string, string[]> = {};

    /**
     * Filter unnecessary nodes and links (e.g. by location types)
     */
    props.data.relations.edges.forEach(relationEdge => {
      const relation = relationEdge.node;

      if (!relation.person || !relation.locationInstance) {
        return;
      }

      const person = relation.person;
      const location = relation.locationInstance;
      const locationTypes = location.locationTypes;

      if (locationTypes && locationTypes.length !== 0) {
        if (locationTypes.findIndex(locType => locType && locationTypesToggles[locType.id].enabled) === -1) {
          return;
        }
      }

      if (relations[person.id]) {
        relations[person.id].push(location.id);
      } else {
        relations[person.id] = [ location.id ];
      }

      if (relations[location.id]) {
        relations[location.id].push(person.id);
      } else {
        relations[location.id] = [ person.id ];
      }

      if (!persons[person.id]) {
        persons[person.id] = {
          ...nodes.current.find(n => n.id === person.id),
          ...person,
          type: 'person',
          weight: 1,
        };
      } else {
        persons[person.id].weight++;
      }

      if (!locations[location.id]) {
        locations[location.id] = {
          ...location,
          ...nodes.current.find(n => n.id === location.id),
          locationTypes: (location.locationTypes ? location.locationTypes.filter(locType => locType && locType.id) : []) as LocationType[],
          type: 'location',
          weight: 1,
        };
      } else {
        locations[location.id].weight++;
      }

      links.current!.push({
        source: person.id,
        target: location.id,
      });
    });

    nodes.current = ([...Object.values(persons), ...Object.values(locations)]);

    node.current = node.current!
      .data(nodes.current, (d) => d.id)
      .join(
        enter => enter.append('circle')
          .attr('r', (d) => 10 + d.weight * 0.6)
          .style('fill', (d) => d.type === 'location' ? '#ffd248' : '#90a2fc')
          .style('stroke', '#424242')
          .style('stroke-width', '1px')
          .style('cursor', 'pointer')
          .on('mouseover', d => {
            tooltip.current!
              .style('visibility', 'visible')
              .text(d.type === 'location' ? d.name || '' : `${d.lastName} ${d.firstName} ${d.patronymic}`)
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('top', (d3.event.pageY - 28) + 'px');
          })
          .on('mousemove', () => {
            tooltip.current!
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('top', (d3.event.pageY - 28) + 'px');
          })
          .on('mouseout', () => {
            tooltip.current!
              .style('visibility', 'hidden');
          })
          .on('click', function (d) {
            const currentDatum = d.id;

            link.current!.style('stroke', (_d) =>
              ((_d.source as SimulationNode).id === currentDatum || (_d.target as SimulationNode).id === currentDatum) ? '#ff0000' : '#aaa');
            node.current!.style('stroke', (_d) =>
              relations[currentDatum].findIndex(rel => rel === _d.id) >= 0 ? '#ff0000' : '#424242');
            d3.select(this)
              .style('stroke', '#ff0000');
          })
          .call(drag(simulation.current!)),
        update => update
          .attr('r', (d) => 10 + d.weight * 0.6)
          .style('stroke', '#424242'),
        exit => exit.remove()
      );

    link.current = link.current!
      .data(links.current, (d) => (d.source as SimulationNode).id + (d.target as SimulationNode).id)
      .join(enter => enter.append('line'),
        update => update.style('stroke', '#aaa'),
        exit => exit.remove()
      );
    simulation.current!.nodes(nodes.current);
    linkForce.current!.links(links.current!);
    simulation.current!.alpha(1).restart();
  }, [locationTypesToggles, nodes, props.data.relations.edges]);

  return (
    <div className='visualization-block relations-graph'>
      <h2 className={'visualization-block__header'}>Relations graph</h2>
      <div className="visualization-block__content">
        <div className='visualization-block__plot' ref={plotRef}/>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Filter by location types
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className='relations-graph__location-types-filter'>
                {Object.entries(locationTypesToggles).map(([id, locType]) => (
                  <div key={id}>
                    <input id={'graph-filter' + id} type='checkbox' checked={locType.enabled} onChange={(): void => setLocationTypesToggles({
                      ...locationTypesToggles,
                      [id]: {
                        name: locType.name,
                        enabled: !locType.enabled,
                      },
                    })}/> <label htmlFor={'graph-filter' + id}>{locType.name}</label> <br/>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

export default createFragmentContainer(Index, {
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
