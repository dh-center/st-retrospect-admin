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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationInstance",
                    "kind": "LinkedField",
                    "name": "instances",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/)
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceInfoDialogCreateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogCreateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7770a79a343754bb2c8da37737caa6dd",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogCreateMutation(\n  $input: CreateLocationInstanceInput!\n) {\n  locationInstances {\n    create(input: $input) {\n      record {\n        id\n        location {\n          instances {\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dce1fc9938d2982f3e53322f4f46a467';
export default node;
