import { QuestsPage_entityConnection as QuestConnection } from '../components/Quests/__generated__/QuestsPage_entityConnection.graphql';

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
export type Entity = EntityConnection['entities']['edges'][0]['node'];

export enum EntityTypes {
  QUEST = 'QUEST'
}
