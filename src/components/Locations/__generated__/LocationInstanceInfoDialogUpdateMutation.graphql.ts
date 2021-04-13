/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateLocationInstanceInput = {
    id: string;
    name: string;
    description: string;
    locationStyleId?: string | null;
    wikiLink?: string | null;
    photoLinks?: Array<string> | null;
    mainPhotoLink?: string | null;
    constructionDate?: string | null;
    demolitionDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    source: string;
    tagIds: Array<string>;
};
export type LocationInstanceInfoDialogUpdateMutationVariables = {
    input: UpdateLocationInstanceInput;
};
export type LocationInstanceInfoDialogUpdateMutationResponse = {
    readonly locationInstances: {
        readonly update: {
            readonly recordId: string;
            readonly record: {
                readonly id: string;
                readonly location: {
                    readonly " $fragmentRefs": FragmentRefs<"LocationInfo_location">;
                };
            };
        };
    };
};
export type LocationInstanceInfoDialogUpdateMutation = {
    readonly response: LocationInstanceInfoDialogUpdateMutationResponse;
    readonly variables: LocationInstanceInfoDialogUpdateMutationVariables;
};



/*
mutation LocationInstanceInfoDialogUpdateMutation(
  $input: UpdateLocationInstanceInput!
) {
  locationInstances {
    update(input: $input) {
      recordId
      record {
        id
        location {
          ...LocationInfo_location
          id
        }
      }
    }
  }
}

fragment LocationInfo_location on Location {
  id
  latitude
  longitude
  addresses {
    address
  }
  instances {
    id
  }
  ...LocationInstancesList_data
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
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "recordId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstanceMutations",
        "kind": "LinkedField",
        "name": "locationInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UpdateLocationInstancePayload",
            "kind": "LinkedField",
            "name": "update",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationInstance",
                "kind": "LinkedField",
                "name": "record",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
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
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationInstanceMutations",
        "kind": "LinkedField",
        "name": "locationInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UpdateLocationInstancePayload",
            "kind": "LinkedField",
            "name": "update",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationInstance",
                "kind": "LinkedField",
                "name": "record",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "location",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                          (v3/*: any*/),
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
                            "selections": (v4/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Location",
                            "kind": "LinkedField",
                            "name": "location",
                            "plural": false,
                            "selections": (v4/*: any*/),
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
    "cacheID": "e71788051d59e0c58ad6d9ec8fce4954",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogUpdateMutation(\n  $input: UpdateLocationInstanceInput!\n) {\n  locationInstances {\n    update(input: $input) {\n      recordId\n      record {\n        id\n        location {\n          ...LocationInfo_location\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment LocationInfo_location on Location {\n  id\n  latitude\n  longitude\n  addresses {\n    address\n  }\n  instances {\n    id\n  }\n  ...LocationInstancesList_data\n}\n\nfragment LocationInstanceInfoDialog_locationInstance on LocationInstance {\n  id\n  name\n  description\n  source\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n  mainPhotoLink\n  photoLinks\n  architects {\n    id\n  }\n  location {\n    id\n  }\n}\n\nfragment LocationInstanceListItem_instance on LocationInstance {\n  name\n  mainPhotoLink\n  description\n}\n\nfragment LocationInstancesList_data on Location {\n  instances {\n    id\n    name\n    ...LocationInstanceListItem_instance\n    ...LocationInstanceInfoDialog_locationInstance\n  }\n}\n"
  }
};
})();
(node as any).hash = '50763c1c777dee33d110a0fb0d1cff8a';
export default node;
