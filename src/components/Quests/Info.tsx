import React, {useState} from 'react';

/**
 *
 */
export default function QuestInfo(): React.ReactElement {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [questType, setQuestType] = useState('QUIZ');

  return (
    <div className={'entity-info'}>
      <div className={'entity-info__section'}>
        <label htmlFor={'name'} className={'entity-info__label'}>Name</label>
        <input
          type="text"
          id={'name'}
          onChange={(e): void => {setName(e.target.value)}}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'description'} className={'entity-info__label'}>Description</label>
        <textarea
          id={'description'}
          className={'entity-info__description'}
          onChange={(e): void => {setDescription(e.target.value)}}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'photo'} className={'entity-info__label'}>Photo</label>
        <input
          id={'photo'}
          type="text"
          onChange={(e): void => {setPhoto(e.target.value)}}
        />
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor="" className={'entity-info__label'}>Type:</label>
        <input
          type="radio"
          name={'questType'}
          value={'QUIZ'}
          id={'quiz'}
          checked
          onChange={(e): void => {setQuestType(e.target.value)}}
        />
        <label htmlFor={'quiz'} className={'entity-info__radio-label'}>Quiz</label>
        <input
          type="radio"
          name={'questType'}
          value={'ROUTE'}
          id={'route'}
          onChange={(e): void => {setQuestType(e.target.value)}}
        />
        <label htmlFor={'route'} className={'entity-info__radio-label'}>Route</label>
      </div>
    </div>
  );
}
