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
            readonly recordId: string;
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
        "concreteType": "AddArchitectPayload",
        "kind": "LinkedField",
        "name": "addArchitect",
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
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "348ff7f685a3213cc7a53e5d8cde96fd",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogAddArchitectMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogAddArchitectMutation(\n  $input: AddArchitectInput!\n) {\n  locationInstances {\n    addArchitect(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd86d37095ce0e58c6c8f167aafb7829a';
export default node;
