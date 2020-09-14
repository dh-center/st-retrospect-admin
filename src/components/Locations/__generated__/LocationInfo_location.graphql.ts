/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInfo_location = {
    readonly id: string;
    readonly coordinateX: number | null;
    readonly coordinateY: number | null;
    readonly instances: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstancesList_data">;
    readonly " $refType": "LocationInfo_location";
};
export type LocationInfo_location$data = LocationInfo_location;
export type LocationInfo_location$key = {
    readonly " $data"?: LocationInfo_location$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInfo_location">;
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
  "name": "LocationInfo_location",
  "selections": [
    (v0/*: any*/),
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
      "alias": null,
      "args": null,
      "concreteType": "LocationInstance",
      "kind": "LinkedField",
      "name": "instances",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
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
})();
(node as any).hash = '261cf72ccf54c14876765dac55573ae7';
export default node;
