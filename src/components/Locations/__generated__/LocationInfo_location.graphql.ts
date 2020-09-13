/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInfo_location = {
    readonly id: string;
    readonly coordinateX: number | null;
    readonly coordinateY: number | null;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstancesList_data">;
    readonly " $refType": "LocationInfo_location";
};
export type LocationInfo_location$data = LocationInfo_location;
export type LocationInfo_location$key = {
    readonly " $data"?: LocationInfo_location$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInfo_location">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInfo_location",
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
      "name": "coordinateX",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "coordinateY",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LocationInstancesList_data"
    }
  ],
  "type": "Location",
  "abstractKey": null
};
(node as any).hash = '5fce293de768cba2125dd8470dfd8cd2';
export default node;
