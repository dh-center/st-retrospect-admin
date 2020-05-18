import React from "react";

export default function QuestInfo(): React.ReactElement {
  return (
    <div className={'entity-info'}>
      <div className={'entity-info__section'}>
        <label htmlFor={'name'} className={'entity-info__label'}>Name</label>
        <input type="text" id={'name'}/>
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'description'} className={'entity-info__label'}>Description</label>
        <textarea id={'description'} className={'entity-info__description'}/>
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor={'photo'} className={'entity-info__label'}>Photo</label>
        <input id={'photo'} type="text"/>
      </div>
      <div className={'entity-info__section'}>
        <label htmlFor="" className={'entity-info__label'}>Type:</label>
        <input type="radio" name={'questType'} value={'QUIZ'} id={'quiz'}/>
        <label htmlFor={'quiz'} className={'entity-info__radio-label'}>Quiz</label>
        <input type="radio" name={'questType'} value={'ROUTE'} id={'route'}/>
        <label htmlFor={'route'} className={'entity-info__radio-label'}>Route</label>
      </div>
    </div>
  );
}
