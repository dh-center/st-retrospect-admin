/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationsPage_location = {
    readonly id: string;
    readonly longitude: number | null;
    readonly latitude: number | null;
    readonly addresses: ReadonlyArray<{
        readonly address: string | null;
    }> | null;
    readonly instances: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly description: string | null;
    }>;
    readonly " $refType": "LocationsPage_location";
};
export type LocationsPage_location$data = LocationsPage_location;
export type LocationsPage_location$key = {
    readonly " $data"?: LocationsPage_location$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationsPage_location">;
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
  "name": "LocationsPage_location",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "longitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "latitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Address",
      "kind": "LinkedField",
      "name": "addresses",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "address",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationInstance",
      "kind": "LinkedField",
      "name": "instances",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();
(node as any).hash = 'b36d157def0cc84bd9f7f6d7d006305a';
export default node;
