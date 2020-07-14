import { GraphQLTaggedNode, QueryRenderer } from 'react-relay';
import React from 'react';
import { EntityInfoComponentProps } from '../../types/entities';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { OperationType } from 'relay-runtime';

interface Operation<T> extends OperationType {
  readonly variables: {
    id: string;
  };
  readonly response: {
    entity: T;
  };
}

/**
 * Return create component with Info fields
 *
 * @param InfoComponent - wrapped component
 * @param query - creating mutation
 * @param componentName - info component name for debugging messages
 */
export default function makeViewPage<P extends object>(
  InfoComponent: React.ComponentType<EntityInfoComponentProps<P>>,
  query: GraphQLTaggedNode,
  componentName?: string
): React.FC {
  componentName = InfoComponent.displayName ?? InfoComponent.name;

  /**
   * Wrapper for info-component for displaying entity info
   */
  function ViewPage(): React.ReactElement {
    const { id } = useParams();

    return (
      <QueryRenderer<Operation<P>>
        environment={environment}
        query={query}
        variables={{ id }}
        render={({ error, props }): React.ReactNode => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }

          return (
            <div className='d-flex justify-content-center' >
              <div
                style={{
                  maxWidth: '800px',
                  width: '100%',
                }}
              >
                <InfoComponent viewOnly entity={props.entity}/>
              </div>
            </div>
          );
        }}
      />
    );
  }
  ViewPage.displayName = `makeViewPage(${componentName})`;

  return ViewPage;
}
