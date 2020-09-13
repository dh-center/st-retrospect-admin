/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstanceInfoDialog_locationInstance = {
    readonly id: string;
    readonly name: string | null;
    readonly description: string | null;
    readonly constructionDate: string | null;
    readonly demolitionDate: string | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly " $refType": "LocationInstanceInfoDialog_locationInstance";
};
export type LocationInstanceInfoDialog_locationInstance$data = LocationInstanceInfoDialog_locationInstance;
export type LocationInstanceInfoDialog_locationInstance$key = {
    readonly " $data"?: LocationInstanceInfoDialog_locationInstance$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstanceInfoDialog_locationInstance">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInstanceInfoDialog_locationInstance",
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "constructionDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demolitionDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    }
  ],
  "type": "LocationInstance",
  "abstractKey": null
};
(node as any).hash = '6e3d62a9444dba7dfd07bfccd23f4114';
export default node;
