/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PersonsQueryVariables = {};
export type PersonsQueryResponse = {
    readonly persons: ReadonlyArray<{
        readonly id: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly patronymic: string | null;
    }>;
};
export type PersonsQuery = {
    readonly response: PersonsQueryResponse;
    readonly variables: PersonsQueryVariables;
};



/*
query PersonsQuery {
  persons {
    id
    firstName
    lastName
    patronymic
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Person",
    "kind": "LinkedField",
    "name": "persons",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "patronymic",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonsQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PersonsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PersonsQuery",
    "operationKind": "query",
    "text": "query PersonsQuery {\n  persons {\n    id\n    firstName\n    lastName\n    patronymic\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd9fadd38526b0f9624de5a27bf2163ca';
export default node;
