import { ReactElement, useState } from 'react';
import Input from '../components/utils/Input';
import { Button } from 'react-bootstrap';
import styles from './Dialog.module.css';
import pluginBlockStyles from './PluginBlock.module.css';
import { BlockTool, ToolboxConfig } from '@editorjs/editorjs';
import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import ReactDOM from 'react-dom';
import { LabeledPersonsCustomSelect } from '../components/CustomSelects/PersonsCustomSelect';
import classNames from 'classnames';

/**
 * Interface for interaction with EditorJS
 */
interface DialogPluginData {
  /**
   * Array of all added messages
   */
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
  isLeft: boolean
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
  onChange(value: DialogPluginData): void;

  /**
   * Default value
   */
  initialData: DialogPluginData;
}

/**
 * Displays array messages component
 *
 * @param props - props with data for displaying messages
 */
function DialogComponent(props: MessagesProps): ReactElement {
  const [dataArray, setDataArray] = useState<DialogPluginData>(Object.keys(props.initialData).length === 0 ? { messages: [] } : props.initialData);

  const onChange = (newData: DialogPluginData): void => {
    setDataArray(newData);
    props.onChange(newData);
  };

  /**
   * Adds user's message
   */
  const addUserMessage = (): void => {
    const newArray = dataArray.messages;

    newArray.push({
      message: '',
      sender: 'user',
      reaction: '',
      isLeft: false,
    });
    onChange({
      messages: newArray,
    });
  };

  /**
   * Adds person's message
   *
   * @param isLeft - chat side, where message will be added
   */
  const addPersonMessage = (isLeft: boolean): void => {
    const newArray = dataArray.messages;

    newArray.push({
      message: '',
      sender: '',
      isLeft,
    });
    onChange({
      messages: newArray,
    });
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeMessage = (index: number): void => {
    const newArray = dataArray.messages;

    newArray.splice(index, 1);
    onChange({
      messages: newArray,
    });
  };

  /**
   * Returns array of components with messages
   */
  const inputList = dataArray.messages.map((dataItem, index) => {
    return (
      <div className={dataItem.isLeft ? classNames(styles.messageItem, styles.messageItemLeft) : classNames(styles.messageItem, styles.messageItemRight)} key={index}>
        {
          !(dataItem.sender === 'user') &&
          <LabeledPersonsCustomSelect
            label='Отправитель'
            onChange={(value) => {
              const newArray = dataArray.messages;

              newArray[index].sender = value;
              onChange({
                messages: newArray,
              });
            }}
            value={dataItem.sender}
          />
        }

        {
          (dataItem.sender === 'user') &&
          <Input
            label='Реакция пользователя'
            onChange={(value: string) => {
              const newArray = dataArray.messages;

              newArray[index].reaction = value;
              onChange({
                messages: newArray,
              });
            }}
            value={dataItem.reaction || ''}
          />
        }

        <Input
          label={(dataItem.reaction === undefined) ? 'Сообщение' : 'Отображаемый ответ пользователя'}
          onChange={(value: string) => {
            const newArray = dataArray.messages;

            newArray[index].message = value;
            onChange({
              messages: newArray,
            });
          }}
          value={dataItem.message}
        />

        <Button
          className={styles.removeButton}
          onClick={() => removeMessage(index)}
          type='button'
          variant='outline-danger'
        >
          Удалить
        </Button>
      </div>
    );
  });

  return (
    <div className={pluginBlockStyles.wrapper}>
      <div className={styles.messages}>
        {inputList}
      </div>
      <div className={styles.messageButtons}>
        <Button
          className={styles.addButton}
          onClick={() => addPersonMessage(true)}
          type='button'
          variant='success'
        >
          + персона (left)
        </Button>
        <Button
          className={styles.addButton}
          onClick={() => addPersonMessage(false)}
          type='button'
          variant='success'
        >
          + персона (right)
        </Button>
        <Button
          className={styles.addButton}
          onClick={addUserMessage}
          type='button'
          variant='success'
        >
          + пользователь
        </Button>
      </div>
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
        initialData={this.data}
        onChange={(data) => {
          this.data = data;
        }}
      />,
      element
    );

    return element;
  }

  /**
   * Return information structure after save
   */
  public save(): DialogPluginData {
    return this.data;
  }
}
