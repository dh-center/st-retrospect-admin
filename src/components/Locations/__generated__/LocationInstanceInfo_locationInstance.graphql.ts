/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstanceInfo_locationInstance = {
    readonly id: string;
    readonly name: string | null;
    readonly description: string | null;
    readonly constructionDate: string | null;
    readonly demolitionDate: string | null;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly " $refType": "LocationInstanceInfo_locationInstance";
};
export type LocationInstanceInfo_locationInstance$data = LocationInstanceInfo_locationInstance;
export type LocationInstanceInfo_locationInstance$key = {
    readonly " $data"?: LocationInstanceInfo_locationInstance$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstanceInfo_locationInstance">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInstanceInfo_locationInstance",
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
(node as any).hash = 'dd8792ee530a9ec9867875ca1d311c0a';
export default node;
