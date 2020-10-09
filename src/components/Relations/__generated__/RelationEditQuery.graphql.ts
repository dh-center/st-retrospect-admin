/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationEditQueryVariables = {
    id: string;
};
export type RelationEditQueryResponse = {
    readonly relation: {
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
    } | null;
};
export type RelationEditQuery = {
    readonly response: RelationEditQueryResponse;
    readonly variables: RelationEditQueryVariables;
};



/*
query RelationEditQuery(
  $id: GlobalId!
) {
  relation(id: $id) {
    id
    person {
      id
    }
    relationType {
      id
    }
    locationInstance {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Relation",
    "kind": "LinkedField",
    "name": "relation",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "person",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationType",
        "kind": "LinkedField",
        "name": "relationType",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "locationInstance",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationEditQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationEditQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "39b053dd41ecaf6d9b12373e0674253b",
    "id": null,
    "metadata": {},
    "name": "RelationEditQuery",
    "operationKind": "query",
    "text": "query RelationEditQuery(\n  $id: GlobalId!\n) {\n  relation(id: $id) {\n    id\n    person {\n      id\n    }\n    relationType {\n      id\n    }\n    locationInstance {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2286b803cacc7af5673c45dabaa7752b';
export default node;
