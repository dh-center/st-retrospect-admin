import { GraphQLTaggedNode } from 'react-relay';
import React from 'react';
import { EntityInfoComponentProps } from '../../types/entities';

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
    return (
      <div className='d-flex justify-content-center'>
        <InfoComponent viewOnly/>
      </div>
    );
  };
}
