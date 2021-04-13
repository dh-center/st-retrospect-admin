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
        readonly professions: ReadonlyArray<string> | null;
        readonly description: string | null;
        readonly birthDate: string | null;
        readonly deathDate: string | null;
        readonly photoLinks: ReadonlyArray<string> | null;
        readonly wikiLink: string | null;
        readonly tags: ReadonlyArray<{
            readonly value: string;
        }>;
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
    tags {
      value
      id
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "patronymic",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pseudonym",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mainPhotoLink",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "professions",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "birthDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deathDate",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoLinks",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wikiLink",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": [
              (v14/*: any*/)
            ],
            "storageKey": null
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "tags",
            "plural": true,
            "selections": [
              (v14/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "467ad5d61890da63f80538e451316d75",
    "id": null,
    "metadata": {},
    "name": "PersonViewQuery",
    "operationKind": "query",
    "text": "query PersonViewQuery(\n  $id: GlobalId!\n) {\n  person(id: $id) {\n    id\n    lastName\n    firstName\n    patronymic\n    pseudonym\n    mainPhotoLink\n    professions\n    description\n    birthDate\n    deathDate\n    photoLinks\n    wikiLink\n    tags {\n      value\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1cb7b7fdb42748a552be66c277679cfa';
export default node;
