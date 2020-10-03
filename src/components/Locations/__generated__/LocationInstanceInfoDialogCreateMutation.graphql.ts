/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
                    readonly instances: ReadonlyArray<{
                        readonly id: string;
                    }>;
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
          instances {
            id
          }
          id
        }
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
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationInstance",
  "kind": "LinkedField",
  "name": "instances",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
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
                      (v3/*: any*/)
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
                      (v3/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3cc3dc1bfd223c5d90aebb9cd22667d4",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogCreateMutation(\n  $input: CreateLocationInstanceInput!\n) {\n  locationInstances {\n    create(input: $input) {\n      record {\n        id\n        location {\n          instances {\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dce1fc9938d2982f3e53322f4f46a467';
export default node;
