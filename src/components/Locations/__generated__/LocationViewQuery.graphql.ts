/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LocationViewQueryVariables = {
    id: string;
};
export type LocationViewQueryResponse = {
    readonly entity: {
        readonly id: string;
        readonly instances: ReadonlyArray<{
            readonly id: string;
            readonly name: string | null;
            readonly demolitionDate: string | null;
            readonly constructionDate: string | null;
            readonly architects: ReadonlyArray<{
                readonly id: string;
                readonly firstName: string | null;
                readonly lastName: string | null;
                readonly patronymic: string | null;
            } | null> | null;
            readonly startDate: string | null;
            readonly endDate: string | null;
            readonly description: string | null;
            readonly locationTypes: ReadonlyArray<{
                readonly id: string;
                readonly name: string | null;
            } | null> | null;
        }>;
    } | null;
};
export type LocationViewQuery = {
    readonly response: LocationViewQueryResponse;
    readonly variables: LocationViewQueryVariables;
};



/*
query LocationViewQuery(
  $id: ID!
) {
  entity: location(id: $id) {
    id
    instances {
      id
      name
      demolitionDate
      constructionDate
      architects {
        id
        firstName
        lastName
        patronymic
      }
      startDate
      endDate
      description
      locationTypes {
        id
        name
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": "entity",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "location",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "instances",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "demolitionDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "constructionDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "architects",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationViewQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationViewQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "2f20964b9fa076d45bbcd9a45344fd0e",
    "id": null,
    "metadata": {},
    "name": "LocationViewQuery",
    "operationKind": "query",
    "text": "query LocationViewQuery(\n  $id: ID!\n) {\n  entity: location(id: $id) {\n    id\n    instances {\n      id\n      name\n      demolitionDate\n      constructionDate\n      architects {\n        id\n        firstName\n        lastName\n        patronymic\n      }\n      startDate\n      endDate\n      description\n      locationTypes {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1e68548ece0b55da102603f6ad74ad69';
export default node;
