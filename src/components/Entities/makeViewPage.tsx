import { GraphQLTaggedNode, QueryRenderer } from 'react-relay';
import React from 'react';
import { EntityInfoComponentProps } from '../../types/entities';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { OperationType } from 'relay-runtime';

interface Operation extends OperationType {
  readonly variables: {
    id: string;
  };
  readonly response: {
    entity: any;
  };
}

/**
 * Return create component with Info fields
 *
 * @param InfoComponent - wrapped component
 * @param query - creating mutation
 */
export default function makeViewPage<P extends object>(
  InfoComponent: React.ComponentType<EntityInfoComponentProps<P>>,
  query: GraphQLTaggedNode
): React.FC {
  return (): React.ReactElement => {
    const { id } = useParams();

    return (
      <QueryRenderer<Operation>
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
          console.log(props);

          return (
            <div className='d-flex justify-content-center'>
              <InfoComponent viewOnly entity={props.entity}/>
            </div>
          );
        }}
      />
    );
  };
}
