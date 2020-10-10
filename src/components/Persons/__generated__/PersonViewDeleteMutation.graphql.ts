/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PersonViewDeleteMutationVariables = {
    id: string;
};
export type PersonViewDeleteMutationResponse = {
    readonly person: {
        readonly delete: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonViewDeleteMutation = {
    readonly response: PersonViewDeleteMutationResponse;
    readonly variables: PersonViewDeleteMutationVariables;
};



/*
mutation PersonViewDeleteMutation(
  $id: GlobalId!
) {
  person {
    delete(id: $id) {
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
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PersonMutations",
    "kind": "LinkedField",
    "name": "person",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeletePersonPayload",
        "kind": "LinkedField",
        "name": "delete",
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
    "name": "PersonViewDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonViewDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "39488d35416802443d55697c3c8d4bac",
    "id": null,
    "metadata": {},
    "name": "PersonViewDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation PersonViewDeleteMutation(\n  $id: GlobalId!\n) {\n  person {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e310ecd3d2328444225c56af9ddb6035';
export default node;
