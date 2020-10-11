/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateLocationInstanceInput = {
    name: string;
    description: string;
    wikiLink?: string | null;
    photoLinks?: Array<string> | null;
    mainPhotoLink?: string | null;
    constructionDate?: string | null;
    demolitionDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    locationId: string;
};
export type LocationInstanceInfoDialogCreateMutationVariables = {
    input: CreateLocationInstanceInput;
};
export type LocationInstanceInfoDialogCreateMutationResponse = {
    readonly locationInstances: {
        readonly create: {
            readonly record: {
                readonly id: string;
                readonly location: {
                    readonly " $fragmentRefs": FragmentRefs<"LocationInfo_location">;
                };
            };
        };
    };
};
export type LocationInstanceInfoDialogCreateMutation = {
    readonly response: LocationInstanceInfoDialogCreateMutationResponse;
    readonly variables: LocationInstanceInfoDialogCreateMutationVariables;
};



/*
mutation LocationInstanceInfoDialogCreateMutation(
  $input: CreateLocationInstanceInput!
) {
  locationInstances {
    create(input: $input) {
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceInfoDialogCreateMutation",
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
            "concreteType": "CreateLocationInstancePayload",
            "kind": "LinkedField",
            "name": "create",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationInstance",
                "kind": "LinkedField",
                "name": "record",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
    "name": "LocationInstanceInfoDialogCreateMutation",
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
            "concreteType": "CreateLocationInstancePayload",
            "kind": "LinkedField",
            "name": "create",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationInstance",
                "kind": "LinkedField",
                "name": "record",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
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
    "cacheID": "0c337f5ea3c4facc4f6871be29ac9229",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogCreateMutation(\n  $input: CreateLocationInstanceInput!\n) {\n  locationInstances {\n    create(input: $input) {\n      record {\n        id\n        location {\n          ...LocationInfo_location\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment LocationInfo_location on Location {\n  id\n  latitude\n  longitude\n  instances {\n    id\n  }\n  ...LocationInstancesList_data\n}\n\nfragment LocationInstanceInfoDialog_locationInstance on LocationInstance {\n  id\n  name\n  description\n  constructionDate\n  demolitionDate\n  startDate\n  endDate\n  mainPhotoLink\n  photoLinks\n}\n\nfragment LocationInstanceListItem_instance on LocationInstance {\n  name\n  mainPhotoLink\n  description\n}\n\nfragment LocationInstancesList_data on Location {\n  instances {\n    id\n    name\n    ...LocationInstanceListItem_instance\n    ...LocationInstanceInfoDialog_locationInstance\n  }\n}\n"
  }
};
})();
(node as any).hash = '6776c68d8a519076fcd8daf136515df3';
export default node;
