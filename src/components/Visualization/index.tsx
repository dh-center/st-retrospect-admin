import React, { useState, useEffect } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { VisualizationPageQuery, VisualizationPageQueryResponse } from './__generated__/VisualizationPageQuery.graphql';
import PersonsBirthDatesBarplot from './PersonsBirthDatesBarplot';
import PersonsLifeYearsDiagram from './PersonsLifeYearsDiagram';
import RelationsGraph from './RelationsGraph';
import './index.css';

/**
 * Page with plots for visualisation of Database content
 */
export default function VisualizationPage(): React.ReactElement {
  const [isPageInFullScreen, changeFullscreenModeStatus] = useState(document.fullscreenElement != null);

  /**
   * Manual fullscreen mode change
   */
  const changeFullscreenMode = async (): Promise<void> => {
    const documentElement = document.documentElement;

    if (!isPageInFullScreen) {
      await documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  /**
   * Handler for click on fullscreen mode button
   */
  const onFullscreenButtonClick = async (): Promise<void> => {
    await changeFullscreenMode();
  };

  useEffect(() => {
    /**
     * Handler for changing fullscreen mode
     */
    document.onfullscreenchange = (): void => {
      changeFullscreenModeStatus(document.fullscreenElement != null);
    };

    /**
     * Handler for F11 button
     * Manual fullscreen mode change
     *
     * @param event - keyboard event
     */
    document.onkeydown = async (event: KeyboardEvent): Promise<void> => {
      event.preventDefault();

      if (event.code === 'F11') {
        await changeFullscreenMode();
      }
    };

    return (): void => {
      document.onfullscreenchange = null;
      document.onkeydown = null;
    };
  });

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
            ...RelationsGraph_data
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
            return <div>Loading...</div>;
          }

          return (
            <Switch>
              <Route path={'/visualization/1'}>
                <NavLink className="visualization-page__prev-link" to={'/visualization/3'}>
                  <svg className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fillRule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </NavLink>
                <PersonsBirthDatesBarplot
                  dates={props.persons.edges.map(edge => edge.node.birthDate)}
                />
                <NavLink className="visualization-page__next-link" to={'/visualization/2'}>
                  <svg className="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                  </svg>
                </NavLink>
              </Route>
              <Route path={'/visualization/2'}>
                <NavLink className="visualization-page__prev-link" to={'/visualization/1'}>
                  <svg className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fillRule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </NavLink>
                <PersonsLifeYearsDiagram
                  persons={props.persons.edges.map(edge => edge.node)}
                />
                <NavLink className="visualization-page__next-link" to={'/visualization/3'}>
                  <svg className="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                  </svg>
                </NavLink>
              </Route>
              <Route path={'/visualization/3'}>
                <NavLink className="visualization-page__prev-link" to={'/visualization/2'}>
                  <svg className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                    <path fillRule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </NavLink>
                <RelationsGraph
                  data={props}
                />
                <NavLink className="visualization-page__next-link" to={'/visualization/1'}>
                  <svg className="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                  </svg>
                </NavLink>
              </Route>
            </Switch>
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
