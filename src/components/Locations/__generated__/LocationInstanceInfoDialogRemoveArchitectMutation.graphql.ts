/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RemoveArchitectInput = {
    locationInstanceId: string;
    architectId: string;
};
export type LocationInstanceInfoDialogRemoveArchitectMutationVariables = {
    input: RemoveArchitectInput;
};
export type LocationInstanceInfoDialogRemoveArchitectMutationResponse = {
    readonly locationInstances: {
        readonly removeArchitect: {
            readonly recordId: string;
        };
    };
};
export type LocationInstanceInfoDialogRemoveArchitectMutation = {
    readonly response: LocationInstanceInfoDialogRemoveArchitectMutationResponse;
    readonly variables: LocationInstanceInfoDialogRemoveArchitectMutationVariables;
};



/*
mutation LocationInstanceInfoDialogRemoveArchitectMutation(
  $input: RemoveArchitectInput!
) {
  locationInstances {
    removeArchitect(input: $input) {
      recordId
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
        "concreteType": "RemoveArchitectPayload",
        "kind": "LinkedField",
        "name": "removeArchitect",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "recordId",
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
    "name": "LocationInstanceInfoDialogRemoveArchitectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogRemoveArchitectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d14a1d4d75b963e1f9cf74ab5eb297ca",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogRemoveArchitectMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogRemoveArchitectMutation(\n  $input: RemoveArchitectInput!\n) {\n  locationInstances {\n    removeArchitect(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7b7ede12e828e5a13bf68dbd877550a2';
export default node;
