import React, { ChangeEvent } from 'react';

/**
 * Props of component
 */
interface Props {
  /**
   * Handler for changing input fields
   *
   * @param e - change event
   */
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function QuestInfo(props: Props): React.ReactElement {
  return (
    <div className={'entity-info'}>
      <div className={'entity-info__section'}>
        <label htmlFor={'name'} className={'entity-info__label'}>Name</label>
        <input
          type="text"
          id={'name'}
          name={'name'}
          onChange={(e): void => {
            props.onChange(e);
          }}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'description'} className={'entity-info__label'}>Description</label>
        <textarea
          id={'description'}
          className={'entity-info__description'}
          name={'description'}
          onChange={(e): void => {
            props.onChange(e);
          }}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'photo'} className={'entity-info__label'}>Photo</label>
        <input
          id={'photo'}
          type="text"
          name={'photo'}
          onChange={(e): void => {
            props.onChange(e);
          }}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor="" className={'entity-info__label'}>Type:</label>
        <input
          type="radio"
          name={'type'}
          value={'QUIZ'}
          id={'quiz'}
          onChange={(e): void => {
            props.onChange(e);
          }}
        />
        <label htmlFor={'quiz'} className={'entity-info__radio-label'}>Quiz</label>
        <input
          type="radio"
          name={'type'}
          value={'ROUTE'}
          id={'route'}
          onChange={(e): void => {
            props.onChange(e);
          }}
        />
        <label htmlFor={'route'} className={'entity-info__radio-label'}>Route</label>
      </div>
    </div>
  );
}
