/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationsListForwardQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type RelationsListForwardQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"RelationsList_entityConnection">;
};
export type RelationsListForwardQuery = {
    readonly response: RelationsListForwardQueryResponse;
    readonly variables: RelationsListForwardQueryVariables;
};



/*
query RelationsListForwardQuery(
  $first: Int
  $after: Cursor
) {
  ...RelationsList_entityConnection_2HEEH6
}

fragment RelationsList_entityConnection_2HEEH6 on Query {
  entities: relations(first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        person {
          lastName
          firstName
          patronymic
          id
        }
        locationInstance {
          name
          id
        }
        relationType {
          name
          id
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationsListForwardQuery",
    "selections": [
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "RelationsList_entityConnection"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RelationsListForwardQuery",
    "selections": [
      {
        "alias": "entities",
        "args": (v2/*: any*/),
        "concreteType": "RelationConnection",
        "kind": "LinkedField",
        "name": "relations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                  (v3/*: any*/),
                  {
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
                      },
                      (v3/*: any*/)
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "RelationType",
                    "kind": "LinkedField",
                    "name": "relationType",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "entities",
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "RelationsPage_entities",
        "kind": "LinkedHandle",
        "name": "relations"
      }
    ]
  },
  "params": {
    "cacheID": "6d1936f319aee1e6f6c30e7bb10b3494",
    "id": null,
    "metadata": {},
    "name": "RelationsListForwardQuery",
    "operationKind": "query",
    "text": "query RelationsListForwardQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...RelationsList_entityConnection_2HEEH6\n}\n\nfragment RelationsList_entityConnection_2HEEH6 on Query {\n  entities: relations(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        person {\n          lastName\n          firstName\n          patronymic\n          id\n        }\n        locationInstance {\n          name\n          id\n        }\n        relationType {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '333472c2a2bf00f24f48ccb62c659bbf';
export default node;
