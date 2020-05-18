import React from "react";
import QuestInfo from "../Quests/Info";

export default function Create(): React.ReactElement {
  return (
    <div className={'create-entity'}>
      <QuestInfo/>
      <button>Save</button>
    </div>
  )
}
