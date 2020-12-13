import React, { useState } from 'react';
import { ToolboxConfig } from '@editorjs/editorjs';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import styles from './Question.module.css';
import ReactDOM from 'react-dom';
import pluginBlockStyles from './PluginBlock.module.css';
import Input from '../components/utils/Input';
import { LabeledArrayOfInputs } from '../components/utils/ArrayOfInputs';
import classNames from 'classnames';
import ImageUploader from '../components/utils/ImageUploader';
import ImageGallery from '../components/utils/ImageGallery';

/**
 * TestConstructor plugin data
 */
interface TestConstructorData {
  /**
   * Question to answer
   */
  question: string | undefined;

  /**
   * Picture attachment for the test
   */
  picture: string | undefined;

  /**
   * Array of answers to choose from
   */
  answers: string[] | undefined;

  /**
   * Index of right answer
   */
  correctAnswerIndex: number | undefined;

  /**
   * Message for displaying on right answer
   */
  rightAnswerMessage: string | undefined;

  /**
   * Message for displaying on wrong answer
   */
  wrongAnswerMessage: string | undefined;
}

/**
 * Props for TestConstructorComponent
 */
interface TestConstructorComponentProps {
  /**
   * Initial test data
   */
  initialData: TestConstructorData;

  /**
   * Callback to call when data changed
   *
   * @param value - new data
   */
  onChange(value: TestConstructorData): void;
}

/**
 * Component for displaying test constructor
 *
 * @param props - props for component rendering
 */
function TestConstructorComponent(props: TestConstructorComponentProps): React.ReactElement {
  const [data, setData] = useState(props.initialData);

  const onChange = (newData: TestConstructorData): void => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <div className={pluginBlockStyles.wrapper}>
      <label className={classNames(styles.label, styles.labelStrong)}>
        Пользователь должен ответить на вопрос, выбрав правильный вариант ответа:
      </label>
      <Input
        label='Вопрос'
        onChange={(value) => {
          onChange({
            ...data,
            question: value,
          });
        }}
        value={data.question || ''}
      />
      <ImageGallery
        className={styles.pictureAttachment}
        images={data.picture ? [ data.picture ] : undefined}
        onChange={([ link ]) => onChange({
          ...data,
          picture: link,
        })}
        viewOnly={false}
      />
      <ImageUploader
        entityName='quest/data'
        onImageUpload={(url) => {
          onChange({
            ...data,
            picture: url,
          });
        }}
      />
      <LabeledArrayOfInputs
        label='Варианты ответов'
        onChange={(value) => {
          onChange({
            ...data,
            answers: value,
          });
        }}
        value={data.answers}
      />
      <Input
        label='Номер правильного ответа:'
        onChange={(value) => {
          onChange({
            ...data,
            correctAnswerIndex: value,
          });
        }}
        type='number'
        value={data.correctAnswerIndex || 0}
      />
      <Input
        label='Сообщение для правильного ответа:'
        onChange={(value) => {
          onChange({
            ...data,
            rightAnswerMessage: value,
          });
        }}

        value={data.rightAnswerMessage || ''}
      />
      <Input
        label='Сообщение для неправильного ответа:'
        onChange={(value) => {
          onChange({
            ...data,
            wrongAnswerMessage: value,
          });
        }}

        value={data.wrongAnswerMessage || ''}
      />
    </div>
  );
}

/**
 * Test constructor plugin for EditorJS
 */
export default class TestConstructor implements BlockTool {
  /**
   * Previously saved data
   */
  private data: TestConstructorData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<TestConstructorData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3C7 1.89543 6.10457 1 5 1C3.89543 1 3 1.89543 3 3ZM6.11111 3C6.11111 3.61365 5.61365 4.11111 5 4.11111C4.38635 4.11111 3.88889 3.61365 3.88889 3C3.88889 2.38635 4.38635 1.88889 5 1.88889C5.61365 1.88889 6.11111 2.38635 6.11111 3Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 9C3 10.1046 3.89543 11 5 11C6.10457 11 7 10.1046 7 9C7 7.89543 6.10457 7 5 7C3.89543 7 3 7.89543 3 9ZM6.11111 9C6.11111 9.61365 5.61365 10.1111 5 10.1111C4.38635 10.1111 3.88889 9.61365 3.88889 9C3.88889 8.38635 4.38635 7.88889 5 7.88889C5.61365 7.88889 6.11111 8.38635 6.11111 9Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M5 17C3.89543 17 3 16.1046 3 15C3 13.8954 3.89543 13 5 13C6.10457 13 7 13.8954 7 15C7 16.1046 6.10457 17 5 17Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M3 21C3 22.1046 3.89543 23 5 23C6.10457 23 7 22.1046 7 21C7 19.8954 6.10457 19 5 19C3.89543 19 3 19.8954 3 21ZM6.11111 21C6.11111 21.6136 5.61365 22.1111 5 22.1111C4.38635 22.1111 3.88889 21.6136 3.88889 21C3.88889 20.3864 4.38635 19.8889 5 19.8889C5.61365 19.8889 6.11111 20.3864 6.11111 21Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 15.7512H15.5C15.5 13.1987 16.4369 12.1057 18.5792 11.0346C19.8119 10.4182 20 10.1987 20 9.00122C20 7.58583 18.9157 6.75122 17 6.75122C15.3431 6.75122 14 8.09437 14 9.75122H11C11 6.43751 13.6863 3.75122 17 3.75122C20.4265 3.75122 23 5.73216 23 9.00122C23 11.5537 22.0631 12.6467 19.9208 13.7179C18.6881 14.3342 18.5 14.5537 18.5 15.7512Z"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0005 20.2485C17.8292 20.2485 18.501 19.577 18.501 18.7485C18.501 17.9201 17.8292 17.2485 17.0005 17.2485C16.1718 17.2485 15.5 17.9201 15.5 18.7485C15.5 19.577 16.1718 20.2485 17.0005 20.2485Z"/>
             </svg>`,
      title: 'Test',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const element = document.createElement('div');

    element.className = 'test-constructor';
    ReactDOM.render(
      <TestConstructorComponent
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
  public save(): TestConstructorData {
    return this.data;
  }
}
