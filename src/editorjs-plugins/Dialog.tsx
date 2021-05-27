import { ReactElement, useState } from 'react';
import Input from '../components/utils/Input';
import { Button } from 'react-bootstrap';
import styles from './Dialog.module.css';
import pluginBlockStyles from './PluginBlock.module.css';
import { BlockTool, ToolboxConfig } from '@editorjs/editorjs';
import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import ReactDOM from 'react-dom';

/**
 * Interface for interaction with EditorJS
 */
interface DialogPluginData {
  messages: MessageData[];
}

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
   * Chat side for messages from persons - left or not left (right)
   */
  isLeft?: boolean
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
    onChange(newArray);
  };

  /**
   * Adds person's message
   */
  const addPersonMessage = (): void => {
    const newArray = dataArray;

    newArray.push({
      message: '',
      sender: '',
      isLeft: false,
    });
    onChange(newArray);
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeMessage = (index: number): void => {
    const newArray = dataArray;

    newArray.splice(index, 1);
    onChange(newArray);
  };

  /**
   * Returns array of components with messages
   */
  const inputList = dataArray.map((dataItem, index) => {
    console.log('dataArray: ' + dataArray);

    return (
      <div className={styles.inputLineItemWrapper} key={index}>
        {
          !dataItem.reaction &&
          <Input
            label='Отправитель'
            onChange={(value: string) => {
              const newArray = dataArray;

              newArray[index].sender = value;
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

              newArray[index].reaction = value;
              onChange(newArray);
            }}
            value={dataItem.message}
          />
        }

        <Input
          label='Cообщение'
          onChange={(value: string) => {
            const newArray = dataArray;

            newArray[index].message = value;
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
          удалить
        </Button>
      </div>
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
        + person message (left)
      </Button>
      <Button
        className={styles.addButton}
        onClick={addUserMessage}
        type='button'
        variant='success'
      >
        + user message (right)
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
  private data: DialogPluginData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<DialogPluginData>) {
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
        initialData={this.data.messages}
        onChange={(data) => {
          this.data.messages = data;
        }}
      />,
      element
    );

    return element;
  }

  /**
   * Return information structure after save
   */
  public save(): MessageData[] {
    return this.data.messages;
  }
}
