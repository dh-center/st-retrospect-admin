/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstancesTabs_data = {
    readonly instances: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"LocationInstanceInfo_locationInstance">;
    }>;
    readonly " $refType": "LocationInstancesTabs_data";
};
export type LocationInstancesTabs_data$data = LocationInstancesTabs_data;
export type LocationInstancesTabs_data$key = {
    readonly " $data"?: LocationInstancesTabs_data$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstancesTabs_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInstancesTabs_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationInstance",
      "kind": "LinkedField",
      "name": "instances",
      "plural": true,
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "LocationInstanceInfo_locationInstance"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
(node as any).hash = 'a5ce367f5c79aa8201c60267ed519deb';
export default node;
