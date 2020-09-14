/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateLocationInstanceInput = {
    name: string;
    description: string;
    wikiLink?: string | null;
    photoLinks?: Array<string> | null;
    mainPhotoLink?: string | null;
    constructionDate?: string | null;
    demolitionDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
};
export type LocationInstanceInfoDialogCreateMutationVariables = {
    input: CreateLocationInstanceInput;
};
export type LocationInstanceInfoDialogCreateMutationResponse = {
    readonly locationInstances: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type LocationInstanceInfoDialogCreateMutation = {
    readonly response: LocationInstanceInfoDialogCreateMutationResponse;
    readonly variables: LocationInstanceInfoDialogCreateMutationVariables;
};



/*
mutation LocationInstanceInfoDialogCreateMutation(
  $input: CreateLocationInstanceInput!
) {
  locationInstances {
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
    "concreteType": "LocationInstanceMutations",
    "kind": "LinkedField",
    "name": "locationInstances",
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
        "concreteType": "CreateLocationInstancePayload",
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
    "name": "LocationInstanceInfoDialogCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4cee8e5d2c088bdc0a011531db8ef615",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogCreateMutation(\n  $input: CreateLocationInstanceInput!\n) {\n  locationInstances {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b62bff48242c6b97bc6765c6ad45e7db';
export default node;
