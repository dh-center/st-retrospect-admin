/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateRelationInput = {
    id: string;
    personId?: string | null;
    locationInstanceId?: string | null;
    relationId?: string | null;
    quote?: string | null;
};
export type RelationEditMutationVariables = {
    input: UpdateRelationInput;
};
export type RelationEditMutationResponse = {
    readonly relation: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type RelationEditMutation = {
    readonly response: RelationEditMutationResponse;
    readonly variables: RelationEditMutationVariables;
};



/*
mutation RelationEditMutation(
  $input: UpdateRelationInput!
) {
  relation {
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
    "concreteType": "RelationMutations",
    "kind": "LinkedField",
    "name": "relation",
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
        "concreteType": "UpdateRelationPayload",
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
    "name": "RelationEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6be7c7331fe2c8aebf5b7d1c37055d56",
    "id": null,
    "metadata": {},
    "name": "RelationEditMutation",
    "operationKind": "mutation",
    "text": "mutation RelationEditMutation(\n  $input: UpdateRelationInput!\n) {\n  relation {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3c5ef8882cac6abc8d74b86aeb578209';
export default node;
