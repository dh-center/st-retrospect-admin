import { ReactElement, useMemo, useState } from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import withLabel from './LabeledComponent';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { TagsInputQuery } from './__generated__/TagsInputQuery.graphql';
import { TagsInputMutation } from './__generated__/TagsInputMutation.graphql';

/**
 * Props of component
 */
interface TagsInputProps {
  /**
   * Current tags ids
   */
  value: string[];

  /**
   * onChange event handler
   *
   * @param value - new value
   */
  onChange: (value: string[]) => void;
}

/**
 * Tags input with search
 *
 * @param props - props of component
 */
export default function TagsInput(props: TagsInputProps): ReactElement {
  const [fetchKey, setFetchKey] = useState<number>(0);

  const data = useLazyLoadQuery<TagsInputQuery>(graphql`
    query TagsInputQuery {
      tags {
        edges {
          node {
            id
            value
          }
        }
      }
    }
  `, {},
  {
    fetchPolicy: 'network-only',
    fetchKey,
  });

  const [ createTag ] = useMutation<TagsInputMutation>(graphql`
    mutation TagsInputMutation($input: CreateTagInput!) {
      tag {
        create(input: $input) {
          record {
            id
            value
          }
        }
      }
    }
  `);

  const suggestions: Tag[] = useMemo(() => data.tags.edges.map(edge => {
    return {
      id: edge.node.id,
      name: edge.node.value,
    };
  }), [ data ]);

  const originalTags: Tag[] = useMemo(() => data.tags.edges
    .filter(edge => {
      return props.value.includes(edge.node.id);
    })
    .map(edge => {
      return {
        id: edge.node.id,
        name: edge.node.value,
      };
    }), [ data ]);

  const [tags, setTags] = useState<Tag[]>(originalTags);

  return (
    <ReactTags
      allowNew
      onAddition={(tag: Tag) => {
        if (!tag.id) {
          createTag({
            variables: {
              input: {
                value: tag.name,
              },
            },
            onCompleted(response) {
              const newTags = tags.concat({
                id: response.tag.create.record.id,
                name: response.tag.create.record.value,
              });

              setTags(newTags);
              setFetchKey(fetchKey + 1);
              props.onChange(newTags.map(tagElement => tagElement.id as string));
            },
          });
        } else {
          const newTags = tags.concat(tag);

          setTags(newTags);
          props.onChange(newTags.map(tagElement => tagElement.id as string));
        }
      }}
      onDelete={(index) => {
        const newTags = tags.slice(0);

        newTags.splice(index, 1);
        setTags(newTags);
        props.onChange(newTags.map(tagElement => tagElement.id as string));
      }}
      suggestions={suggestions}
      tags={tags}
    />
  );
}

export const LabeledTagsInput = withLabel(TagsInput);
