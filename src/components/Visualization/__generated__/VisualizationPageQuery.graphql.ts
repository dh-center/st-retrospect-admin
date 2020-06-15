/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VisualizationPageQueryVariables = {};
export type VisualizationPageQueryResponse = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly birthDate: string | null;
                readonly deathDate: string | null;
            };
        }>;
    };
    readonly " $fragmentRefs": FragmentRefs<"RelationsGraph_relations">;
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
        id
      }
    }
  }
  ...RelationsGraph_relations
}

fragment RelationsGraph_relations on Query {
  relations {
    edges {
      node {
        id
        person {
          id
        }
        locationInstance {
          id
        }
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
v3 = [
  (v2/*: any*/)
];
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
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RelationsGraph_relations"
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "RelationConnection",
        "kind": "LinkedField",
        "name": "relations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Relation",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationInstance",
                    "kind": "LinkedField",
                    "name": "locationInstance",
                    "plural": false,
                    "selections": (v3/*: any*/),
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
    "id": null,
    "metadata": {},
    "name": "VisualizationPageQuery",
    "operationKind": "query",
    "text": "query VisualizationPageQuery {\n  persons {\n    edges {\n      node {\n        birthDate\n        deathDate\n        id\n      }\n    }\n  }\n  ...RelationsGraph_relations\n}\n\nfragment RelationsGraph_relations on Query {\n  relations {\n    edges {\n      node {\n        id\n        person {\n          id\n        }\n        locationInstance {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '33f9efcbcdcbf8c70710dac11d403b67';
export default node;
