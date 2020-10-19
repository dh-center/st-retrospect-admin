/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateRelationTypeInput = {
    name: string;
    synonyms: Array<string>;
};
export type RelationTypeCreateMutationVariables = {
    input: CreateRelationTypeInput;
};
export type RelationTypeCreateMutationResponse = {
    readonly relationType: {
        readonly create: {
            readonly recordId: string;
        };
    };
};
export type RelationTypeCreateMutation = {
    readonly response: RelationTypeCreateMutationResponse;
    readonly variables: RelationTypeCreateMutationVariables;
};



/*
mutation RelationTypeCreateMutation(
  $input: CreateRelationTypeInput!
) {
  relationType {
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
        "concreteType": "CreateRelationTypePayload",
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
    "name": "RelationTypeCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RelationTypeCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1896d15e5a356f5ae864a10dd88956d1",
    "id": null,
    "metadata": {},
    "name": "RelationTypeCreateMutation",
    "operationKind": "mutation",
    "text": "mutation RelationTypeCreateMutation(\n  $input: CreateRelationTypeInput!\n) {\n  relationType {\n    create(input: $input) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '99bc61a872b4e2dfabe3abf067afcdf9';
export default node;
