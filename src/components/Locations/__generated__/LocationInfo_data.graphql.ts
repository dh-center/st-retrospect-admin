/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInfo_data = {
    readonly id: string;
    readonly coordinateX: number | null;
    readonly coordinateY: number | null;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstancesTabs_data">;
    readonly " $refType": "LocationInfo_data";
};
export type LocationInfo_data$data = LocationInfo_data;
export type LocationInfo_data$key = {
    readonly " $data"?: LocationInfo_data$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInfo_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInfo_data",
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
      "name": "LocationInstancesTabs_data"
    }
  ],
  "type": "Location",
  "abstractKey": null
};
(node as any).hash = '2d671a202306c33dc5c826b395ee3e17';
export default node;
