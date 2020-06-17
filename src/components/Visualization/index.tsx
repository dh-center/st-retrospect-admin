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
      <NavLink to={'/'} className={'visualization-page__link-back'}>
        <svg className="bi bi-arrow-return-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M5.854 5.646a.5.5 0 0 1 0 .708L3.207 9l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd"
                d="M13.5 2.5a.5.5 0 0 1 .5.5v4a2.5 2.5 0 0 1-2.5 2.5H3a.5.5 0 0 1 0-1h8.5A1.5 1.5 0 0 0 13 7V3a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </NavLink>
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
