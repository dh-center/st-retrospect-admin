/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationCreate_personsQueryVariables = {};
export type RelationCreate_personsQueryResponse = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly value: string;
                readonly lastName: string | null;
                readonly firstName: string | null;
                readonly patronymic: string | null;
            };
        }>;
    };
};
export type RelationCreate_personsQuery = {
    readonly response: RelationCreate_personsQueryResponse;
    readonly variables: RelationCreate_personsQueryVariables;
};



/*
query RelationCreate_personsQuery {
  persons {
    edges {
      node {
        value: id
        lastName
        firstName
        patronymic
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": "value",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "patronymic",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationCreate_personsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PersonConnection",
        "kind": "LinkedField",
        "name": "persons",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PersonEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Person",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelationCreate_personsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PersonConnection",
        "kind": "LinkedField",
        "name": "persons",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PersonEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Person",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9611dc8c5d051b51e2e26f05fb699622",
    "id": null,
    "metadata": {},
    "name": "RelationCreate_personsQuery",
    "operationKind": "query",
    "text": "query RelationCreate_personsQuery {\n  persons {\n    edges {\n      node {\n        value: id\n        lastName\n        firstName\n        patronymic\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '189454a583dcd6e90ffc90603a27a865';
export default node;
