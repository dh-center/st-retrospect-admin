import { PersonsPage_entityConnection as PersonsConnection } from '../components/Persons/__generated__/PersonsPage_entityConnection.graphql';

import { QuestsPageQuestQuery } from '../components/Quests/__generated__/QuestsPageQuestQuery.graphql';
import { PersonsPagePersonQuery } from '../components/Persons/__generated__/PersonsPagePersonQuery.graphql';

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

export type Quest = NonNullable<QuestsPageQuestQuery['response']['entity']>;
export type Person = NonNullable<PersonsPagePersonQuery['response']['entity']>;
export type Entity = EntityConnection['entities']['edges'][0]['node'];

export type OmitId<T> = Omit<T, 'id'>

export enum EntityTypes {
  QUEST = 'QUEST'
}

export interface EntityInfoComponentProps<T> {
  /**
   * Handler for changing input fields
   *
   * @param e - change event
   */
  onChange?: (e: T) => void;

  viewOnly?: boolean;

  readonly entity: T;
}
