/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateLocationInput = {
    id: string;
    latitude?: number | null;
    longitude?: number | null;
    addresses?: Array<UpdateAddressInput> | null;
};
export type UpdateAddressInput = {
    countryCode?: string | null;
    regionCode?: string | null;
    place?: string | null;
    locality?: string | null;
    address?: string | null;
    address2?: string | null;
    postcode?: string | null;
};
export type LocationEditFormMutationVariables = {
    input: UpdateLocationInput;
};
export type LocationEditFormMutationResponse = {
    readonly location: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type LocationEditFormMutation = {
    readonly response: LocationEditFormMutationResponse;
    readonly variables: LocationEditFormMutationVariables;
};



/*
mutation LocationEditFormMutation(
  $input: UpdateLocationInput!
) {
  location {
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
        "concreteType": "UpdateLocationPayload",
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
    "name": "LocationEditFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationEditFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7ee9b83aa9b56416ebca896fe1bdb841",
    "id": null,
    "metadata": {},
    "name": "LocationEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation LocationEditFormMutation(\n  $input: UpdateLocationInput!\n) {\n  location {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f43f32dd576de0d79b27fb9e935b1cf';
export default node;
