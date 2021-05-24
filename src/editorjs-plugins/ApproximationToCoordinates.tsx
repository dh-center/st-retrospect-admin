import { BlockTool, ToolboxConfig } from '@editorjs/editorjs';
import ReactDOM from 'react-dom';
import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools/block-tool';
import pluginBlockStyles from './PluginBlock.module.css';
import styles from './Location.module.css';
import React, { useState } from 'react';
import Input from '../components/utils/Input';
import classNames from 'classnames';
import { LabeledLocationMap } from '../components/LocationMap';
import { isLatitudeValid, isLongitudeValid } from '../utils/checkCoordinate';
import throttle from 'lodash.throttle';
import notifier from 'codex-notifier';

/**
 * Approximation plugin data
 */
interface ApproximationToCoordinatesData {
  /**
   * Latitude of coordination
   */
  latitude: number;

  /**
   * Longitude of coordination
   */
  longitude: number;

  /**
   * Title of the approaching coordinates
   */
  title: string | undefined;
}

/**
 * Props for ApproximationToCoordinatesComponent
 */
interface ApproximationToCoordinatesComponentProps {
  /**
   * Initial data about approaching coordinates
   */
  initialData: ApproximationToCoordinatesData;

  /**
   * Callback to call when data changed
   *
   * @param value - new data
   */
  onChange(value: ApproximationToCoordinatesData): void;
}

/**
 * Component for approach coordinates editing
 *
 * @param props - props for component rendering
 */
function ApproximationToCoordinatesComponent(props: ApproximationToCoordinatesComponentProps): React.ReactElement {
  const [data, setData] = useState<ApproximationToCoordinatesData>({
    latitude: 0,
    longitude: 0,
    title: undefined,
  });

  const onChange = (newData: ApproximationToCoordinatesData): void => {
    setData(newData);
    props.onChange(newData);
  };

  const showLatitudeValidationErrorMessage = throttle(() => notifier.show({
    message: 'Latitude isn\'t correct. It should be from -90 to 90 and have \'.\' as delimiter.',
    style: 'error',
    time: 5000,
  }), 1000, { trailing: false });

  /**
   * Error message if longitude isn't correct
   */
  const showLongitudeValidationErrorMessage = throttle(() => notifier.show({
    message: 'Longitude isn\'t correct. It should be from -180 to 180 and have \'.\' as delimiter.',
    style: 'error',
    time: 5000,
  }), 1000, { trailing: false });

  return (
    <div className={pluginBlockStyles.wrapper}>
      <label className={classNames(styles.label, styles.labelStrong)}>
        Пользователь должен ответить на вопрос, выбрав правильный вариант ответа:
      </label>
      <Input
        label='Название точки'
        onChange={(value: string) => {
          onChange({
            ...data,
            title: value,
          });
        }}
        value={data.title || 0}
      />
      <LabeledLocationMap
        label='Точка на карте'
        lngLat={[data.longitude, data.latitude]}
        onChange={(lngLat) => {
          onChange({
            ...data,
            latitude: lngLat.lat,
            longitude: lngLat.lng,
          });
        }}
      />
      <Input
        label='Широта'
        onChange={(value: number) => {
          if (!isLatitudeValid(value)) {
            showLatitudeValidationErrorMessage();

            return;
          }
          onChange({
            ...data,
            latitude: value,
          });
        }}
        value={data.latitude || 0}
      />
      <Input
        label='Долгота'
        onChange={(value: number) => {
          if (!isLongitudeValid(value)) {
            showLongitudeValidationErrorMessage();

            return;
          }
          onChange({
            ...data,
            longitude: value,
          });
        }}
        value={data.longitude || 0}
      />
    </div>
  );
}

/**
 * Approximation to point constructor plugin for EditorJS
 */
export default class ApproximationToCoordinatesConstructor implements BlockTool {
  /**
   * Previously saved data
   */
  private data: ApproximationToCoordinatesData;

  /**
   * Plugin constructor
   *
   * @param options - plugin options
   * @param options.data - previously saved data
   */
  constructor({ data }: BlockToolConstructorOptions<ApproximationToCoordinatesData>) {
    this.data = data;
  }

  /**
   * Getter for information about plugin in toolbox
   */
  public static get toolbox(): ToolboxConfig {
    return {
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 0L0 8.57143L8.23529 11.7647L11.4286 20L20 0ZM11.5212 14.7067L9.78102 10.219L5.29326 8.47882L16.1921 3.80789L11.5212 14.7067Z" fill="black"/>
            </svg>`,
      title: 'Approach to coordinates',
    };
  }

  /**
   * Render function for plugin content
   */
  public render(): HTMLElement {
    const element = document.createElement('div');

    element.className = 'test-constructor';
    ReactDOM.render(
      <ApproximationToCoordinatesComponent
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
  public save(): ApproximationToCoordinatesData {
    return this.data;
  }
}
