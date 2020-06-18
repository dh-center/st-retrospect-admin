import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import YearPeriods from '../../utils/periods';
import extractYear from '../../utils/extractYear';
import './index.css';

/**
 * Displays barplot with count of persons by birth date
 *
 * @param props - component props for rendering
 */
export default function PersonsBirthDatesBarplot(props: {
  readonly dates: (string|null)[];
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const groupedByYears = props.dates.reduce<Record<string, number>>((acc, curr) => {
      if (!curr) {
        if (acc.unknown) {
          acc.unknown++;
        } else {
          acc.unknown = 1;
        }

        return acc;
      }

      const birthYear = extractYear(curr);

      if (birthYear) {
        if (acc[birthYear]) {
          acc[birthYear]++;
        } else {
          acc[birthYear] = 1;
        }
      }

      return acc;
    }, {});

    const numberKeys = Object
      .keys(groupedByYears)
      .map(key => +key)
      .filter(Boolean);

    const YEARS_IN_PERIOD = 30;
    const minBirthYear = Math.min(...numberKeys);
    const maxBirthYear = Math.max(...numberKeys);

    const yearPeriods = new YearPeriods(minBirthYear, maxBirthYear, YEARS_IN_PERIOD);

    const groupedByPeriods = yearPeriods.fillPeriods();

    numberKeys.reduce((acc, val) => {
      const period = yearPeriods.getPeriodFromYear(val);

      if (acc[period]) {
        acc[period] += groupedByYears[val];
      } else {
        acc[period] = groupedByYears[val];
      }

      return acc;
    }, groupedByPeriods);

    if (groupedByYears.unknown) {
      groupedByPeriods.unknown = groupedByYears.unknown;
    }

    const maxCount = Math.max(...Object.values(groupedByPeriods));

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
    svg.selectAll()
      .data(Object.keys(groupedByPeriods))
      .enter()
      .append('rect')
      .attr('x', (d) => x(d) || 0)
      .attr('width', x.bandwidth())
      .attr('fill', '#69b3a2')
      .attr('height', (d) => height - y(groupedByPeriods[d]))
      .attr('y', (d) => y(groupedByPeriods[d]));
  }, [ props.dates ]);

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Count of persons by birth date</h2>
      <div className={'visualization-block__content'}>
        <div ref={plotRef}/>
      </div>
    </div>
  );
}
