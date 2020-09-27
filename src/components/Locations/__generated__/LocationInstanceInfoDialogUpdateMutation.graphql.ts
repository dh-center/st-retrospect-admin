/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateLocationInstanceInput = {
    id: string;
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
export type LocationInstanceInfoDialogUpdateMutationVariables = {
    input: UpdateLocationInstanceInput;
};
export type LocationInstanceInfoDialogUpdateMutationResponse = {
    readonly locationInstances: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type LocationInstanceInfoDialogUpdateMutation = {
    readonly response: LocationInstanceInfoDialogUpdateMutationResponse;
    readonly variables: LocationInstanceInfoDialogUpdateMutationVariables;
};



/*
mutation LocationInstanceInfoDialogUpdateMutation(
  $input: UpdateLocationInstanceInput!
) {
  locationInstances {
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
        "concreteType": "UpdateLocationInstancePayload",
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
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9c25480cd7aa1034fc1da2d073040960",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceInfoDialogUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInstanceInfoDialogUpdateMutation(\n  $input: UpdateLocationInstanceInput!\n) {\n  locationInstances {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '54bab4a6343204cd51c8338ffa45bcce';
export default node;
