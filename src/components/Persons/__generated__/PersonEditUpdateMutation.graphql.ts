/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdatePersonInput = {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    patronymic?: string | null;
    pseudonym?: string | null;
    professions?: Array<string | null> | null;
    description?: string | null;
    birthDate?: string | null;
    deathDate?: string | null;
    wikiLink?: string | null;
};
export type PersonEditUpdateMutationVariables = {
    input: UpdatePersonInput;
};
export type PersonEditUpdateMutationResponse = {
    readonly person: {
        readonly update: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonEditUpdateMutation = {
    readonly response: PersonEditUpdateMutationResponse;
    readonly variables: PersonEditUpdateMutationVariables;
};



/*
mutation PersonEditUpdateMutation(
  $input: UpdatePersonInput!
) {
  person {
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
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "UpdatePersonPayload",
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
    "name": "PersonEditUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonEditUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "446c5f73b1dff5b9ebbe2d1d18bc1c72",
    "id": null,
    "metadata": {},
    "name": "PersonEditUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation PersonEditUpdateMutation(\n  $input: UpdatePersonInput!\n) {\n  person {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc499b1b7578825d8bbb85dbd1f11085';
export default node;
