/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserEditQueryVariables = {
    id: string;
};
export type UserEditQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly username: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly photo: string | null;
        readonly permissions: ReadonlyArray<string>;
    } | null;
};
export type UserEditQuery = {
    readonly response: UserEditQueryResponse;
    readonly variables: UserEditQueryVariables;
};



/*
query UserEditQuery(
  $id: GlobalId!
) {
  user(id: $id) {
    id
    username
    firstName
    lastName
    photo
    permissions
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
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
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
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photo",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "242a1abbc2892923b731a76c9b85881e",
    "id": null,
    "metadata": {},
    "name": "UserEditQuery",
    "operationKind": "query",
    "text": "query UserEditQuery(\n  $id: GlobalId!\n) {\n  user(id: $id) {\n    id\n    username\n    firstName\n    lastName\n    photo\n    permissions\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b8a16f4a8f9116406917c3768e3c75c7';
export default node;
