/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type VisualizationPageQueryVariables = {};
export type VisualizationPageQueryResponse = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly birthDate: string | null;
                readonly deathDate: string | null;
                readonly relations: ReadonlyArray<{
                    readonly locationInstance: {
                        readonly id: string;
                    } | null;
                }>;
            };
        }>;
    };
};
export type VisualizationPageQuery = {
    readonly response: VisualizationPageQueryResponse;
    readonly variables: VisualizationPageQueryVariables;
};



/*
query VisualizationPageQuery {
  persons {
    edges {
      node {
        birthDate
        deathDate
        relations {
          locationInstance {
            id
          }
          id
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "birthDate",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deathDate",
  "storageKey": null
},
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
  "concreteType": "LocationInstance",
  "kind": "LinkedField",
  "name": "locationInstance",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VisualizationPageQuery",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Relation",
                    "kind": "LinkedField",
                    "name": "relations",
                    "plural": true,
                    "selections": [
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VisualizationPageQuery",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Relation",
                    "kind": "LinkedField",
                    "name": "relations",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
    "id": null,
    "metadata": {},
    "name": "VisualizationPageQuery",
    "operationKind": "query",
    "text": "query VisualizationPageQuery {\n  persons {\n    edges {\n      node {\n        birthDate\n        deathDate\n        relations {\n          locationInstance {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1d60da898e9611616f9cded9384863bf';
export default node;
