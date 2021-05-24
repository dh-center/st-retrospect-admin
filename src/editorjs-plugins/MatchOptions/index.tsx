import { ReactElement, useState } from 'react';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import { ToolboxConfig } from '@editorjs/editorjs';
import ReactDOM from 'react-dom';
import pluginBlockStyles from '../PluginBlock.module.css';
import styles from './index.module.css';
import { Button, Form } from 'react-bootstrap';
import Input from '../../components/utils/Input';
import withLabel from '../../components/utils/LabeledComponent';

/**
 * Type of option in data
 */
interface MatchOption {
  /**
   * Left option for matching
   */
  left: string;

  /**
   * Right option for matching
   */
  right: string;
}

/**
 * Match options plugin data
 */
interface MatchOptionsData {
  /**
   * Displaying task
   */
  task: string;

  /**
   * Options for matching
   */
  options: MatchOption[];
}

interface MatchOptionsComponentProps {
  initialData: MatchOptionsData;
  onChange(value: MatchOptionsData): void;
}

/**
 * ArrayOfOptionsInputs component props interface
 */
interface ArrayOfOptionsInputsProps {
  /**
   * onChange event handler
   *
   * @param value - value for changing
   */
  onChange(value: MatchOption[]): void;

  /**
   * Default value
   */
  value: MatchOption[];

  /**
   * Text on adding button
   */
  addButtonText?: string;

  /**
   * Text on removing button
   */
  removeButtonText?: string;
}

function ArrayOfOptionsInputs(props: ArrayOfOptionsInputsProps): ReactElement {
  /**
   * Adds empty element to array
   */
  const addEmptyElement = (): void => {
    const newArray = props.value;

    newArray.push({
      left: '',
      right: '',
    });
    props.onChange(newArray);
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeElement = (index: number): void => {
    const newArray = props.value;

    newArray.splice(index, 1);
    props.onChange(newArray);
  };

  const inputList = props.value.map((dataItem, index) => {
    return (
      <Form.Row className={styles.inputLineItemWrapper} key={index}>
        <Input
          className={styles.input}
          onChange={(value) => {
            const newArray = props.value;

            newArray[index].left = value;
            props.onChange(newArray);
          }}
          value={dataItem.left}
        />
        <Input
          className={styles.input}
          onChange={(value) => {
            const newArray = props.value;

            newArray[index].right = value;
            props.onChange(newArray);
          }}
          value={dataItem.right}
        />
        <Button
          className={styles.removeButton}
          onClick={() => removeElement(index)}
          type='button'
          variant='outline-danger'
        >
          {props.removeButtonText || '-'}
        </Button>
      </Form.Row>
    );
  });

  return (
    <>
      {inputList}
      <Button
        className={styles.addButton}
        onClick={addEmptyElement}
        type='button'
        variant='success'
      >
        {props.addButtonText || '+'}
      </Button>
    </>
  );
}

const LabeledArrayOfOptionsInputs = withLabel(ArrayOfOptionsInputs);

function MatchOptionsComponent(props: MatchOptionsComponentProps): ReactElement {
  const [data, setData] = useState(props.initialData);

  const onChange = (newData: MatchOptionsData): void => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <>
      <label className={pluginBlockStyles.label}>Пользователь должен соотнести варианты ответов:</label>
      <Input
        label='Задание'
        onChange={value => onChange({
          ...data,
          task: value,
        })}
        value={data.task || ''}
      />
      <LabeledArrayOfOptionsInputs
        label='Варианты для соотношения'
        onChange={value => onChange({
          ...data,
          options: value,
        })}
        value={data.options || []}
      />
    </>
  );
}

export default class MatchOptions implements BlockTool {
  /**
   * Match options data
   */
  private data: MatchOptionsData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<MatchOptionsData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20 2V18C20 19.1046 19.1046 20 18 20H11H9H2C0.89543 20 0 19.1046 0 18V2C0 0.89543 0.89543 0 2 0H9H11H18C19.1046 0 20 0.89543 20 2ZM11 2H18V18H11V2ZM9 2V18H2V2H9Z"/>
        </svg>
      `,
      title: 'Match options',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const container = document.createElement('div');

    container.className = pluginBlockStyles.wrapper;
    ReactDOM.render(
      <MatchOptionsComponent
        initialData={this.data}
        onChange={(data) => this.data = data}
      />,
      container
    );

    return container;
  }

  /**
   * Return information structure after save
   */
  public save(): MatchOptionsData {
    return this.data;
  }
}
