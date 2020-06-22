/* eslint-disable quote-props */
import React, { useEffect, useRef } from 'react';
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

interface DataByYear {
  [key: string]: number;
}

interface DataByProfession {
  [key: string]: DataByYear;
}

/**
 * Displays barplot with count of persons by birth date
 *
 * @param props - component props for rendering
 */
function PersonsTreeMap(props: {
 data: PersonsTreeMapData;
}): React.ReactElement {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 954;
    const height = 954;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    interface Data {
      name: 'root';
      children: {
        name: string;
        value: number;
      }[];
      value: number;
    }

    const data: Data = {
      name: 'root',
      'children': [],
      value: 0,
    };

    const dataByProfession = Object.keys(professionsKeywords).reduce<Record<string, number>>((acc, val) => {
      acc[val] = 0;

      return acc;
    }, { 'другие': 0 });

    props.data.persons.edges.forEach((val) => {
      const person = val.node;

      if (!person.profession) {
        dataByProfession['другие']++;

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
            dataByProfession[profession]++;
          }
        });
      });

      if (!finded) {
        dataByProfession['другие']++;
        console.log(person.profession);
      }
    });

    console.log(dataByProfession);
    data.children = Object.entries(dataByProfession).map(entry => ({
      name: entry[0],
      value: entry[1],
    }));

    const hierarchy = d3.hierarchy(data).sum(d => d.value);

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
      });

    svg
      .selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
      .attr('x', d => d.x0 + 10) // +10 to adjust position (more right)
      .attr('y', d => d.y0 + 20) // +20 to adjust position (lower)
      .text(d => d.data.name)
      .attr('font-size', '15px')
      .attr('fill', 'white');
  }, []);

  return (
    <div className={'visualization-block'}>
      <h2 className={'visualization-block__header'}>Persons tree map</h2>
      <div className={'visualization-block__content'}>
        <div className='visualization-block__plot' ref={plotRef}/>
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
          }
        }
      }
    }`,
});
