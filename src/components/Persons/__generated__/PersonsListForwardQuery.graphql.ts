/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonsListForwardQueryVariables = {
    first?: number | null;
    after?: unknown | null;
};
export type PersonsListForwardQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"PersonsList_entityConnection">;
};
export type PersonsListForwardQuery = {
    readonly response: PersonsListForwardQueryResponse;
    readonly variables: PersonsListForwardQueryVariables;
};



/*
query PersonsListForwardQuery(
  $first: Int
  $after: Cursor
) {
  ...PersonsList_entityConnection_2HEEH6
}

fragment PersonsList_entityConnection_2HEEH6 on Query {
  entities: persons(first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        lastName
        firstName
        patronymic
        pseudonym
        birthDate
        deathDate
        profession
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonsListForwardQuery",
    "selections": [
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "PersonsList_entityConnection"
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
    "name": "PersonsListForwardQuery",
    "selections": [
      {
        "alias": "entities",
        "args": (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "pseudonym",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "birthDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "deathDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "profession",
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
        "key": "PersonsPage_entities",
        "kind": "LinkedHandle",
        "name": "persons"
      }
    ]
  },
  "params": {
    "cacheID": "b6e53f5c697879883ab959f2d28538e0",
    "id": null,
    "metadata": {},
    "name": "PersonsListForwardQuery",
    "operationKind": "query",
    "text": "query PersonsListForwardQuery(\n  $first: Int\n  $after: Cursor\n) {\n  ...PersonsList_entityConnection_2HEEH6\n}\n\nfragment PersonsList_entityConnection_2HEEH6 on Query {\n  entities: persons(first: $first, after: $after) {\n    totalCount\n    edges {\n      node {\n        id\n        lastName\n        firstName\n        patronymic\n        pseudonym\n        birthDate\n        deathDate\n        profession\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '47c08208f8f3c480774b0ef79cce52cc';
export default node;
