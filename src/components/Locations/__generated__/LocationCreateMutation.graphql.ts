/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateLocationInput = {
    latitude: number;
    longitude: number;
    instances: Array<LocationInstanceInput>;
};
export type LocationInstanceInput = {
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
export type LocationCreateMutationVariables = {
    input: CreateLocationInput;
};
export type LocationCreateMutationResponse = {
    readonly location: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type LocationCreateMutation = {
    readonly response: LocationCreateMutationResponse;
    readonly variables: LocationCreateMutationVariables;
};



/*
mutation LocationCreateMutation(
  $input: CreateLocationInput!
) {
  location {
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
    "concreteType": "LocationMutations",
    "kind": "LinkedField",
    "name": "location",
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
        "concreteType": "CreateLocationPayload",
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
    "name": "LocationCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4a87f62b77961e0090fe9f7255f959e7",
    "id": null,
    "metadata": {},
    "name": "LocationCreateMutation",
    "operationKind": "mutation",
    "text": "mutation LocationCreateMutation(\n  $input: CreateLocationInput!\n) {\n  location {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c3f5ca0cf2b09e35d0d4e95da162c12b';
export default node;
