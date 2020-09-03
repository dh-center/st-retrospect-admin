import { QuestViewQuery } from '../components/Quests/__generated__/QuestViewQuery.graphql';
import { LocationViewQuery } from '../components/Locations/__generated__/LocationViewQuery.graphql';
import { PersonInfo_person } from '../components/Persons/__generated__/PersonInfo_person.graphql';

/**
 * Interface represents Relay Connection model
 */
export interface EntityConnection {
  readonly entities: {
    readonly totalCount: number;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly [key: string]: any;
      };
    }>;
  };
  readonly ' $refType': string;
}

/**
 * Full quest info
 */
export type Quest = NonNullable<QuestViewQuery['response']['entity']>;

/**
 * Full person info
 */
export type Person = NonNullable<PersonInfo_person>;

/**
 * Full location info
 */
export type Location = NonNullable<LocationViewQuery['response']['entity']>;

/**
 * Base entity info
 */
export type Entity<T extends EntityConnection = EntityConnection> = T['entities']['edges'][0]['node'];

/**
 * Removes id field from type
 */
export type OmitId<T> = Omit<T, 'id'>;

export enum EntityTypes {
  QUEST = 'QUEST'
}

export interface EntityInfoComponentProps<T> {
  /**
   * Handler for changing entity field
   *
   * @param e - change event
   */
  onChange?: (e: T) => void;

  /**
   * If true, info-component will be rendered in view-only mode (without possibility to change values)
   */
  viewOnly?: boolean;

  /**
   * Entity for displaying
   */
  readonly entity: T;
}

/**
 * Standard properties that all info components have
 */
export interface DefaultInfoComponentProps<T> {
  /**
   * Handler for changing entity field
   *
   * @param e - change event
   */
  onChange?: (e: T) => void;

  /**
   * If true, info-component will be rendered in view-only mode (without possibility to change values)
   */
  viewOnly?: boolean;
}
