/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddArchitectInput = {
    locationInstanceId: string;
    architectId: string;
};
export type LocationInstanceInfoDialogAddArchitectMutationVariables = {
    input: AddArchitectInput;
};
export type LocationInstanceInfoDialogAddArchitectMutationResponse = {
    readonly locationInstances: {
        readonly addArchitect: {
            readonly record: {
                readonly locationInstance: {
                    readonly id: string;
                    readonly architects: ReadonlyArray<{
                        readonly id: string;
                    }>;
                };
            };
        };
    };
};
export type LocationInstanceInfoDialogAddArchitectMutation = {
    readonly response: LocationInstanceInfoDialogAddArchitectMutationResponse;
    readonly variables: LocationInstanceInfoDialogAddArchitectMutationVariables;
};



/*
mutation LocationInstanceInfoDialogAddArchitectMutation(
  $input: AddArchitectInput!
) {
  locationInstances {
    addArchitect(input: $input) {
      record {
        locationInstance {
          id
          architects {
            id
          }
        }
        id
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
  "name": "locationInstance",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Person",
      "kind": "LinkedField",
      "name": "architects",
      "plural": true,
      "selections": [
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
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
            "concreteType": "AddArchitectPayload",
            "kind": "LinkedField",
            "name": "addArchitect",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Relation",
                "kind": "LinkedField",
                "name": "record",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
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
            "concreteType": "AddArchitectPayload",
            "kind": "LinkedField",
            "name": "addArchitect",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Relation",
                "kind": "LinkedField",
                "name": "record",
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
    ]
  },
  "params": {
    "cacheID": "6f04cc6869a025eae91d415571be4ed3",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogAddArchitectMutation(\n  $input: AddArchitectInput!\n) {\n  locationInstances {\n    addArchitect(input: $input) {\n      record {\n        locationInstance {\n          id\n          architects {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'be3a3689b64b36e1b103551eb1f701fe';
export default node;
