/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonEditQueryVariables = {
    id: string;
};
export type PersonEditQueryResponse = {
    readonly person: {
        readonly " $fragmentRefs": FragmentRefs<"PersonInfo_person">;
    } | null;
};
export type PersonEditQuery = {
    readonly response: PersonEditQueryResponse;
    readonly variables: PersonEditQueryVariables;
};



/*
query PersonEditQuery(
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
    "name": "PersonEditQuery",
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
    "name": "PersonEditQuery",
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
    "cacheID": "9d77d5dd6ee35c041376b31975797d1d",
    "id": null,
    "metadata": {},
    "name": "PersonEditQuery",
    "operationKind": "query",
    "text": "query PersonEditQuery(\n  $id: ID!\n) {\n  person(id: $id) {\n    ...PersonInfo_person\n    id\n  }\n}\n\nfragment PersonInfo_person on Person {\n  id\n  lastName\n  firstName\n  patronymic\n  pseudonym\n  profession\n  description\n  birthDate\n  deathDate\n  wikiLink\n}\n"
  }
};
})();
(node as any).hash = '7c0a6e70e5e87fd5715cba95fc10ad7a';
export default node;
