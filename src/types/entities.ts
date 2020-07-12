import { QuestsPage_entityConnection as QuestConnection } from '../components/Quests/__generated__/QuestsPage_entityConnection.graphql';
import { ChangeEvent } from 'react';
import { PersonsPage_entityConnection as PersonsConnection } from '../components/Persons/__generated__/PersonsPage_entityConnection.graphql';

/**
 * Interface represents Relay Connection model
 */
export interface EntityConnection {
  readonly entities: {
    readonly totalCount: number;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly [key: string]: string | null;
      };
    }>;
  };
  readonly ' $refType': string;
}

export type Quest = QuestConnection['entities']['edges'][0]['node'];
export type Person = PersonsConnection['entities']['edges'][0]['node'];
export type Entity = EntityConnection['entities']['edges'][0]['node'];

export enum EntityTypes {
  QUEST = 'QUEST'
}

export interface EntityInfoComponentProps<T> {
  /**
   * Handler for changing input fields
   *
   * @param e - change event
   */
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  viewOnly?: boolean;

  readonly entity?: T;
}
