/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationViewQueryVariables = {
    id: string;
};
export type RelationViewQueryResponse = {
    readonly relation: {
        readonly id: string;
        readonly person: {
            readonly lastName: string | null;
            readonly firstName: string | null;
            readonly patronymic: string | null;
        } | null;
        readonly locationInstance: {
            readonly name: string | null;
        } | null;
        readonly relationType: {
            readonly name: string | null;
        } | null;
    } | null;
};
export type RelationViewQuery = {
    readonly response: RelationViewQueryResponse;
    readonly variables: RelationViewQueryVariables;
};



/*
query RelationViewQuery(
  $id: ID!
) {
  relation(id: $id) {
    id
    person {
      lastName
      firstName
      patronymic
    }
    locationInstance {
      name
      id
    }
    relationType {
      name
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Person",
  "kind": "LinkedField",
  "name": "person",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "patronymic",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = [
  (v4/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Relation",
        "kind": "LinkedField",
        "name": "relation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "locationInstance",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationType",
            "kind": "LinkedField",
            "name": "relationType",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Relation",
        "kind": "LinkedField",
        "name": "relation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "locationInstance",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationType",
            "kind": "LinkedField",
            "name": "relationType",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d5abd26d49b5eb814e3386174a79822b",
    "id": null,
    "metadata": {},
    "name": "RelationViewQuery",
    "operationKind": "query",
    "text": "query RelationViewQuery(\n  $id: ID!\n) {\n  relation(id: $id) {\n    id\n    person {\n      lastName\n      firstName\n      patronymic\n    }\n    locationInstance {\n      name\n      id\n    }\n    relationType {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ea144e01114766502d4244eaadfc0f51';
export default node;
