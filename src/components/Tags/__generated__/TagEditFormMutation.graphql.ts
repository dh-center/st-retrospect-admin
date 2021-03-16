/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateTagInput = {
    id: string;
    value: string;
};
export type TagEditFormMutationVariables = {
    input: UpdateTagInput;
};
export type TagEditFormMutationResponse = {
    readonly tag: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type TagEditFormMutation = {
    readonly response: TagEditFormMutationResponse;
    readonly variables: TagEditFormMutationVariables;
};



/*
mutation TagEditFormMutation(
  $input: UpdateTagInput!
) {
  tag {
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
    "concreteType": "TagMutations",
    "kind": "LinkedField",
    "name": "tag",
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
        "concreteType": "UpdateTagPayload",
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
    "name": "TagEditFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagEditFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "08faf757dbcdf5e84adb5a1f2ef833d2",
    "id": null,
    "metadata": {},
    "name": "TagEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation TagEditFormMutation(\n  $input: UpdateTagInput!\n) {\n  tag {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e5ac7a461ff91e9cf8eb3258bc6acab4';
export default node;
