/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateRelationTypeInput = {
    id: string;
    name?: string | null;
    synonyms?: Array<string | null> | null;
};
export type RelationTypeEditFormMutationVariables = {
    input: UpdateRelationTypeInput;
};
export type RelationTypeEditFormMutationResponse = {
    readonly relationType: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type RelationTypeEditFormMutation = {
    readonly response: RelationTypeEditFormMutationResponse;
    readonly variables: RelationTypeEditFormMutationVariables;
};



/*
mutation RelationTypeEditFormMutation(
  $input: UpdateRelationTypeInput!
) {
  relationType {
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
    "concreteType": "RelationTypeMutations",
    "kind": "LinkedField",
    "name": "relationType",
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
        "concreteType": "UpdateRelationTypePayload",
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
    "name": "RelationTypeEditFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeEditFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "01ea6ffb3de2cee5b14bf053e7a877cb",
    "id": null,
    "metadata": {},
    "name": "RelationTypeEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation RelationTypeEditFormMutation(\n  $input: UpdateRelationTypeInput!\n) {\n  relationType {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'cd11a8bc87a11002b10060270edcbb56';
export default node;
