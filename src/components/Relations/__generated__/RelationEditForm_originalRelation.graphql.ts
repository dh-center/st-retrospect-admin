/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationEditForm_originalRelation = {
    readonly id: string;
    readonly person: {
        readonly id: string;
    } | null;
    readonly relationType: {
        readonly id: string;
    } | null;
    readonly locationInstance: {
        readonly id: string;
    } | null;
    readonly quote: string | null;
    readonly link: string | null;
    readonly " $refType": "RelationEditForm_originalRelation";
};
export type RelationEditForm_originalRelation$data = RelationEditForm_originalRelation;
export type RelationEditForm_originalRelation$key = {
    readonly " $data"?: RelationEditForm_originalRelation$data;
    readonly " $fragmentRefs": FragmentRefs<"RelationEditForm_originalRelation">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelationEditForm_originalRelation",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Person",
      "kind": "LinkedField",
      "name": "person",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "RelationType",
      "kind": "LinkedField",
      "name": "relationType",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationInstance",
      "kind": "LinkedField",
      "name": "locationInstance",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quote",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "link",
      "storageKey": null
    }
  ],
  "type": "Relation",
  "abstractKey": null
};
})();
(node as any).hash = 'b5e3eaf0d0a9aef39b0963ebca648cc8';
export default node;
