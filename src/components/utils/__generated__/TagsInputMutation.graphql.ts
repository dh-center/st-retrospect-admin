/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateTagInput = {
    value: string;
};
export type TagsInputMutationVariables = {
    input: CreateTagInput;
};
export type TagsInputMutationResponse = {
    readonly tag: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type TagsInputMutation = {
    readonly response: TagsInputMutationResponse;
    readonly variables: TagsInputMutationVariables;
};



/*
mutation TagsInputMutation(
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
    "name": "TagsInputMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagsInputMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a5804082f1910c0e3b12d3df42d5cc37",
    "id": null,
    "metadata": {},
    "name": "TagsInputMutation",
    "operationKind": "mutation",
    "text": "mutation TagsInputMutation(\n  $input: CreateTagInput!\n) {\n  tag {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5d76fe3700fbb8bc3507a41d0483a2a6';
export default node;
