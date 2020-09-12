/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonViewQueryVariables = {
    id: string;
};
export type PersonViewQueryResponse = {
    readonly person: {
        readonly " $fragmentRefs": FragmentRefs<"PersonInfo_person">;
    } | null;
};
export type PersonViewQuery = {
    readonly response: PersonViewQueryResponse;
    readonly variables: PersonViewQueryVariables;
};



/*
query PersonViewQuery(
  $id: ID!
) {
  person(id: $id) {
    ...PersonInfo_person
    id
  }
}

fragment PersonInfo_person on Person {
  id
  lastName
  firstName
  patronymic
  pseudonym
  profession
  description
  birthDate
  deathDate
  wikiLink
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "person",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PersonInfo_person"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
            "name": "profession",
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
            "name": "birthDate",
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
            "name": "wikiLink",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "09ad23eb7300005226a08bd32d34f75b",
    "id": null,
    "metadata": {},
    "name": "PersonViewQuery",
    "operationKind": "query",
    "text": "query PersonViewQuery(\n  $id: ID!\n) {\n  person(id: $id) {\n    ...PersonInfo_person\n    id\n  }\n}\n\nfragment PersonInfo_person on Person {\n  id\n  lastName\n  firstName\n  patronymic\n  pseudonym\n  profession\n  description\n  birthDate\n  deathDate\n  wikiLink\n}\n"
  }
};
})();
(node as any).hash = '409e6ada4c3aaaeb373277f34d48f8c2';
export default node;
