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
            readonly id: string;
            readonly lastName: string | null;
            readonly firstName: string | null;
            readonly patronymic: string | null;
        } | null;
        readonly locationInstance: {
            readonly location: {
                readonly id: string;
            };
            readonly name: string | null;
        } | null;
        readonly relationType: {
            readonly name: string;
        } | null;
        readonly quote: string | null;
    } | null;
};
export type RelationViewQuery = {
    readonly response: RelationViewQueryResponse;
    readonly variables: RelationViewQueryVariables;
};



/*
query RelationViewQuery(
  $id: GlobalId!
) {
  relation(id: $id) {
    id
    person {
      id
      lastName
      firstName
      patronymic
    }
    locationInstance {
      location {
        id
      }
      name
      id
    }
    relationType {
      name
      id
    }
    quote
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
    (v2/*: any*/),
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
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "quote",
  "storageKey": null
};
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
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationType",
            "kind": "LinkedField",
            "name": "relationType",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
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
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationType",
            "kind": "LinkedField",
            "name": "relationType",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9dd228260f4536a658f42d7caa83ad3b",
    "id": null,
    "metadata": {},
    "name": "RelationViewQuery",
    "operationKind": "query",
    "text": "query RelationViewQuery(\n  $id: GlobalId!\n) {\n  relation(id: $id) {\n    id\n    person {\n      id\n      lastName\n      firstName\n      patronymic\n    }\n    locationInstance {\n      location {\n        id\n      }\n      name\n      id\n    }\n    relationType {\n      name\n      id\n    }\n    quote\n  }\n}\n"
  }
};
})();
(node as any).hash = '664f40949dbc4c570b53e078dd857b89';
export default node;
