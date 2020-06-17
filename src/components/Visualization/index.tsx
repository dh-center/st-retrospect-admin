import React from 'react';
import { NavLink } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { VisualizationPageQuery, VisualizationPageQueryResponse } from './__generated__/VisualizationPageQuery.graphql';
import PersonsBirthDatesBarplot from './PersonsBirthDatesBarplot';
import PersonsLifeYearsDiagram from './PersonsLifeYearsDiagram';
import './index.css';
import { Carousel } from 'react-bootstrap';

/**
 * Page with plots for visualisation of Database content
 */
export default function VisualizationPage(): React.ReactElement {
  return (
    <div className={'visualization-page'}>
      <h1>Visualization</h1>
      <NavLink to={'/'} className={'visualization-page__link-back'}>Return back</NavLink>
      <QueryRenderer<VisualizationPageQuery>
        environment={environment}
        query={graphql`
          query VisualizationPageQuery {
            persons {
              edges {
                node {
                  birthDate
                  deathDate
                }
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props }: { error: Error | null; props: VisualizationPageQueryResponse | null }): React.ReactNode => {
          if (error) {
            return (
              <div>
                <pre>
                  Error during loading page
                  {error.toString()}
                </pre>
              </div>
            );
          }

          if (!props) {
            return <div>Loading</div>;
          }

          return (
            <Carousel>
              <Carousel.Item>
                <div className="visualization-page__slide">
                  <PersonsBirthDatesBarplot
                    dates={props.persons.edges.map(edge => edge.node.birthDate)}
                  />
                </div>
                <Carousel.Caption>
                  <h5>Count of persons by birth date</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="visualization-page__slide">
                  <PersonsLifeYearsDiagram
                    persons={props.persons.edges.map(edge => edge.node)}
                  />
                </div>
                <Carousel.Caption>
                  <h5>Persons life years diagram</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          );
        }}
      />
    </div>
  );
}
