import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getGender } from 'lvovich';
import './index.css';
import { GenderStrT } from 'lvovich/lib/gender';

/**
 * Displays pie chart with distribution of persons sex
 *
 * @param props - component props for rendering
 * @param props.persons - persons data to plot diagram
 */
export default function GenderDistribution(props: {
  readonly persons: {readonly firstName: string | null; readonly lastName: string | null; readonly patronymic: string | null }[];
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = props.persons.reduce((acc, val) => {
      let gender: GenderStrT | 'unknown' | null = getGender({
        last: val.lastName,
      });

      if (gender === 'androgynous' || gender === null) {
        gender = 'unknown';
      }

      return {
        ...acc,
        [gender]: acc[gender] + 1,
      };
    }, {
      male: 0,
      female: 0,
      unknown: 0,
    });

    /**
     * Set the dimensions and margins of the graph
     */
    const width = 450;

    const height = 450;
    const margin = 10;

    const radius = Math.min(width, height) / 2 - margin;

    const labelRadius = radius * 0.7;

    const arcLabel = d3.arc<d3.PieArcDatum<[string, number]>>().innerRadius(labelRadius)
      .outerRadius(labelRadius);

    /**
     * Append the svg object to the body of the page
     */
    const svg = d3.select(plotRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal<string, string>()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10);

    const pie = d3.pie<[string, number]>()
      .value(function (d) {
        return d[1];
      });
    const arcs = pie(Object.entries(data));

    svg
      .selectAll()
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', (d) =>
        d3.arc()({
          innerRadius: 0,
          outerRadius: radius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        })
      )
      .attr('fill', function (d) {
        return color(d.data[0]);
      })
      .attr('stroke', 'black')
      .style('stroke-width', '0px');

    svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .style('text-transform', 'capitalize')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append('tspan')
        .attr('y', '-0.2em')
        // .attr('font-weight', 'bold')
        .text(d => d.data[0])
      )
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .attr('fill-opacity', 0.7)
        .text(d => d.data[1].toLocaleString()));

    // eslint-disable-next-line
  }, []);

  return (
    <div className='visualization-block'>
      <h2 className='visualization-block__header'>Gender distribution</h2>
      <div className='visualization-block__content'>
        <div className='visualization-block__plot' ref={plotRef}/>
      </div>
      <div className='visualization-block__caption'>Genders were calculated via <a href='https://www.npmjs.com/package/lvovich'>lvovich</a> based on persons names</div>
    </div>
  );
}
