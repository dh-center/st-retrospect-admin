import { Form } from 'react-bootstrap';
import useUniqueId from '../../utils/useUniqueId';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled(Form.Group)`
  padding: .25rem;
  margin-bottom: .25rem;
`;

const Label = styled(Form.Label)`
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0;
`;

const Link = styled.a`
  font-size: 1.2rem;
  color: #007bff;
  cursor: pointer;

  &:after {
    content: '|';
    color: #17a2b8;
    margin: 0 .3em;
  }

  &:last-child {
    &:after {
      display: none;
    }
  }
`;

/**
 * LabeledArrayOfLinks component props
 */
interface LabeledArrayOfLinksProps {
  /**
   * Label for displaying
   */
  label: string;

  /**
   * Displayed content
   */
  items: {
    /**
     * Displayed value
     */
    value: string;

    /**
     * Link to content
     */
    link: string;
  }[];
}

/**
 * Displays label and array of links in view components
 *
 * @param props - props of component
 */
export default function LabeledArrayOfLinks(props: LabeledArrayOfLinksProps): ReactElement {
  const id = useUniqueId('app-labeled-text-with-array-of-links');

  const content = props.items.map((item, index): ReactNode => {
    return (
      <Link href={item.link} key={index}>{item.value}</Link>
    );
  });

  return (
    <Container>
      <Label htmlFor={id`labeled-text`}>{props.label}:</Label>
      <div id={id`labeled-text`}>
        {content}
      </div>
    </Container>
  );
}
