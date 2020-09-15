/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LocationInfoDeleteMutationVariables = {
    id: string;
};
export type LocationInfoDeleteMutationResponse = {
    readonly location: {
        readonly delete: {
            readonly recordId: string;
        };
    };
};
export type LocationInfoDeleteMutation = {
    readonly response: LocationInfoDeleteMutationResponse;
    readonly variables: LocationInfoDeleteMutationVariables;
};



/*
mutation LocationInfoDeleteMutation(
  $id: ObjectId!
) {
  location {
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
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "DeleteLocationPayload",
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
    "name": "LocationInfoDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInfoDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7b905c8fc00d473894326686c88b8190",
    "id": null,
    "metadata": {},
    "name": "LocationInfoDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation LocationInfoDeleteMutation(\n  $id: ObjectId!\n) {\n  location {\n    delete(id: $id) {\n      recordId\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '06cf9c35de29702c92c462ed42654728';
export default node;
