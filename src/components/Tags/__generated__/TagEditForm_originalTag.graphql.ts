/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TagEditForm_originalTag = {
    readonly id: string;
    readonly value: string;
    readonly " $refType": "TagEditForm_originalTag";
};
export type TagEditForm_originalTag$data = TagEditForm_originalTag;
export type TagEditForm_originalTag$key = {
    readonly " $data"?: TagEditForm_originalTag$data;
    readonly " $fragmentRefs": FragmentRefs<"TagEditForm_originalTag">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TagEditForm_originalTag",
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
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "Tag",
  "abstractKey": null
};
(node as any).hash = 'cec1a07fc3d02fc3613d305268d92682';
export default node;
