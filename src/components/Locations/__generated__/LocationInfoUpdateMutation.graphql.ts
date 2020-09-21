/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateLocationInput = {
    id: string;
    latitude?: number | null;
    longitude?: number | null;
    instances: Array<string>;
};
export type LocationInfoUpdateMutationVariables = {
    input: UpdateLocationInput;
};
export type LocationInfoUpdateMutationResponse = {
    readonly location: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type LocationInfoUpdateMutation = {
    readonly response: LocationInfoUpdateMutationResponse;
    readonly variables: LocationInfoUpdateMutationVariables;
};



/*
mutation LocationInfoUpdateMutation(
  $input: UpdateLocationInput!
) {
  location {
    update(input: $input) {
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
    "concreteType": "LocationMutations",
    "kind": "LinkedField",
    "name": "location",
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
        "concreteType": "UpdateLocationPayload",
        "kind": "LinkedField",
        "name": "update",
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
    "name": "LocationInfoUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInfoUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88eef14ed52cb78ffd2de673f745e333",
    "id": null,
    "metadata": {},
    "name": "LocationInfoUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInfoUpdateMutation(\n  $input: UpdateLocationInput!\n) {\n  location {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dcd851bc9725ff79501fabb24d175380';
export default node;
