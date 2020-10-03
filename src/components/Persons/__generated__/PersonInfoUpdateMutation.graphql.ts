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
export type PersonInfoUpdateMutationVariables = {
    input: UpdatePersonInput;
};
export type PersonInfoUpdateMutationResponse = {
    readonly person: {
        readonly update: {
            readonly recordId: string;
        };
    } | null;
};
export type PersonInfoUpdateMutation = {
    readonly response: PersonInfoUpdateMutationResponse;
    readonly variables: PersonInfoUpdateMutationVariables;
};



/*
mutation PersonInfoUpdateMutation(
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
    "name": "PersonInfoUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonInfoUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fe686e80d3140429e55727e4473237d1",
    "id": null,
    "metadata": {},
    "name": "PersonInfoUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation PersonInfoUpdateMutation(\n  $input: UpdatePersonInput!\n) {\n  person {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cda7b814e1581b3cc62e1e705054cf9c';
export default node;
