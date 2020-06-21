import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import YearPeriods from '../../utils/periods';
import extractYear from '../../utils/extractYear';
import './index.css';

/**
 * Displays pie chart with distribution of persons sex
 *
 * @param props - component props for rendering
 */
export default function SexPieChart(props: {
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
    const width = 450;

    const height = 450;
    const margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    /**
     * Append the svg object to the body of the page
     */
    const svg = d3.select(plotRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal<string, string>()
      .domain(Object.keys(groupedByPeriods))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), Object.keys(groupedByPeriods).length).reverse());

    const pie = d3.pie<{key: string; value: number}>()
      .value(function (d) {
        return d.value;
      });
    const dataReady = pie(d3.entries(groupedByPeriods));

    svg
      .selectAll('whatever')
      .data(dataReady)
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
        return color(d.data.key);
      })
      .attr('stroke', 'black')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);
  }, []);

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Count of persons by birth date</h2>
      <div className={'visualization-block__content'} ref={plotRef}/>
    </div>
  );
}
