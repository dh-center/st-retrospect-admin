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
            readonly record: {
                readonly id: string;
                readonly value: string;
            };
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
      record {
        id
        value
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
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "record",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
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
    "cacheID": "9a0537fb9b3f8e1c43e5da6130f9d254",
    "id": null,
    "metadata": {},
    "name": "TagsInputMutation",
    "operationKind": "mutation",
    "text": "mutation TagsInputMutation(\n  $input: CreateTagInput!\n) {\n  tag {\n    create(input: $input) {\n      record {\n        id\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6531b67e1bf9074e5b3886e9ee5c41bb';
export default node;
