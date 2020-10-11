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
    readonly mainPhotoLink: string | null;
    readonly photoLinks: ReadonlyArray<string> | null;
    readonly location: {
        readonly id: string;
    };
    readonly " $refType": "LocationInstanceInfoDialog_locationInstance";
};
export type LocationInstanceInfoDialog_locationInstance$data = LocationInstanceInfoDialog_locationInstance;
export type LocationInstanceInfoDialog_locationInstance$key = {
    readonly " $data"?: LocationInstanceInfoDialog_locationInstance$data;
    readonly " $fragmentRefs": FragmentRefs<"LocationInstanceInfoDialog_locationInstance">;
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
  "name": "LocationInstanceInfoDialog_locationInstance",
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
      "name": "photoLinks",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "LocationInstance",
  "abstractKey": null
};
})();
(node as any).hash = '49d3244712ed0286caa0252ea57024ec';
export default node;
