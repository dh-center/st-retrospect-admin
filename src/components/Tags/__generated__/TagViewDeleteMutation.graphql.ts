/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TagViewDeleteMutationVariables = {
    id: string;
};
export type TagViewDeleteMutationResponse = {
    readonly tag: {
        readonly delete: {
            readonly recordId: string;
        };
    };
};
export type TagViewDeleteMutation = {
    readonly response: TagViewDeleteMutationResponse;
    readonly variables: TagViewDeleteMutationVariables;
};



/*
mutation TagViewDeleteMutation(
  $id: GlobalId!
) {
  tag {
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
    "concreteType": "TagMutations",
    "kind": "LinkedField",
    "name": "tag",
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
        "concreteType": "DeleteTagPayload",
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
    "name": "TagViewDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagViewDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d5a95e88fda89dd1845b6b3027e17a1c",
    "id": null,
    "metadata": {},
    "name": "TagViewDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TagViewDeleteMutation(\n  $id: GlobalId!\n) {\n  tag {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '53b322560b924fab876190b967eb33ea';
export default node;
