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
  $locationInstaceId: GlobalId!
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
  source
  constructionDate
  demolitionDate
  startDate
  endDate
  mainPhotoLink
  photoLinks
  architects {
    id
  }
  location {
    id
  }
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
],
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
            "name": "source",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "architects",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "16ee19ae2e203bad096b3783f1c785e7",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogRefetchQuery",
    "operationKind": "query",
    "text": "query LocationInstanceInfoDialogRefetchQuery(\n  $locationInstaceId: GlobalId!\n) {\n  locationInstance(id: $locationInstaceId) {\n    ...LocationInstanceInfoDialog_locationInstance\n    id\n  }\n}\n\nfragment LocationInstanceInfoDialog_locationInstance on LocationInstance {\n  id\n  name\n  description\n  source\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n  mainPhotoLink\n  photoLinks\n  architects {\n    id\n  }\n  location {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '41799bb88f30e6f84ee2f81291c220a1';
export default node;
