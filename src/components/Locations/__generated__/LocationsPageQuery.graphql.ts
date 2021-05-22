/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationsPageQueryVariables = {
    query: string;
    skip: number;
    first: number;
};
export type LocationsPageQueryResponse = {
    readonly locationsSearch: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"LocationRow_location">;
            };
        }>;
        readonly totalCount: number;
        readonly suggest: string | null;
    };
};
export type LocationsPageQuery = {
    readonly response: LocationsPageQueryResponse;
    readonly variables: LocationsPageQueryVariables;
};



/*
query LocationsPageQuery(
  $query: String!
  $skip: Int!
  $first: Int!
) {
  locationsSearch(input: {query: $query, windowedPagination: {skip: $skip, first: $first}}) {
    edges {
      node {
        id
        ...LocationRow_location
      }
    }
    totalCount
    suggest
  }
}

fragment LocationRow_location on Location {
  id
  longitude
  latitude
  addresses {
    address
  }
  instances {
    id
    name
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "query"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "first"
          },
          {
            "kind": "Variable",
            "name": "skip",
            "variableName": "skip"
          }
        ],
        "kind": "ObjectValue",
        "name": "windowedPagination"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "suggest",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "LocationSearchConnection",
        "kind": "LinkedField",
        "name": "locationsSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LocationRow_location"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "LocationsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "LocationSearchConnection",
        "kind": "LinkedField",
        "name": "locationsSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "longitude",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "latitude",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Address",
                    "kind": "LinkedField",
                    "name": "addresses",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationInstance",
                    "kind": "LinkedField",
                    "name": "instances",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
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
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0f7aabc74004584db192509c17323f6f",
    "id": null,
    "metadata": {},
    "name": "LocationsPageQuery",
    "operationKind": "query",
    "text": "query LocationsPageQuery(\n  $query: String!\n  $skip: Int!\n  $first: Int!\n) {\n  locationsSearch(input: {query: $query, windowedPagination: {skip: $skip, first: $first}}) {\n    edges {\n      node {\n        id\n        ...LocationRow_location\n      }\n    }\n    totalCount\n    suggest\n  }\n}\n\nfragment LocationRow_location on Location {\n  id\n  longitude\n  latitude\n  addresses {\n    address\n  }\n  instances {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a601b736568abdcffcb85c9678c15bdd';
export default node;
