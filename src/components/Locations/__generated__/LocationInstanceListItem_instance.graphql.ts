/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstanceListItem_instance = {
    readonly name: string | null;
    readonly mainPhotoLink: string | null;
    readonly description: string | null;
    readonly " $refType": "LocationInstanceListItem_instance";
};
export type LocationInstanceListItem_instance$data = LocationInstanceListItem_instance;
export type LocationInstanceListItem_instance$key = {
    readonly " $data"?: LocationInstanceListItem_instance$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstanceListItem_instance">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationInstanceListItem_instance",
  "selections": [
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
      "name": "mainPhotoLink",
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
  "type": "LocationInstance",
  "abstractKey": null
};
(node as any).hash = '23f30cb37336ead1c5a4171a07faa51c';
export default node;
