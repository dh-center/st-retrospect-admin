import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * Displays barplot
 *
 * @param props - component props for rendering
 */
export default function PersonsBirthDatesBarplot(props: {
  readonly dates: string[];
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Set the dimensions and margins of the graph
     */
    const margin = {
      top: 10,
      right: 30,
      bottom: 90,
      left: 40,
    };
    const width = 800 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const groupedByDates = props.dates.reduce<Record<number, number>>((acc, curr) => {
      const birthYearString = curr.match(/\d{4}/)?.shift();

      const birthYear = birthYearString && +birthYearString;

      if (birthYear && birthYear > 3000) {
        console.log(birthYearString);
      }
      if (birthYear) {
        if (acc[birthYear]) {
          acc[birthYear]++;
        } else {
          acc[birthYear] = 1;
        }
      }

      return acc;
    }, {});

    const numberKeys = Object.keys(groupedByDates).map(key => +key);

    const YEARS_IN_PERIOD = 20;
    const minBirthYear = Math.min(...numberKeys);

    const getPeriodNumber = (year: number): number => Math.floor((year - minBirthYear) / YEARS_IN_PERIOD);
    const getPeriodStartDate = (periodNumber: number): number => minBirthYear + YEARS_IN_PERIOD * periodNumber;
    const getPeriodEndDate = (periodNumber: number): number => getPeriodStartDate(periodNumber) + YEARS_IN_PERIOD;
    const getPeriod = (year: number): string => {
      const periodNumber = getPeriodNumber(year);

      return `${getPeriodStartDate(periodNumber)}—${getPeriodEndDate(periodNumber)}`;
    };

    const groupedByPeriods = numberKeys.reduce<Record<string, number>>((acc, val) => {
      const period = getPeriod(val);

      if (acc[period]) {
        acc[period] += groupedByDates[val];
      } else {
        acc[period] = groupedByDates[val];
      }

      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(groupedByPeriods));

    /**
     * Append the svg object to the body of the page
     */
    const svg = d3.select(plotRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    /**
     * X axis
     */
    const x = d3.scaleBand()
      .range([0, width])
      .domain(Object.keys(groupedByPeriods))
      .padding(0.2);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0) rotate(-45)')
      .style('text-anchor', 'end');

    /**
     * Y axis
     */
    const y = d3.scaleLinear()
      .domain([0, maxCount])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    /**
     * Bars
     */
    svg.selectAll('mybar')
      .data(Object.keys(groupedByPeriods))
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d) || 0;
      })
      .attr('width', x.bandwidth())
      .attr('fill', '#69b3a2')
      .attr('height', (d) => height - y(groupedByPeriods[d]))
      .attr('y', (d) => y(groupedByPeriods[d]));
  }, [ props.dates ]);

  return (
    <div>
      <h2>Count of persons by birth date</h2>
      <div ref={plotRef}/>
    </div>
  );
}
