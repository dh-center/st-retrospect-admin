/* eslint-disable quote-props */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import YearPeriods from '../../utils/periods';
import extractYear from '../../utils/extractYear';
import './index.css';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsTreeMap_data as PersonsTreeMapData } from './__generated__/PersonsTreeMap_data.graphql';

const professionsKeywords = {
  'писатель': /поэт|писательница|писатель|прозаик|публицист|драмматург/,
  'художник': /художник|живописец|художница/,
  'архитектор': /архитектор/,
  'композитор': /композитор|пианист|скрипач/,
  'музыкант': /музыкант/,
  'учёный': /лингвист|учёный|ученый|учёная|ученая|физик|химик|профессор|математик|историк|филолог|физиолог|геолог|палеонтолог|генетик|ботаник|онколог|биолог|литературовед|искусствовед/,
  'актёр': /актёр|актер|актриса|артист|артистка/,
  'политический деятель': /княгиня|граф|императрица|государственный деятель|политик|дипломат|политический деятель/,
  'певец': /певец|певица/,
  'военный': /полководец|лётчик|капитан|военачальник|генерал|лейтенант|флигель-адъютант|военно|флотоводец|адмирал|офицер/,
  'священнослужитель': /епископ|архиепископ|священник|архимандрит|полковник/,
  'скульптор': /скульптор/,
};

/**
 * Displays barplot with count of persons by birth date
 *
 * @param props - component props for rendering
 */
function PersonsTreeMap(props: {
 data: PersonsTreeMapData;
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);
  const [legend, setLegend] = useState<Record<string, string>>({});

  useEffect(() => {
    const width = 954;
    const height = 954;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    interface NodeData {
      name: string;
      children?: NodeData[];
      value: number;
    }

    const data: NodeData = {
      name: 'root',
      children: [],
      value: 0,
    };

    const birthYears = props.data.persons.edges
      .map(edge => edge.node.birthDate && extractYear(edge.node.birthDate))
      .filter(Boolean) as number[];

    const minBirthYear = Math.min(...birthYears);
    const maxBirthYear = Math.max(...birthYears);

    const YEARS_IN_PERIOD = 30;

    const yearPeriods = new YearPeriods(minBirthYear, maxBirthYear, YEARS_IN_PERIOD);
    const periods = yearPeriods.fillPeriods();

    periods['unknown'] = 0;

    const dataByProfession = Object.keys(professionsKeywords)
      .reduce<Record<string, NodeData>>(
        (acc, val) => {
          acc[val] = {
            name: val,
            value: 0,
            children: Object.keys(periods).map(period => ({
              name: period,
              value: 0,
            })),
          };

          return acc;
        },
        {
          'другие': {
            name: 'другие',
            value: 0,
            children: Object.keys(periods).map(period => ({
              name: period,
              value: 0,
            })),
          },
        }
      );

    props.data.persons.edges.forEach((val) => {
      const person = val.node;
      const birthYear = person.birthDate && extractYear(person.birthDate);
      const period = birthYear ? yearPeriods.getPeriodFromYear(birthYear) : 'unknown';

      if (!person.profession) {
        dataByProfession['другие'].value++;
        const periodToInc = dataByProfession['другие'].children?.find(ch => ch.name === period);

        if (periodToInc) {
          periodToInc.value++;
        }

        return;
      }

      let finded = false;

      Object.entries(professionsKeywords).forEach(([profession, regexp]) => {
        if (!person.profession) {
          return;
        }
        person.profession.split(',').forEach(prof => {
          if (regexp.test(prof.toLowerCase())) {
            finded = true;
            dataByProfession[profession].value++;
            const periodToInc = dataByProfession[profession].children?.find(ch => ch.name === period);

            if (periodToInc) {
              periodToInc.value++;
            }
          }
        });
      });

      if (!finded) {
        dataByProfession['другие'].value++;
        const periodToInc = dataByProfession['другие'].children?.find(ch => ch.name === period);

        if (periodToInc) {
          periodToInc.value++;
        }
      }
    });

    Object.values(dataByProfession).forEach(value => {
      value.children = value.children?.filter(ch => ch.value > 0);
    });

    data.children = Object.values(dataByProfession).map(val => ({
      name: val.name,
      value: val.value,
      children: val.children,
    }));

    setLegend(Object.values(dataByProfession).reduce((acc, val) => ({
      ...acc,
      [val.name]: color(val.name),
    }), {}));

    data.value = data.children.reduce((acc, val) => acc + val.value, 0);

    const hierarchy = d3.hierarchy(data);

    const root = d3.treemap<typeof data>()
      .tile(d3.treemapSquarify)
      .size([width, height])
      .padding(1)
      .round(true)(hierarchy);

    const svg = d3.select(plotRef.current)
      .append('svg')
      .attr('viewBox', `0, 0, ${width}, ${height}`);

    svg
      .selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('stroke', 'black')
      .attr('fill', d => {
        while (d.depth > 1) {
          if (d.parent === null) {
            break;
          }
          d = d.parent;
        }

        return color(d.data.name);
      })
      .append('title')
      .text(d => `${d.ancestors().reverse()
        .filter(_d => _d.data.name !== 'root')
        .map(_d => _d.data.name)
        .join('/')}\n${(d.value)}`);

    svg
      .selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
      .attr('x', d => d.x0 + 10) // +10 to adjust position (more right)
      .attr('y', d => d.y0 + 20) // +20 to adjust position (lower)
      .text(d => d.data.name)
      .attr('font-size', '10px')
      .attr('fill', 'white');

    // eslint-disable-next-line
  }, []);

  return (
    <div className='visualization-block'>
      <h2 className='visualization-block__header'>Persons tree map</h2>
      <div className='visualization-block__content'>
        <div className='visualization-block__plot' ref={plotRef}/>
        <div className='visualization-block__legend'>
          {Object.entries(legend).map(([prof, color]) => {
            return (
              <div key={prof}>
                <div style={{
                  backgroundColor: color,
                  width: '10px',
                  height: '10px',
                }}/>
                {prof}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default createFragmentContainer(PersonsTreeMap, {
  data: graphql`
    fragment PersonsTreeMap_data on Query {
      persons {
        edges {
          node {
            profession
            birthDate
          }
        }
      }
    }`,
});
