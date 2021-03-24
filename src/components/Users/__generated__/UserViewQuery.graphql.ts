/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserViewQueryVariables = {
    id: string;
};
export type UserViewQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly username: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly photo: string | null;
        readonly permissions: ReadonlyArray<string>;
    } | null;
};
export type UserViewQuery = {
    readonly response: UserViewQueryResponse;
    readonly variables: UserViewQueryVariables;
};



/*
query UserViewQuery(
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
    "name": "UserViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2983529bb74d27a6c884f1554dd612f4",
    "id": null,
    "metadata": {},
    "name": "UserViewQuery",
    "operationKind": "query",
    "text": "query UserViewQuery(\n  $id: GlobalId!\n) {\n  user(id: $id) {\n    id\n    username\n    firstName\n    lastName\n    photo\n    permissions\n  }\n}\n"
  }
};
})();
(node as any).hash = '322f8696a339fa7681ce37f5422dfc36';
export default node;
