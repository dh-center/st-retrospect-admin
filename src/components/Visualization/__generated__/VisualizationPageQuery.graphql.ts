/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VisualizationPageQueryVariables = {};
export type VisualizationPageQueryResponse = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly birthDate: string | null;
                readonly deathDate: string | null;
                readonly lastName: string | null;
                readonly firstName: string | null;
                readonly patronymic: string | null;
            };
        }>;
    };
    readonly " $fragmentRefs": FragmentRefs<"RelationsGraph_data" | "PersonsTreeMap_data">;
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
        lastName
        firstName
        patronymic
        id
      }
    }
  }
  ...RelationsGraph_data
  ...PersonsTreeMap_data
}

fragment PersonsTreeMap_data on Query {
  persons {
    edges {
      node {
        profession
        birthDate
        id
      }
    }
  }
}

fragment RelationsGraph_data on Query {
  relations {
    edges {
      node {
        id
        person {
          id
          lastName
          firstName
          patronymic
        }
        locationInstance {
          id
          name
          locationTypes {
            id
          }
        }
      }
    }
  }
  locationTypes {
    id
    name
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
  "name": "lastName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "patronymic",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
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
        "name": "RelationsGraph_data"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PersonsTreeMap_data"
      }
    ],
    "type": "Query",
    "abstractKey": null
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "profession",
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
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationInstance",
                    "kind": "LinkedField",
                    "name": "locationInstance",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationType",
                        "kind": "LinkedField",
                        "name": "locationTypes",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/)
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationType",
        "kind": "LinkedField",
        "name": "locationTypes",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a8a72e40bf5ea074a0b3c3b70a2c90c2",
    "id": null,
    "metadata": {},
    "name": "VisualizationPageQuery",
    "operationKind": "query",
    "text": "query VisualizationPageQuery {\n  persons {\n    edges {\n      node {\n        birthDate\n        deathDate\n        lastName\n        firstName\n        patronymic\n        id\n      }\n    }\n  }\n  ...RelationsGraph_data\n  ...PersonsTreeMap_data\n}\n\nfragment PersonsTreeMap_data on Query {\n  persons {\n    edges {\n      node {\n        profession\n        birthDate\n        id\n      }\n    }\n  }\n}\n\nfragment RelationsGraph_data on Query {\n  relations {\n    edges {\n      node {\n        id\n        person {\n          id\n          lastName\n          firstName\n          patronymic\n        }\n        locationInstance {\n          id\n          name\n          locationTypes {\n            id\n          }\n        }\n      }\n    }\n  }\n  locationTypes {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '156c261933f23ad42cdcee0a97879fae';
export default node;
