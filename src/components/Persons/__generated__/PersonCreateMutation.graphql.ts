/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreatePersonInput = {
    lastName?: string | null;
    firstName?: string | null;
    patronymic?: string | null;
    pseudonym?: string | null;
    mainPhotoLink?: string | null;
    cardPhotoLink?: string | null;
    professions?: Array<string> | null;
    description?: string | null;
    birthDate?: string | null;
    deathDate?: string | null;
    photoLinks?: Array<string> | null;
    wikiLink?: string | null;
    tagIds: Array<string>;
};
export type PersonCreateMutationVariables = {
    input: CreatePersonInput;
};
export type PersonCreateMutationResponse = {
    readonly person: {
        readonly create: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonCreateMutation = {
    readonly response: PersonCreateMutationResponse;
    readonly variables: PersonCreateMutationVariables;
};



/*
mutation PersonCreateMutation(
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
    "name": "PersonCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f81bb9de788119b2b2441998a2d756cb",
    "id": null,
    "metadata": {},
    "name": "PersonCreateMutation",
    "operationKind": "mutation",
    "text": "mutation PersonCreateMutation(\n  $input: CreatePersonInput!\n) {\n  person {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3254e28612db9ff77ff6cd8c1f05f7b5';
export default node;
