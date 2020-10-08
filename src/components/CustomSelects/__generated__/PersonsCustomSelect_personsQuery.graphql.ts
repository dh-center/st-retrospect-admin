/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PersonsCustomSelect_personsQueryVariables = {};
export type PersonsCustomSelect_personsQueryResponse = {
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
export type PersonsCustomSelect_personsQuery = {
    readonly response: PersonsCustomSelect_personsQueryResponse;
    readonly variables: PersonsCustomSelect_personsQueryVariables;
};



/*
query PersonsCustomSelect_personsQuery {
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
    "name": "PersonsCustomSelect_personsQuery",
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
    "name": "PersonsCustomSelect_personsQuery",
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
    "cacheID": "233ac6767bb49ee4df5b3f1ffaa876a1",
    "id": null,
    "metadata": {},
    "name": "PersonsCustomSelect_personsQuery",
    "operationKind": "query",
    "text": "query PersonsCustomSelect_personsQuery {\n  persons {\n    edges {\n      node {\n        value: id\n        lastName\n        firstName\n        patronymic\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '62acf5878b8a6989ee159da98caf17ef';
export default node;
