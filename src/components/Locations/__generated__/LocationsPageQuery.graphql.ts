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
        readonly nodes: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"LocationRow_location">;
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
  locationsSearch(input: {query: $query, skip: $skip, first: $first}) {
    nodes {
      id
      ...LocationRow_location
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
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query"
      },
      {
        "kind": "Variable",
        "name": "skip",
        "variableName": "skip"
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
        "concreteType": "LocationsSearchResult",
        "kind": "LinkedField",
        "name": "locationsSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LocationRow_location"
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
        "concreteType": "LocationsSearchResult",
        "kind": "LinkedField",
        "name": "locationsSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
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
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b1b59be64e5bc36934da1c55a8ce6f8c",
    "id": null,
    "metadata": {},
    "name": "LocationsPageQuery",
    "operationKind": "query",
    "text": "query LocationsPageQuery(\n  $query: String!\n  $skip: Int!\n  $first: Int!\n) {\n  locationsSearch(input: {query: $query, skip: $skip, first: $first}) {\n    nodes {\n      id\n      ...LocationRow_location\n    }\n    totalCount\n    suggest\n  }\n}\n\nfragment LocationRow_location on Location {\n  id\n  longitude\n  latitude\n  addresses {\n    address\n  }\n  instances {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c776f95d86e69d88755fd15b973315b6';
export default node;
