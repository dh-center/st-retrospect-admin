/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonsPageQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type PersonsPageQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"PersonsPage_entityConnection">;
};
export type PersonsPageQuery = {
    readonly response: PersonsPageQueryResponse;
    readonly variables: PersonsPageQueryVariables;
};



/*
query PersonsPageQuery(
  $first: Int
  $after: Cursor
) {
  ...PersonsPage_entityConnection_2HEEH6
}

fragment PersonsPage_entityConnection_2HEEH6 on Query {
  entities: persons(first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        firstName
        lastName
        patronymic
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "Cursor"
  }
],
v1 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonsPageQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "PersonsPage_entityConnection"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonsPageQuery",
    "selections": [
      {
        "alias": "entities",
        "args": (v1/*: any*/),
        "concreteType": "PersonConnection",
        "kind": "LinkedField",
        "name": "persons",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
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
                    "name": "lastName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "patronymic",
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
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "PersonsList_entities",
        "kind": "LinkedHandle",
        "name": "persons"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PersonsPageQuery",
    "operationKind": "query",
    "text": "query PersonsPageQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...PersonsPage_entityConnection_2HEEH6\n}\n\nfragment PersonsPage_entityConnection_2HEEH6 on Query {\n  entities: persons(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        firstName\n        lastName\n        patronymic\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '25c55678c77b38a5245d947be425403d';
export default node;
