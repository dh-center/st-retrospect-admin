/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreatePersonInput = {
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
export type PersonInfoCreateMutationVariables = {
    input: CreatePersonInput;
};
export type PersonInfoCreateMutationResponse = {
    readonly person: {
        readonly create: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonInfoCreateMutation = {
    readonly response: PersonInfoCreateMutationResponse;
    readonly variables: PersonInfoCreateMutationVariables;
};



/*
mutation PersonInfoCreateMutation(
  $input: CreatePersonInput!
) {
  person {
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
        "concreteType": "CreatePersonPayload",
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
    "name": "PersonInfoCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonInfoCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ce7278021042b62e2153aaae6c43004c",
    "id": null,
    "metadata": {},
    "name": "PersonInfoCreateMutation",
    "operationKind": "mutation",
    "text": "mutation PersonInfoCreateMutation(\n  $input: CreatePersonInput!\n) {\n  person {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c990ddfd5a269f6d4493d2f3ec3e1584';
export default node;
