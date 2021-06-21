/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateUserPermissionsInput = {
    id: string;
    permissions: Array<string>;
};
export type UserEditPermissionsMutationVariables = {
    input: UpdateUserPermissionsInput;
};
export type UserEditPermissionsMutationResponse = {
    readonly user: {
        readonly setPermissions: {
            readonly record: {
                readonly id: string;
                readonly permissions: ReadonlyArray<string>;
            };
        };
    };
};
export type UserEditPermissionsMutation = {
    readonly response: UserEditPermissionsMutationResponse;
    readonly variables: UserEditPermissionsMutationVariables;
};



/*
mutation UserEditPermissionsMutation(
  $input: UpdateUserPermissionsInput!
) {
  user {
    setPermissions(input: $input) {
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
        "name": "setPermissions",
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
    "name": "UserEditPermissionsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserEditPermissionsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7024d0ce34890076604ed2a71335b2ec",
    "id": null,
    "metadata": {},
    "name": "UserEditPermissionsMutation",
    "operationKind": "mutation",
    "text": "mutation UserEditPermissionsMutation(\n  $input: UpdateUserPermissionsInput!\n) {\n  user {\n    setPermissions(input: $input) {\n      record {\n        id\n        permissions\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c22cecaf2feafaee685fb2d09f379002';
export default node;
