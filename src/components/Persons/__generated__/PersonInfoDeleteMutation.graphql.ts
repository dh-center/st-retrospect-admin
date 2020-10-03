/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PersonInfoDeleteMutationVariables = {
    id: string;
};
export type PersonInfoDeleteMutationResponse = {
    readonly person: {
        readonly delete: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonInfoDeleteMutation = {
    readonly response: PersonInfoDeleteMutationResponse;
    readonly variables: PersonInfoDeleteMutationVariables;
};



/*
mutation PersonInfoDeleteMutation(
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
    "name": "PersonInfoDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonInfoDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "534e22fc916af30b08e9090fe52b26f8",
    "id": null,
    "metadata": {},
    "name": "PersonInfoDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation PersonInfoDeleteMutation(\n  $id: GlobalId!\n) {\n  person {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c60c1867069663e36a5dce78f0faa011';
export default node;
