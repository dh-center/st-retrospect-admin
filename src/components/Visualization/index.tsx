import React, { MouseEvent, useState } from 'react';
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
  const [isPageInFullScreen, changeFullscreenMode] = useState(document.fullscreenElement != null);

  const onFullscreenButtonClick = async (event: MouseEvent): Promise<void> => {
    const documentElement = document.documentElement;

    if (!isPageInFullScreen) {
      await documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    changeFullscreenMode(!isPageInFullScreen);
  };

  return (
    <div className={'visualization-page'}>
      <NavLink to={'/'} className={'visualization-page__link-back'}>
        <svg className="bi bi-arrow-return-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
            d="M5.854 5.646a.5.5 0 0 1 0 .708L3.207 9l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
          <path fillRule="evenodd"
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
            <Carousel interval={null}>
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
      <button className={'visualization-page__fullscreen'} onClick={onFullscreenButtonClick}>
        {isPageInFullScreen
          ? (
            <svg className="bi bi-fullscreen-exit" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
            </svg>
          ) : (
            <svg className="bi bi-fullscreen" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
            </svg>
          )}
      </button>
    </div>
  );
}
