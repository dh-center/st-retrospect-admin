/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonEditForm_originalPerson = {
    readonly id: string;
    readonly lastName: string | null;
    readonly firstName: string | null;
    readonly patronymic: string | null;
    readonly pseudonym: string | null;
    readonly mainPhotoLink: string | null;
    readonly professions: ReadonlyArray<string> | null;
    readonly description: string | null;
    readonly birthDate: string | null;
    readonly deathDate: string | null;
    readonly photoLinks: ReadonlyArray<string> | null;
    readonly wikiLink: string | null;
    readonly " $refType": "PersonEditForm_originalPerson";
};
export type PersonEditForm_originalPerson$data = PersonEditForm_originalPerson;
export type PersonEditForm_originalPerson$key = {
    readonly " $data"?: PersonEditForm_originalPerson$data;
    readonly " $fragmentRefs": FragmentRefs<"PersonEditForm_originalPerson">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PersonEditForm_originalPerson",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "patronymic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pseudonym",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mainPhotoLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "professions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "birthDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deathDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "photoLinks",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wikiLink",
      "storageKey": null
    }
  ],
  "type": "Person",
  "abstractKey": null
};
(node as any).hash = '2c215c5fe3a369c337da6d19d76990c4';
export default node;
