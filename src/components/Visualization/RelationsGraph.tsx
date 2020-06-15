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
 */
export default function RelationsGraph(): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  const drag = (simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>): d3.DragBehavior<SVGCircleElement, SimulationNode, SimulationNode | d3.SubjectPosition> => {
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

    const nodes = [
      {
        x: width / 3 - 50,
        y: height / 2 - 50,
      },
      {
        x: width / 3,
        y: height / 2,
      },
      {
        x: 2 * width / 3,
        y: height / 2,
      },
    ];

    const links: d3.SimulationLinkDatum<d3.SimulationNodeDatum>[] = [
      {
        source: 0,
        target: 1,
      },
    ];

    const linkForce = d3.forceLink().distance(100)
      .strength(10)
      .strength(1);
    const simulation = d3.forceSimulation()
      .force('link', linkForce)
      .force('charge', d3.forceManyBody()
        .strength(-100)
        .distanceMax(150)
      );
    // .force('center', d3.forceCenter(width / 2, height / 2));

    /**
     * @param graph
     */
    function run(graph: {
      nodes: SimulationNode[];
      links: typeof links;
    }): void {
      const link = svg.append('g')
        .style('stroke', '#aaa')
        .selectAll('line')
        .data(graph.links)
        .enter()
        .append('line');

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('r', 16)
        .style('fill', '#efefef')
        .style('stroke', '#424242')
        .style('stroke-width', '1px')
        .call(drag(simulation));

      simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

      linkForce.links(graph.links);

      /**
       *
       */
      function ticked(): void {
        (link as d3.Selection<SVGLineElement, SimulationLink, SVGElement, unknown>)
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      }
    }

    run({
      nodes,
      links,
    });
  });

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Relations graph</h2>
      <div className={'visualization-block__content'} ref={plotRef}/>
    </div>
  );
}
