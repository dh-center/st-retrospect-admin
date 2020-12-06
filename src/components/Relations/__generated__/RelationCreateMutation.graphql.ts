/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateRelationInput = {
    personId: string;
    locationInstanceId: string;
    relationId: string;
    quote: string;
    link: string;
};
export type RelationCreateMutationVariables = {
    input: CreateRelationInput;
};
export type RelationCreateMutationResponse = {
    readonly relation: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type RelationCreateMutation = {
    readonly response: RelationCreateMutationResponse;
    readonly variables: RelationCreateMutationVariables;
};



/*
mutation RelationCreateMutation(
  $input: CreateRelationInput!
) {
  relation {
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
        "concreteType": "CreateRelationPayload",
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
    "name": "RelationCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "74878854d3595a51ca88cd412ed2b567",
    "id": null,
    "metadata": {},
    "name": "RelationCreateMutation",
    "operationKind": "mutation",
    "text": "mutation RelationCreateMutation(\n  $input: CreateRelationInput!\n) {\n  relation {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dc905a4864b50daddb950a9be896d282';
export default node;
