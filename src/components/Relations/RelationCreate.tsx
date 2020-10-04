import React, { FormEvent, ReactElement, ReactNode, useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  CreateRelationInput,
  RelationCreateMutation,
  RelationCreateMutationResponse
} from './__generated__/RelationCreateMutation.graphql';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import { RelationCreate_personsQuery } from './__generated__/RelationCreate_personsQuery.graphql';
import personsFullName from '../../utils/personsFullname';
import CustomSelect from '../utils/CustomSelect';
import { RelationCreate_locationInstancesQuery } from './__generated__/RelationCreate_locationInstancesQuery.graphql';
import Button from 'react-bootstrap/Button';
import { RelationCreate_relationTypesQuery } from './__generated__/RelationCreate_relationTypesQuery.graphql';

/**
 * Generates input data for creating new relation
 */
function generateRelationInput(): CreateRelationInput {
  return {
    personId: '',
    relationId: '',
    locationInstanceId: '',
    quote: '',
  };
}

/**
 * Mutation for creating new relation
 *
 * @param input - input data for creating
 */
function create(input: CreateRelationInput): Promise<RelationCreateMutationResponse> {
  return commitMutation<RelationCreateMutation>(environment, {
    mutation: graphql`
      mutation RelationCreateMutation($input: CreateRelationInput!) {
        relation {
          create(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 *
 * @class
 */
export default function RelationCreate(): ReactElement {
  const [input, setInput] = useState<CreateRelationInput>(generateRelationInput());
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves new relation to api
   *
   * @param e - form submit event
   */
  const saveRelationToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      return;
    }

    setLoadingStatus(true);
    try {
      await create(input);
      notifier.show({
        message: `Successfully created`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push('/relations');
    } catch {
      setLoadingStatus(false);
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={saveRelationToApi}>
        <QueryRenderer<RelationCreate_personsQuery>
          environment={environment}
          query={graphql`
            query RelationCreate_personsQuery {
              persons {
                edges {
                  node {
                    value: id
                    lastName
                    firstName
                    patronymic
                  }
                }
              }
            }
          `}
          render={({ error, props }): ReactNode => {
            if (error) {
              return <div>Error!</div>;
            }

            if (!props) {
              return <div>Loading persons...</div>;
            }

            /**
             * Get list of persons from response
             */
            const edges = props.persons.edges;
            const persons = edges.map((edge) => edge.node);
            const personsWithFullNames = persons.map((person) => {
              return {
                value: person.value,
                name: personsFullName(person),
              };
            });

            return <CustomSelect
              onChange={(selected) => {
                setInput({
                  ...input,
                  personId: selected,
                });
              }}
              options={personsWithFullNames}
              placeholder='Select a person...'
              value={input.personId}
            />;
          }}
          variables={{}}
        />
        <QueryRenderer<RelationCreate_relationTypesQuery>
          environment={environment}
          query={graphql`
            query RelationCreate_relationTypesQuery {
              relationTypes {
                value: id
                name
              }
            }
          `}
          render={({ error, props }): ReactNode => {
            if (error) {
              return <div>Error!</div>;
            }

            if (!props) {
              return <div>Loading relation types...</div>;
            }

            const relationTypesWithNames = props.relationTypes.filter((relationType) => {
              if (relationType.name !== null) {
                return relationType;
              }
            }) as {readonly value: string; readonly name: string}[];

            return <CustomSelect
              onChange={(selected) => {
                setInput({
                  ...input,
                  relationId: selected,
                });
              }}
              options={relationTypesWithNames}
              placeholder='Select a relation type...'
              value={input.relationId}
            />;
          }}
          variables={{}}
        />
        <QueryRenderer<RelationCreate_locationInstancesQuery>
          environment={environment}
          query={graphql`
            query RelationCreate_locationInstancesQuery {
              locationInstances {
                value: id
                name
              }
            }
          `}
          render={({ error, props }): ReactNode => {
            if (error) {
              return <div>Error!</div>;
            }

            if (!props) {
              return <div>Loading locations...</div>;
            }

            const locationsWithNames = props.locationInstances.filter((location) => {
              if (location.name !== null) {
                return location;
              }
            }) as {readonly value: string; readonly name: string}[];

            return <CustomSelect
              onChange={(selected) => {
                setInput({
                  ...input,
                  locationInstanceId: selected,
                });
              }}
              options={locationsWithNames}
              placeholder='Select a location...'
              value={input.locationInstanceId}
            />;
          }}
          variables={{}}
        />
        <Button
          className='m-1'
          type='submit'
        >
          {isLoading ? (
            <Spinner
              animation='border'
              aria-hidden='true'
              as='span'
              role='status'
              size='sm'
            />
          ) : 'Create'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}
