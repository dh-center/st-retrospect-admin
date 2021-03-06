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
    readonly cardPhotoLink: string | null;
    readonly professions: ReadonlyArray<string> | null;
    readonly description: string | null;
    readonly birthDate: string | null;
    readonly deathDate: string | null;
    readonly photoLinks: ReadonlyArray<string> | null;
    readonly wikiLink: string | null;
    readonly tags: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "PersonEditForm_originalPerson";
};
export type PersonEditForm_originalPerson$data = PersonEditForm_originalPerson;
export type PersonEditForm_originalPerson$key = {
    readonly " $data"?: PersonEditForm_originalPerson$data;
    readonly " $fragmentRefs": FragmentRefs<"PersonEditForm_originalPerson">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PersonEditForm_originalPerson",
  "selections": [
    (v0/*: any*/),
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
      "name": "cardPhotoLink",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Tag",
      "kind": "LinkedField",
      "name": "tags",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Person",
  "abstractKey": null
};
})();
(node as any).hash = 'dd68c213e8393bc1fa98259d5758348e';
export default node;
