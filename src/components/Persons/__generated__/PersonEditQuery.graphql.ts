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
        readonly " $fragmentRefs": FragmentRefs<"PersonEditForm_originalPerson">;
    } | null;
};
export type PersonEditQuery = {
    readonly response: PersonEditQueryResponse;
    readonly variables: PersonEditQueryVariables;
};



/*
query PersonEditQuery(
  $id: GlobalId!
) {
  person(id: $id) {
    ...PersonEditForm_originalPerson
    id
  }
}

fragment PersonEditForm_originalPerson on Person {
  id
  lastName
  firstName
  patronymic
  pseudonym
  professions
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
            "name": "PersonEditForm_originalPerson"
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
            "name": "professions",
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
    "cacheID": "90ddcbfdd1864949def261430eadc823",
    "id": null,
    "metadata": {},
    "name": "PersonEditQuery",
    "operationKind": "query",
    "text": "query PersonEditQuery(\n  $id: GlobalId!\n) {\n  person(id: $id) {\n    ...PersonEditForm_originalPerson\n    id\n  }\n}\n\nfragment PersonEditForm_originalPerson on Person {\n  id\n  lastName\n  firstName\n  patronymic\n  pseudonym\n  professions\n  description\n  birthDate\n  deathDate\n  wikiLink\n}\n"
  }
};
})();
(node as any).hash = '4c53c017b323f52372de1644f2477722';
export default node;
