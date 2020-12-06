/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationTypeEditForm_originalRelationType = {
    readonly id: string;
    readonly name: string;
    readonly synonyms: ReadonlyArray<string>;
    readonly " $refType": "RelationTypeEditForm_originalRelationType";
};
export type RelationTypeEditForm_originalRelationType$data = RelationTypeEditForm_originalRelationType;
export type RelationTypeEditForm_originalRelationType$key = {
    readonly " $data"?: RelationTypeEditForm_originalRelationType$data;
    readonly " $fragmentRefs": FragmentRefs<"RelationTypeEditForm_originalRelationType">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelationTypeEditForm_originalRelationType",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "synonyms",
      "storageKey": null
    }
  ],
  "type": "RelationType",
  "abstractKey": null
};
(node as any).hash = '061404674f7090ce69fe8dd0bd3e6cf1';
export default node;
