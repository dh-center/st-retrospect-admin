/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationEditForm_originalLocation = {
    readonly id: string;
    readonly latitude: number | null;
    readonly longitude: number | null;
    readonly addresses: ReadonlyArray<{
        readonly address: string | null;
    }> | null;
    readonly " $refType": "LocationEditForm_originalLocation";
};
export type LocationEditForm_originalLocation$data = LocationEditForm_originalLocation;
export type LocationEditForm_originalLocation$key = {
    readonly " $data"?: LocationEditForm_originalLocation$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationEditForm_originalLocation">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationEditForm_originalLocation",
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
      "name": "latitude",
      "storageKey": null
    },
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
    }
  ],
  "type": "Location",
  "abstractKey": null
};
(node as any).hash = '0d43ae859d5d93c896b283fe8176ea74';
export default node;
