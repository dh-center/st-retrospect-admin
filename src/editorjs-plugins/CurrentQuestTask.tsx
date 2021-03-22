import { BlockTool, ToolboxConfig } from '@editorjs/editorjs';
import { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import pluginBlockStyles from './PluginBlock.module.css';
import Input from '../components/utils/Input';

/**
 * Current quest task plugin data
 */
interface CurrentQuestTaskData {
  /**
   * Current quest task
   */
  currentQuestTask: string | undefined;
}

/**
 * Props for CurrentQuestTaskComponent
 */
interface CurrentQuestTaskComponentProps {
  /**
   * Initial current quest task data
   */
  initialData: CurrentQuestTaskData;

  /**
   * Callback to call when data changed
   *
   * @param value - new data
   */
  onChange(value: CurrentQuestTaskData): void;
}

/**
 * Component for displaying current quest task
 *
 * @param props - props for component rendering
 */
function CurrentQuestTaskComponent(props: CurrentQuestTaskComponentProps): ReactElement {
  const [data, setData] = useState(props.initialData);

  const onChange = (newData: CurrentQuestTaskData): void => {
    setData(newData);
    props.onChange(newData);
  };

  return (
    <div className={pluginBlockStyles.wrapper}>
      <Input
        label='Текущее задание'
        onChange={(value) => {
          onChange({
            ...data,
            currentQuestTask: value,
          });
        }}
        strong
        value={data.currentQuestTask || ''}
      />
    </div>
  );
}

/**
 * Current quest task plugin for EditorJS
 */
export default class CurrentQuestTask implements BlockTool {
  /**
   * Current quest task data
   */
  private data: CurrentQuestTaskData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<CurrentQuestTaskData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0003 17.9983C12.5528 17.9983 13.0007 17.5506 13.0007 16.9983C13.0007 16.4461 12.5528 15.9983 12.0003 15.9983C11.4479 15.9983 11 16.4461 11 16.9983C11 17.5506 11.4479 17.9983 12.0003 17.9983ZM13.0036 5.99835H11.003V13.9983H13.0036V5.99835Z"/>
             </svg>`,
      title: 'Current quest task',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const element = document.createElement('div');

    element.className = 'current-quest-task-container';
    ReactDOM.render(
      <CurrentQuestTaskComponent
        initialData={this.data}
        onChange={(data) => {
          this.data = data;
        }}
      />, element);

    return element;
  }

  /**
   * Return information structure after save
   */
  public save(): CurrentQuestTaskData {
    return this.data;
  }
}
