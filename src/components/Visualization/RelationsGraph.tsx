import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './index.css';

interface SimulationLink {
  source: {x: number; y: number};
  target: {x: number; y: number};
}

interface SimulationNode {
  x: number; y: number;
}

/**
 * @param props
 */
export default function RelationsGraph(props: {
  persons: {
    birthDate: string | null;
    deathDate: string | null;
    readonly relations: ReadonlyArray<{
      readonly locationInstance: {
        readonly id: string;
      } | null;
    }>;
  }[];
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
    const width = 640;
    const height = 480;
    const svg = d3.select(plotRef.current).append('svg')
      .attr('width', width)
      .attr('height', height);

    const nodes = props.persons.map(person => ({
      ...person,
    }));

    const links: d3.SimulationLinkDatum<SimulationNode>[] = [
      // {
      //   source: 0,
      //   target: 1,
      // },
    ];

    const linkForce = d3.forceLink(links).distance(100)
      .strength(1000);

    const simulation = d3.forceSimulation(nodes as unknown as SimulationNode[])
      .force('link', linkForce)
      .force('charge', d3.forceManyBody()
        .strength(-100)
        .distanceMax(150)
      );
    // .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .style('stroke', '#aaa')
      .selectAll('line')
      .data(linkForce.links() as SimulationLink[])
      .enter()
      .append('line');

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(simulation.nodes())
      .enter()
      .append('circle')
      .attr('r', 16)
      .style('fill', '#efefef')
      .style('stroke', '#424242')
      .style('stroke-width', '1px')
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
