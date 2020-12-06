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
    link?: string | null;
};
export type RelationEditFormUpdateMutationVariables = {
    input: UpdateRelationInput;
};
export type RelationEditFormUpdateMutationResponse = {
    readonly relation: {
        readonly update: {
            readonly recordId: string;
        };
    };
};
export type RelationEditFormUpdateMutation = {
    readonly response: RelationEditFormUpdateMutationResponse;
    readonly variables: RelationEditFormUpdateMutationVariables;
};



/*
mutation RelationEditFormUpdateMutation(
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
    "name": "RelationEditFormUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationEditFormUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "26d8aaf883c7ad110c19e1b26650f94f",
    "id": null,
    "metadata": {},
    "name": "RelationEditFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation RelationEditFormUpdateMutation(\n  $input: UpdateRelationInput!\n) {\n  relation {\n    update(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2960c3bb960c425e973c8bd400c972bf';
export default node;
