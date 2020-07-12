/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PersonsPagePersonQueryVariables = {
    id: string;
};
export type PersonsPagePersonQueryResponse = {
    readonly entity: {
        readonly id: string;
        readonly lastName: string | null;
        readonly firstName: string | null;
        readonly patronymic: string | null;
        readonly pseudonym: string | null;
        readonly birthDate: string | null;
        readonly description: string | null;
        readonly deathDate: string | null;
        readonly profession: string | null;
        readonly wikiLink: string | null;
    } | null;
};
export type PersonsPagePersonQuery = {
    readonly response: PersonsPagePersonQueryResponse;
    readonly variables: PersonsPagePersonQueryVariables;
};



/*
query PersonsPagePersonQuery(
  $id: ID!
) {
  entity: person(id: $id) {
    id
    lastName
    firstName
    patronymic
    pseudonym
    birthDate
    description
    deathDate
    profession
    wikiLink
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
  }
],
v1 = [
  {
    "alias": "entity",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Person",
    "kind": "LinkedField",
    "name": "person",
    "plural": false,
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
        "name": "lastName",
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
        "name": "patronymic",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "pseudonym",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "birthDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deathDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "profession",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "wikiLink",
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
    "name": "PersonsPagePersonQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonsPagePersonQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PersonsPagePersonQuery",
    "operationKind": "query",
    "text": "query PersonsPagePersonQuery(\n  $id: ID!\n) {\n  entity: person(id: $id) {\n    id\n    lastName\n    firstName\n    patronymic\n    pseudonym\n    birthDate\n    description\n    deathDate\n    profession\n    wikiLink\n  }\n}\n"
  }
};
})();
(node as any).hash = '88c32886f93b8dce84ed1e8d136db042';
export default node;
