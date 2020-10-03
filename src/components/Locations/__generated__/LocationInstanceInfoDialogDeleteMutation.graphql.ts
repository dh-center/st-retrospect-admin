/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LocationInstanceInfoDialogDeleteMutationVariables = {
    id: string;
};
export type LocationInstanceInfoDialogDeleteMutationResponse = {
    readonly locationInstances: {
        readonly delete: {
            readonly recordId: string;
        };
    };
};
export type LocationInstanceInfoDialogDeleteMutation = {
    readonly response: LocationInstanceInfoDialogDeleteMutationResponse;
    readonly variables: LocationInstanceInfoDialogDeleteMutationVariables;
};



/*
mutation LocationInstanceInfoDialogDeleteMutation(
  $id: GlobalId!
) {
  locationInstances {
    delete(id: $id) {
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
    "name": "id"
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
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeleteLocationInstancePayload",
        "kind": "LinkedField",
        "name": "delete",
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
    "name": "LocationInstanceInfoDialogDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a5db04c5713849818b5b8993201ca2c0",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogDeleteMutation(\n  $id: GlobalId!\n) {\n  locationInstances {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7d38ae8712713a1a1252ec09792271fd';
export default node;
