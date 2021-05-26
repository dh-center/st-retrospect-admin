import { ReactElement, useState } from 'react';
import Input from '../components/utils/Input';
import { Button, Form } from 'react-bootstrap';
import styles from './Dialog.module.css';
import pluginBlockStyles from './PluginBlock.module.css';
import { BlockTool, ToolboxConfig } from '@editorjs/editorjs';
import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import ReactDOM from 'react-dom';

/**
 * Interface for ONE dialog message
 */
interface MessageData {
  /**
   * Message text (if this is person message) / Reaction text (if this is user message)
   */
  message: string;

  /**
   * (id of person) / user
   */
  sender?: string;

  /**
   * title of reaction to message
   */
  reaction?: string;

  /**
   * Left/right chat side for messages from persons (false - left, true - right)
   */
  side?: boolean
}

/**
 * DialogMessages component input props interface
 */
interface MessagesProps {
  /**
   * onChange event handler
   *
   * @param value - value for changing
   */
  onChange(value: MessageData[]): void;

  /**
   * Default value
   */
  initialData: MessageData[];
}

/**
 * Displays array messages component
 *
 * @param props - props with data for displaying messages
 */
function DialogComponent(props: MessagesProps): ReactElement {
  const [dataArray, setDataArray] = useState<MessageData[]>(props.initialData || []);

  const onChange = (newData: MessageData[]): void => {
    setDataArray(newData);
    props.onChange(newData);
  };

  /**
   * Adds user's message
   */
  const addUserMessage = (): void => {
    const newArray = dataArray;

    newArray.push({
      message: '',
      reaction: '',
    });
    setDataArray(() => {
      onChange(newArray);

      return newArray;
    });
  };

  /**
   * Adds person's message
   */
  const addPersonMessage = (): void => {
    const newArray = dataArray;

    newArray.push({
      message: '',
      sender: '',
      side: false,
    });
    setDataArray(() => {
      onChange(newArray);

      return newArray;
    });
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeMessage = (index: number): void => {
    const newArray = dataArray;

    newArray.splice(index, 1);
    setDataArray(() => {
      props.onChange(newArray);

      return newArray;
    });
  };

  /**
   * Returns array of components with messages
   */
  console.log(typeof dataArray);
  const inputList = dataArray.map((dataItem, index) => {
    return (
      <Form.Row className={styles.inputLineItemWrapper} key={index}>
        {
          !dataItem.reaction &&
          <Input
            label='Отправитель'
            onChange={(value: string) => {
              const newArray = dataArray;

              dataItem.sender = value;
              onChange(newArray);
            }}
            value={dataItem.sender || ''}
          />
        }

        {
          dataItem.reaction &&
          <Input
            label='Реакция пользователя'
            onChange={(value: string) => {
              const newArray = dataArray;

              dataItem.reaction = value;
              onChange(newArray);
            }}
            value={dataItem.message}
          />
        }

        <Input
          label='Cообщение'
          onChange={(value: string) => {
            const newArray = dataArray;

            dataItem.message = value;
            onChange(newArray);
          }}
          value={dataItem.message}
        />

        <Button
          className={styles.removeButton}
          onClick={() => removeMessage(index)}
          type='button'
          variant='outline-danger'
        >
          -
        </Button>
      </Form.Row>
    );
  });

  return (
    <div className={pluginBlockStyles.wrapper}>
      {inputList}
      <Button
        className={styles.addButton}
        onClick={addPersonMessage}
        type='button'
        variant='success'
      >
        +1
      </Button>
      <Button
        className={styles.addButton}
        onClick={addUserMessage}
        type='button'
        variant='success'
      >
        +2
      </Button>
    </div>
  );
}

/**
 * Approximation to point constructor plugin for EditorJS
 */
export default class DialogConstructor implements BlockTool {
  /**
   * Previously saved data
   */
  private data: MessageData[];

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<MessageData[]>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M4 19.8042L10.0868 16H18C19.1046 16 20 15.1046 20 14V2C20 0.89543 19.1046 0 18 0H2C0.89543 0 0 0.89543 0 2V14C0 15.1046 0.89543 16 2 16H4V19.8042ZM9.5132 14L6 16.1958V14H2V2H18V14H9.5132ZM5 11V9H12V11H5ZM5 5V7H14V5H5Z"/>
             </svg>`,
      title: 'Dialog',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const element = document.createElement('div');

    element.className = 'dialog';
    ReactDOM.render(
      <DialogComponent
        initialData={this.data}
        onChange={(data) => this.data = data}
      />,
      element
    );

    return element;
  }

  /**
   * Return information structure after save
   */
  public save(): MessageData[] {
    return this.data;
  }
}
