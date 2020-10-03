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
        readonly " $fragmentRefs": FragmentRefs<"LocationInfo_location">;
    } | null;
};
export type LocationEditQuery = {
    readonly response: LocationEditQueryResponse;
    readonly variables: LocationEditQueryVariables;
};



/*
query LocationEditQuery(
  $id: GlobalId!
) {
  location(id: $id) {
    ...LocationInfo_location
    id
  }
}

fragment LocationInfo_location on Location {
  id
  latitude
  longitude
  instances {
    id
  }
  ...LocationInstancesList_data
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

fragment LocationInstanceListItem_instance on LocationInstance {
  name
  mainPhotoLink
  description
}

fragment LocationInstancesList_data on Location {
  instances {
    id
    name
    ...LocationInstanceListItem_instance
    ...LocationInstanceInfoDialog_locationInstance
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
            "name": "LocationInfo_location"
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
            "name": "latitude",
            "storageKey": null
          },
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
                "name": "mainPhotoLink",
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
                "name": "photoLinks",
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
    "cacheID": "fc91078788e2928cb095410dc7f748c4",
    "id": null,
    "metadata": {},
    "name": "LocationEditQuery",
    "operationKind": "query",
    "text": "query LocationEditQuery(\n  $id: GlobalId!\n) {\n  location(id: $id) {\n    ...LocationInfo_location\n    id\n  }\n}\n\nfragment LocationInfo_location on Location {\n  id\n  latitude\n  longitude\n  instances {\n    id\n  }\n  ...LocationInstancesList_data\n}\n\nfragment LocationInstanceInfoDialog_locationInstance on LocationInstance {\n  id\n  name\n  description\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n  mainPhotoLink\n  photoLinks\n}\n\nfragment LocationInstanceListItem_instance on LocationInstance {\n  name\n  mainPhotoLink\n  description\n}\n\nfragment LocationInstancesList_data on Location {\n  instances {\n    id\n    name\n    ...LocationInstanceListItem_instance\n    ...LocationInstanceInfoDialog_locationInstance\n  }\n}\n"
  }
};
})();
(node as any).hash = '2f361a58b532945bfa507d281ce4be07';
export default node;
