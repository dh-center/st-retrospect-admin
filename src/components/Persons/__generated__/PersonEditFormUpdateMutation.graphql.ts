/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdatePersonInput = {
    id: string;
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
export type PersonEditFormUpdateMutationVariables = {
    input: UpdatePersonInput;
};
export type PersonEditFormUpdateMutationResponse = {
    readonly person: {
        readonly update: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonEditFormUpdateMutation = {
    readonly response: PersonEditFormUpdateMutationResponse;
    readonly variables: PersonEditFormUpdateMutationVariables;
};



/*
mutation PersonEditFormUpdateMutation(
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
    "name": "PersonEditFormUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonEditFormUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0efb1f2908cc8a2a91076536442d52f6",
    "id": null,
    "metadata": {},
    "name": "PersonEditFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation PersonEditFormUpdateMutation(\n  $input: UpdatePersonInput!\n) {\n  person {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '920608c6b494cf5f415d353ea31f3424';
export default node;
