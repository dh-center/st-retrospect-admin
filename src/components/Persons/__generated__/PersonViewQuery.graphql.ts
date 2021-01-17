/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PersonViewQueryVariables = {
    id: string;
};
export type PersonViewQueryResponse = {
    readonly person: {
        readonly id: string;
        readonly lastName: string | null;
        readonly firstName: string | null;
        readonly patronymic: string | null;
        readonly pseudonym: string | null;
        readonly mainPhotoLink: string | null;
        readonly professions: ReadonlyArray<string | null> | null;
        readonly description: string | null;
        readonly birthDate: string | null;
        readonly deathDate: string | null;
        readonly photoLinks: ReadonlyArray<string | null> | null;
        readonly wikiLink: string | null;
    } | null;
};
export type PersonViewQuery = {
    readonly response: PersonViewQueryResponse;
    readonly variables: PersonViewQueryVariables;
};



/*
query PersonViewQuery(
  $id: GlobalId!
) {
  person(id: $id) {
    id
    lastName
    firstName
    patronymic
    pseudonym
    mainPhotoLink
    professions
    description
    birthDate
    deathDate
    photoLinks
    wikiLink
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
        "name": "mainPhotoLink",
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
        "name": "photoLinks",
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
    "name": "PersonViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1a98956133ac9e75581875acfb3f40de",
    "id": null,
    "metadata": {},
    "name": "PersonViewQuery",
    "operationKind": "query",
    "text": "query PersonViewQuery(\n  $id: GlobalId!\n) {\n  person(id: $id) {\n    id\n    lastName\n    firstName\n    patronymic\n    pseudonym\n    mainPhotoLink\n    professions\n    description\n    birthDate\n    deathDate\n    photoLinks\n    wikiLink\n  }\n}\n"
  }
};
})();
(node as any).hash = '8cf1d1d7548d3bb4adc8b5bdc917fcf9';
export default node;
