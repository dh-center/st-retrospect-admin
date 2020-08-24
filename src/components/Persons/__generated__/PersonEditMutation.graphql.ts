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
    profession?: string | null;
    description?: string | null;
    birthDate?: string | null;
    deathDate?: string | null;
    wikiLink?: string | null;
};
export type PersonEditMutationVariables = {
    input: UpdatePersonInput;
};
export type PersonEditMutationResponse = {
    readonly person: {
        readonly update: {
            readonly recordId: string | null;
        };
    } | null;
};
export type PersonEditMutation = {
    readonly response: PersonEditMutationResponse;
    readonly variables: PersonEditMutationVariables;
};



/*
mutation PersonEditMutation(
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
    "name": "PersonEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "202bbd5b05c9f8fecd2af893695616dc",
    "id": null,
    "metadata": {},
    "name": "PersonEditMutation",
    "operationKind": "mutation",
    "text": "mutation PersonEditMutation(\n  $input: UpdatePersonInput!\n) {\n  person {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '93194a04a48653a429d71b0f283dba7c';
export default node;
