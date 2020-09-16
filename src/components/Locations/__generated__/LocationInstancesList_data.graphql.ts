/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstancesList_data = {
    readonly instances: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"LocationInstanceListItem_instance" | "LocationInstanceInfoDialog_locationInstance">;
    }>;
    readonly " $refType": "LocationInstancesList_data";
};
export type LocationInstancesList_data$data = LocationInstancesList_data;
export type LocationInstancesList_data$key = {
    readonly " $data"?: LocationInstancesList_data$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstancesList_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInstancesList_data",
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
          "name": "LocationInstanceListItem_instance"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LocationInstanceInfoDialog_locationInstance"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
(node as any).hash = '988b9d4c8116529a28124dc33b1b9813';
export default node;
