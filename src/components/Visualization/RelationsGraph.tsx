import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './index.css';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { RelationsGraph_relations as Relations } from './__generated__/RelationsGraph_relations.graphql';

type NodeTypes = 'location' | 'person';

interface SimulationLink {
  source: {x: number; y: number};
  target: {x: number; y: number};
}

type SimulationNode = (PersonNode | LocationNode) & {
  x: number;
  y: number;
}
type PersonNode = Relations['relations']['edges'][0]['node']['person'] & {type: 'person'}

type LocationNode = Relations['relations']['edges'][0]['node']['locationInstance'] & {type: 'location'}

/**
 * @param props
 */
function RelationsGraph(props: {
  relations: Relations;
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

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
      .attr('height', height);
    // .attr('viewBox', `0, 0, ${width}, ${height}`);

    const g = svg.append('g');

    svg.call(d3.zoom<SVGSVGElement, unknown>()
      .extent([ [0, 0], [width, height] ])
      .scaleExtent([0, 8])
      .on('zoom', () => g.attr('transform', d3.event.transform)));

    const links: d3.SimulationLinkDatum<SimulationNode>[] = [];

    const persons: Record<string, { id: string; type: NodeTypes }> = {};
    const locations: Record<string, { id: string; type: NodeTypes }> = {};

    props.relations.relations.edges.forEach(relationEdge => {
      const relation = relationEdge.node;

      if (!relation.person || !relation.locationInstance) {
        return;
      }

      if (!persons[relation.person.id]) {
        persons[relation.person.id] = {
          ...relation.person,
          type: 'person',
        };
      }

      if (!locations[relation.locationInstance.id]) {
        locations[relation.locationInstance.id] = {
          ...relation.locationInstance,
          type: 'location',
        };
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
      .force('center', d3.forceCenter(width / 2, height / 2));

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

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
      .attr('r', 16)
      .style('fill', (d) => d.type === 'location' ? '#ffd248' : '#90a2fc')
      .style('stroke', '#424242')
      .style('stroke-width', '1px')
      .on('mouseover', function (d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
        tooltip.html(d.type === 'location' ? d.name || '' : `${d.lastName} ${d.firstName} ${d.patronymic}`)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      })
      .call(drag(simulation));

    simulation.on('tick', () => {
      (link)
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  });

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Relations graph</h2>
      <div className={'visualization-block__content'} ref={plotRef}/>
    </div>
  );
}

export default createFragmentContainer(RelationsGraph, {
  relations: graphql`
    fragment RelationsGraph_relations on Query {
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
            }
          }
        }
      }
    }
  `,
});
