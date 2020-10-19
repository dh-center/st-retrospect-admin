/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelationTypeViewDeleteMutationVariables = {
    id: string;
};
export type RelationTypeViewDeleteMutationResponse = {
    readonly relationType: {
        readonly delete: {
            readonly recordId: string;
        };
    };
};
export type RelationTypeViewDeleteMutation = {
    readonly response: RelationTypeViewDeleteMutationResponse;
    readonly variables: RelationTypeViewDeleteMutationVariables;
};



/*
mutation RelationTypeViewDeleteMutation(
  $id: GlobalId!
) {
  relationType {
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
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeleteRelationTypePayload",
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
    "name": "RelationTypeViewDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeViewDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "087e2ad7657ab40768ba2bce3fd4801c",
    "id": null,
    "metadata": {},
    "name": "RelationTypeViewDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation RelationTypeViewDeleteMutation(\n  $id: GlobalId!\n) {\n  relationType {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c3a3fdce33720a87f3dc9ff6a047f0b5';
export default node;
