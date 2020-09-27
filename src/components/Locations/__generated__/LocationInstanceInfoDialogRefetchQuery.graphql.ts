/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LocationInstanceInfoDialogRefetchQueryVariables = {
    locationInstaceId: string;
};
export type LocationInstanceInfoDialogRefetchQueryResponse = {
    readonly locationInstance: {
        readonly " $fragmentRefs": FragmentRefs<"LocationInstanceInfoDialog_locationInstance">;
    } | null;
};
export type LocationInstanceInfoDialogRefetchQuery = {
    readonly response: LocationInstanceInfoDialogRefetchQueryResponse;
    readonly variables: LocationInstanceInfoDialogRefetchQueryVariables;
};



/*
query LocationInstanceInfoDialogRefetchQuery(
  $locationInstaceId: ID!
) {
  locationInstance(id: $locationInstaceId) {
    ...LocationInstanceInfoDialog_locationInstance
    id
  }
}

fragment LocationInstanceInfoDialog_locationInstance on LocationInstance {
  id
  name
  description
  constructionDate
  demolitionDate
  startDate
  endDate
  mainPhotoLink
  photoLinks
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locationInstaceId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "locationInstaceId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceInfoDialogRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "locationInstance",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LocationInstanceInfoDialog_locationInstance"
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
    "name": "LocationInstanceInfoDialogRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationInstance",
        "kind": "LinkedField",
        "name": "locationInstance",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mainPhotoLink",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "photoLinks",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5256f88a95328948b98c64d87f7a4f14",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogRefetchQuery",
    "operationKind": "query",
    "text": "query LocationInstanceInfoDialogRefetchQuery(\n  $locationInstaceId: ID!\n) {\n  locationInstance(id: $locationInstaceId) {\n    ...LocationInstanceInfoDialog_locationInstance\n    id\n  }\n}\n\nfragment LocationInstanceInfoDialog_locationInstance on LocationInstance {\n  id\n  name\n  description\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n  mainPhotoLink\n  photoLinks\n}\n"
  }
};
})();
(node as any).hash = '211649f125b98a1576147c63240a903f';
export default node;
