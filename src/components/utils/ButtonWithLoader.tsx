import { ReactElement } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Component props
 */
type Props = ButtonProps & {
  /**
   * Is in loading state
   */
  isLoading: boolean
};

/**
 * Button with loading state
 *
 * @param props - props for component rendering
 */
export default function ButtonWithLoader({ isLoading, children, ...buttonProps }: Props): ReactElement {
  return (
    <Button
      className='m-1'
      {...buttonProps}
    >
      {isLoading
        ? <Spinner
          animation='border'
          aria-hidden='true'
          as='span'
          role='status'
          size='sm'
        />
        : children}
    </Button>
  );
}
