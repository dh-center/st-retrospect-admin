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
  'писатель': [ 'поэт' ],
  'художник': [ 'художник' ],
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

    const data = {
      'children': [
        {
          'name': 'boss1',
          'children': [ {
            'name': 'mister_a',
            'group': 'A',
            'value': 28,
            'colname': 'level3',
          }, {
            'name': 'mister_b',
            'group': 'A',
            'value': 19,
            'colname': 'level3',
          }, {
            'name': 'mister_c',
            'group': 'C',
            'value': 18,
            'colname': 'level3',
          }, {
            'name': 'mister_d',
            'group': 'C',
            'value': 19,
            'colname': 'level3',
          } ],
          'colname': 'level2',
        }, {
          'name': 'boss2',
          'children': [ {
            'name': 'mister_e',
            'group': 'C',
            'value': 14,
            'colname': 'level3',
          }, {
            'name': 'mister_f',
            'group': 'A',
            'value': 11,
            'colname': 'level3',
          }, {
            'name': 'mister_g',
            'group': 'B',
            'value': 15,
            'colname': 'level3',
          }, {
            'name': 'mister_h',
            'group': 'B',
            'value': 16,
            'colname': 'level3',
          } ],
          'colname': 'level2',
        }, {
          'name': 'boss3',
          'children': [ {
            'name': 'mister_i',
            'group': 'B',
            'value': 10,
            'colname': 'level3',
          }, {
            'name': 'mister_j',
            'group': 'A',
            'value': 13,
            'colname': 'level3',
          }, {
            'name': 'mister_k',
            'group': 'A',
            'value': 13,
            'colname': 'level3',
          }, {
            'name': 'mister_l',
            'group': 'D',
            'value': 25,
            'colname': 'level3',
          }, {
            'name': 'mister_m',
            'group': 'D',
            'value': 16,
            'colname': 'level3',
          }, {
            'name': 'mister_n',
            'group': 'D',
            'value': 28,
            'colname': 'level3',
          } ],
          'colname': 'level2',
        } ],
      'name': 'CEO',
      value: 0,
    };

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
