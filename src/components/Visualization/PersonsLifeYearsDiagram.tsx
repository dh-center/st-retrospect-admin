import React, { useEffect, useRef } from 'react';
import extractYear from '../../utils/extractYear';
import YearPeriods from '../../utils/periods';
import * as d3 from 'd3';

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

  useEffect(() => {
    const birthDates = props.persons.map(person => person.birthDate && extractYear(person.birthDate)).filter(Boolean) as number[];
    const deathDates = props.persons.map(person => person.deathDate && extractYear(person.deathDate)).filter(Boolean) as number[];

    const minYear = Math.min(...birthDates, ...deathDates);
    const maxYear = Math.max(...birthDates, ...deathDates);
    const YEARS_IN_PERIOD = 30;
    const periods = new YearPeriods(minYear, maxYear, YEARS_IN_PERIOD);

    const periodsCount = periods.periodsCount;

    const matrix: number[][] = new Array(periodsCount + 1)
      .fill(0)
      .map(() => new Array(periodsCount + 1).fill(0));

    props.persons.forEach(person => {
      const birthYear = person.birthDate && extractYear(person.birthDate);
      const deathYear = person.deathDate && extractYear(person.deathDate);

      const birthYearPeriodIndex = birthYear ? periods.getPeriodNumberFromYear(birthYear) : periodsCount;
      const deathYearPeriodIndex = deathYear ? periods.getPeriodNumberFromYear(deathYear) : periodsCount;

      matrix[birthYearPeriodIndex][deathYearPeriodIndex]++;
    });

    const innerRadius = 400;
    const borderRadius = 10;
    const plotRadius = innerRadius + borderRadius;
    const margin = 10;
    const plotSize = (plotRadius + margin) * 2;

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
      .padAngle(0.05) // padding between entities (black arc)
      .sortSubgroups(d3.descending)(matrix);

    /**
     * Add the groups on the inner part of the circle
     */
    svg
      .datum(res)
      .append('g')
      .selectAll('g')
      .data(function (d) {
        return d.groups;
      })
      .enter()
      .append('g')
      .append('path')
      .style('fill', 'grey')
      .style('stroke', 'black')
      .attr('d', (d) =>
        d3.arc()({
          innerRadius: innerRadius,
          outerRadius: plotRadius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        })
      );

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
      .style('fill', '#69b3a2')
      .style('stroke', 'black');
  });

  return (
    <div>
      <h2>Persons life years diagram</h2>
      <div ref={plotRef}/>
    </div>
  );
}
