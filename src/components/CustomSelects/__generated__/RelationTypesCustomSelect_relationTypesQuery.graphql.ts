/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationTypesCustomSelect_relationTypesQueryVariables = {};
export type RelationTypesCustomSelect_relationTypesQueryResponse = {
    readonly relationTypes: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly value: string;
                readonly name: string;
            };
        }>;
    };
};
export type RelationTypesCustomSelect_relationTypesQuery = {
    readonly response: RelationTypesCustomSelect_relationTypesQueryResponse;
    readonly variables: RelationTypesCustomSelect_relationTypesQueryVariables;
};



/*
query RelationTypesCustomSelect_relationTypesQuery {
  relationTypes {
    edges {
      node {
        value: id
        name
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationTypeConnection",
        "kind": "LinkedField",
        "name": "relationTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RelationType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
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
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationTypeConnection",
        "kind": "LinkedField",
        "name": "relationTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RelationType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
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
    "cacheID": "d57c39483f8a4c878db3bc22b48daad4",
    "id": null,
    "metadata": {},
    "name": "RelationTypesCustomSelect_relationTypesQuery",
    "operationKind": "query",
    "text": "query RelationTypesCustomSelect_relationTypesQuery {\n  relationTypes {\n    edges {\n      node {\n        value: id\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1fd6b6693a8c33172d1356f413551d22';
export default node;
