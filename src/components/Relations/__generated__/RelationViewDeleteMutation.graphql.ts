/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationViewDeleteMutationVariables = {
    id: string;
};
export type RelationViewDeleteMutationResponse = {
    readonly relation: {
        readonly delete: {
            readonly recordId: string | null;
        };
    };
};
export type RelationViewDeleteMutation = {
    readonly response: RelationViewDeleteMutationResponse;
    readonly variables: RelationViewDeleteMutationVariables;
};



/*
mutation RelationViewDeleteMutation(
  $id: ObjectId!
) {
  relation {
    delete(id: $id) {
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
    "name": "id"
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
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeleteRelationPayload",
        "kind": "LinkedField",
        "name": "delete",
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
    "name": "RelationViewDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationViewDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c32f9c829a9e65adf405f11b705101f3",
    "id": null,
    "metadata": {},
    "name": "RelationViewDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation RelationViewDeleteMutation(\n  $id: ObjectId!\n) {\n  relation {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '94122318a667317dfb290205de300383';
export default node;
