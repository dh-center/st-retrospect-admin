import { ReactElement, useState } from 'react';
import pluginBlockStyles from '../PluginBlock.module.css';
import Input from '../../components/utils/Input';
import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import { ToolboxConfig } from '@editorjs/editorjs';
import ReactDOM from 'react-dom';
import styles from './index.module.css';

interface AnswerInTextData {
  task: string;
  text: string;
}

interface AnswerInTextComponentProps {
  initialData: AnswerInTextData;
  onChange(value: AnswerInTextData): void;
}

function AnswerInTextComponent(props: AnswerInTextComponentProps): ReactElement {
  const [data, setData] = useState(props.initialData);

  const onChange = (newData: AnswerInTextData): void => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <>
      <label className={pluginBlockStyles.label}>Пользователь должен выбрать ответы в тексте:</label>
      <Input
        label='Задание'
        onChange={value => onChange({
          ...data,
          task: value,
        })}
        value={data.task || ''}
      />
      <div className={styles.textWrapper}>
        <div className={styles.text} contentEditable>{data.text}</div>
      </div>
    </>
  );
}

export default class AnswerInText implements BlockTool {
  private data: AnswerInTextData;

  constructor({ data }: BlockToolConstructorOptions<AnswerInTextData>) {
    this.data = data;
  }

  public static get toolbox(): ToolboxConfig {
    return {
      icon: `A`,
      title: 'Answer in text',
    };
  }

  public render(): HTMLElement {
    const container = document.createElement('div');

    container.className = pluginBlockStyles.wrapper;
    ReactDOM.render(
      <AnswerInTextComponent
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
  public save(): AnswerInTextData {
    return this.data;
  }
}
