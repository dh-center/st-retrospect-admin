/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateRelationTypeInput = {
    id: string;
    name?: string | null;
    synonyms?: Array<string | null> | null;
};
export type RelationTypeEditMutationVariables = {
    input: UpdateRelationTypeInput;
};
export type RelationTypeEditMutationResponse = {
    readonly relationType: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type RelationTypeEditMutation = {
    readonly response: RelationTypeEditMutationResponse;
    readonly variables: RelationTypeEditMutationVariables;
};



/*
mutation RelationTypeEditMutation(
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
    "name": "RelationTypeEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d3739d5f796f38cee545cf4aa16b8d83",
    "id": null,
    "metadata": {},
    "name": "RelationTypeEditMutation",
    "operationKind": "mutation",
    "text": "mutation RelationTypeEditMutation(\n  $input: UpdateRelationTypeInput!\n) {\n  relationType {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8030f89d70048fe17a99f40d0ceb2f84';
export default node;
