import React, { useEffect, useRef } from 'react';
import extractYear from '../../utils/extractYear';
import YearPeriods from '../../utils/periods';
import * as d3 from 'd3';
import './index.css';

/**
 * Generates color based on provided string
 *
 * @param str - string to calculate color
 */
function strToColor(str: string): string {
  let hash = 0;

  if (str.length === 0) {
    return hash.toString();
  }
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;

    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}

/**
 * @param props - props for component rendering
 */
export default function PersonLifeYearsDiagram(props: {
  persons: {
    birthDate: string | null;
    deathDate: string | null;
  }[];
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  /**
   * Returns an event handler for fading a given chord group
   *
   * @param svg - svg element with plot
   * @param opacity - opacity to set
   */
  const fade = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, opacity: number): d3.ValueFn<d3.BaseType, unknown, void> => {
    return function (_d: unknown, index: number): void {
      (svg.selectAll('path.chord') as d3.Selection<SVGPathElement, d3.Chord, SVGElement, d3.Chords>)
        .filter((d) => d.source.index !== index && d.target.index !== index)
        .transition()
        .style('stroke-opacity', opacity)
        .style('fill-opacity', opacity);
    };
  };

  /**
   * Generates ticks labels
   *
   * @param d - chord groups data
   */
  const groupTicks = (d: d3.ChordGroup): {
    angle: number;
    label: number | null;
  }[] => {
    const k = (d.endAngle - d.startAngle) / d.value;

    return d3.range(0, d.value, 10).map((v, i) => ({
      angle: v * k + d.startAngle,
      label: i % 5 ? null : v,
    })
    );
  };

  useEffect(() => {
    const birthDates = props.persons.map(person => person.birthDate && extractYear(person.birthDate)).filter(Boolean) as number[];
    const deathDates = props.persons.map(person => person.deathDate && extractYear(person.deathDate)).filter(Boolean) as number[];

    const minYear = Math.min(...birthDates, ...deathDates);
    const maxYear = Math.max(...birthDates, ...deathDates);
    const YEARS_IN_PERIOD = 30;
    const periods = new YearPeriods(minYear, maxYear, YEARS_IN_PERIOD);

    const periodsCount = periods.periodsCount;
    const periodNames = new Array(periodsCount).fill(0)
      .map((el, index) => periods.getPeriodFromNumber(index));

    periodNames.push('Unknown');
    const periodColors = periodNames.map(name => strToColor(name));

    const matrix: number[][] = new Array(periodsCount + 1)
      .fill(0)
      .map(() => new Array(periodsCount + 1).fill(0));

    props.persons.forEach(person => {
      const birthYear = person.birthDate && extractYear(person.birthDate);
      const deathYear = person.deathDate && extractYear(person.deathDate);

      const birthYearPeriodIndex = birthYear ? periods.getPeriodNumberFromYear(birthYear) : periodsCount;
      const deathYearPeriodIndex = deathYear ? periods.getPeriodNumberFromYear(deathYear) : periodsCount;

      matrix[birthYearPeriodIndex][deathYearPeriodIndex]++;
      matrix[deathYearPeriodIndex][birthYearPeriodIndex]++;
    });

    const innerRadius = 350;
    const borderRadius = 10;
    const plotRadius = innerRadius + borderRadius;
    const margin = 120;
    const plotSize = (plotRadius + margin) * 2;
    const baseOpacity = 0.80;

    /**
     * Create the svg area
     */
    const svg = d3.select(plotRef.current)
      .append('svg')
      .attr('width', plotSize)
      .attr('height', plotSize)
      .append('g')
      .attr('transform', `translate(${plotSize / 2} ${plotSize / 2})`);

    /**
     * Give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
     */
    const res = d3.chord()
      .padAngle(0.05)(matrix);

    /**
     * Add the groups on the inner part of the circle
     */
    const g = svg
      .selectAll('g.group')
      .data(res.groups)
      .enter()
      .append('g')
      .attr('class', 'group');

    g.append('path')
      .attr('d', (d) =>
        d3.arc()({
          innerRadius: innerRadius,
          outerRadius: plotRadius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        })
      )
      .style('stroke', (d) => periodColors[d.index])
      .style('fill', (d) => periodColors[d.index]);

    /**
     * Add period names
     */
    g.append('text')
      .attr('dy', '.35em')
      .attr('class', 'titles')
      .attr('text-anchor', function (d) {
        const angle = (d.startAngle + d.endAngle) / 2;

        return angle > Math.PI ? 'end' : null;
      })
      .attr('transform', function (d) {
        const angle = (d.startAngle + d.endAngle) / 2;

        return 'rotate(' + (angle * 180 / Math.PI - 90) + ')' +
          'translate(' + (plotRadius + 25) + ')' +
          (angle > Math.PI ? 'rotate(180)' : '');
      })
      .text(function (d, i) {
        return periodNames[i];
      });

    /**
     * Add the links between groups
     */
    svg
      .datum(res)
      .append('g')
      .selectAll('path')
      .data(d => d)
      .enter()
      .append('path')
      .attr('d', d3.ribbon()
        .radius(innerRadius) as never
      )
      .style('stroke', (d) =>
        d3.rgb(periodColors[d.source.index])
          .darker()
          .hex()
      )
      .style('fill', function (d) {
        return periodColors[d.source.index];
      })
      .style('stroke-opacity', baseOpacity)
      .style('fill-opacity', baseOpacity)
      .attr('class', 'chord');

    d3.selectAll('.group')
      .on('mouseover', fade(svg, 0.02))
      .on('mouseout', fade(svg, baseOpacity));

    /**
     * Initiate tics
     */
    const ticks = g
      .append('g')
      .attr('class', function (d) {
        return 'ticks ' + periodNames[d.index];
      })
      .selectAll('g')
      .attr('class', 'ticks')
      .data(groupTicks)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        return `rotate(${d.angle * 180 / Math.PI - 90})translate(${plotRadius},0)`;
      });

    /**
     *  Append the tick around the arcs
     */
    ticks.append('line')
      .attr('x1', 1)
      .attr('y1', 0)
      .attr('x2', 5)
      .attr('y2', 0)
      .attr('class', 'ticks')
      .style('stroke', '#000');

    /**
     * Add the labels for the %'s
     */
    ticks.append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('class', 'tickLabels')
      .attr('transform', function (d) {
        return d.angle > Math.PI ? 'rotate(180)translate(-16)' : null;
      })
      .style('text-anchor', function (d) {
        return d.angle > Math.PI ? 'end' : null;
      })
      .style('font-size', 8)
      .text(function (d) {
        return d.label;
      });
  });

  return (
    <div className={'visualization-block'}>
      <div className={'visualization-block__content'}>
        <div ref={plotRef}/>
      </div>
    </div>
  );
}
