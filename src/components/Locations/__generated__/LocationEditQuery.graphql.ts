/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationEditQueryVariables = {
    id: string;
};
export type LocationEditQueryResponse = {
    readonly location: {
        readonly " $fragmentRefs": FragmentRefs<"LocationInfo_data">;
    } | null;
};
export type LocationEditQuery = {
    readonly response: LocationEditQueryResponse;
    readonly variables: LocationEditQueryVariables;
};



/*
query LocationEditQuery(
  $id: ID!
) {
  location(id: $id) {
    ...LocationInfo_data
    id
  }
}

fragment LocationInfo_data on Location {
  id
  coordinateX
  coordinateY
  ...LocationInstancesTabs_data
}

fragment LocationInstanceInfo_locationInstance on LocationInstance {
  id
  name
  description
  constructionDate
  demolitionDate
  startDate
  endDate
}

fragment LocationInstancesTabs_data on Location {
  instances {
    id
    name
    ...LocationInstanceInfo_locationInstance
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LocationInfo_data"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coordinateX",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coordinateY",
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
              (v2/*: any*/),
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
                "kind": "ScalarField",
                "name": "demolitionDate",
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
    "cacheID": "ba43c002908b909aaeb48909c849c2b4",
    "id": null,
    "metadata": {},
    "name": "LocationEditQuery",
    "operationKind": "query",
    "text": "query LocationEditQuery(\n  $id: ID!\n) {\n  location(id: $id) {\n    ...LocationInfo_data\n    id\n  }\n}\n\nfragment LocationInfo_data on Location {\n  id\n  coordinateX\n  coordinateY\n  ...LocationInstancesTabs_data\n}\n\nfragment LocationInstanceInfo_locationInstance on LocationInstance {\n  id\n  name\n  description\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n}\n\nfragment LocationInstancesTabs_data on Location {\n  instances {\n    id\n    name\n    ...LocationInstanceInfo_locationInstance\n  }\n}\n"
  }
};
})();
(node as any).hash = '5a5fa02c39cf0b7ddd562853c6fb6f36';
export default node;
