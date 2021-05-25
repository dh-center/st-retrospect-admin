import pluginBlockStyles from '../PluginBlock.module.css';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import { ToolboxConfig } from '@editorjs/editorjs';
import styles from './index.module.css';

/**
 * Answer in text plugin data
 */
interface AnswerInTextData {
  /**
   * Current task
   */
  task?: string;

  /**
   * Text for searching answers
   */
  text?: string;
}

/**
 * Plugin for searching answers in text
 */
export default class AnswerInText implements BlockTool {
  /**
   * Plugin data
   */
  private data: AnswerInTextData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<AnswerInTextData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `
        <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H12.4142L18 5.58579V20C18 21.1046 17.1046 22 16 22H2C0.89543 22 0 21.1046 0 20V2C0 0.89543 0.89543 0 2 0ZM10 2H2V20H16V8H12C10.8954 8 10 7.10457 10 6V2ZM12 2.41421V6H15.5858L12 2.41421ZM5 16V14H11V16H5ZM5 10V12H13V10H5Z"/>
        </svg>
      `,
      title: 'Answer in text',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const container = document.createElement('div');

    container.className = pluginBlockStyles.wrapper;
    const label = document.createElement('label');

    label.className = pluginBlockStyles.label;
    label.innerText = 'Пользователь должен выбрать ответы в тексте:';

    const taskInputWrapper = document.createElement('div');
    const taskInputLabel = document.createElement('label');
    const taskInput = document.createElement('input');

    taskInputLabel.innerText = 'Задание:';
    taskInputLabel.className = styles.label;
    taskInput.className = styles.input;
    taskInput.value = this.data.task || '';
    taskInputWrapper.className = styles.formLineWrapper;
    taskInputWrapper.append(taskInputLabel, taskInput);

    const textInputLabel = document.createElement('label');
    const textWrapper = document.createElement('div');
    const textInput = document.createElement('div');

    textInputLabel.innerText = 'Текст:';
    textInputLabel.className = styles.label;
    textInput.className = styles.text;
    textInput.contentEditable = 'true';
    textInput.innerHTML = this.data.text || '';
    textWrapper.className = styles.formLineWrapper;
    textWrapper.append(textInputLabel, textInput);

    container.append(label, taskInputWrapper, textWrapper);

    return container;
  }

  /**
   * Return information structure after save
   *
   * @param block - block html element
   */
  public save(block: HTMLElement): AnswerInTextData {
    const task = block.getElementsByTagName('input')[0].value;
    const text = block.querySelector('[contenteditable]')?.innerHTML || '';

    return {
      task,
      text,
    };
  }
}
