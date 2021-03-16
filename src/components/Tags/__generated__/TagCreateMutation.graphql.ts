/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateTagInput = {
    value: string;
};
export type TagCreateMutationVariables = {
    input: CreateTagInput;
};
export type TagCreateMutationResponse = {
    readonly tag: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type TagCreateMutation = {
    readonly response: TagCreateMutationResponse;
    readonly variables: TagCreateMutationVariables;
};



/*
mutation TagCreateMutation(
  $input: CreateTagInput!
) {
  tag {
    create(input: $input) {
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
        "concreteType": "CreateTagPayload",
        "kind": "LinkedField",
        "name": "create",
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
    "name": "TagCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "96e4eed67d93c3f9e27def7bdbb679a4",
    "id": null,
    "metadata": {},
    "name": "TagCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TagCreateMutation(\n  $input: CreateTagInput!\n) {\n  tag {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f37ec54c5a885db5f325be5284b8a417';
export default node;
