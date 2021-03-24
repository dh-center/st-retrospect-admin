/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateUserInput = {
    id: string;
    permissions: Array<string>;
};
export type UserEditMutationVariables = {
    input: UpdateUserInput;
};
export type UserEditMutationResponse = {
    readonly user: {
        readonly update: {
            readonly record: {
                readonly id: string;
                readonly permissions: ReadonlyArray<string>;
            };
        };
    };
};
export type UserEditMutation = {
    readonly response: UserEditMutationResponse;
    readonly variables: UserEditMutationVariables;
};



/*
mutation UserEditMutation(
  $input: UpdateUserInput!
) {
  user {
    update(input: $input) {
      record {
        id
        permissions
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
    "concreteType": "UserMutations",
    "kind": "LinkedField",
    "name": "user",
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
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "update",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
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
                "name": "permissions",
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
    "name": "UserEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "310265fe61b4a713ad0afd99459f30e5",
    "id": null,
    "metadata": {},
    "name": "UserEditMutation",
    "operationKind": "mutation",
    "text": "mutation UserEditMutation(\n  $input: UpdateUserInput!\n) {\n  user {\n    update(input: $input) {\n      record {\n        id\n        permissions\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd62b6b4f395fe978221ea765532124a7';
export default node;
