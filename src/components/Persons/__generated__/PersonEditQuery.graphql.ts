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
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"PersonInfo_person">;
    } | null;
    readonly temp: {
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
    id
    ...PersonInfo_person
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "PersonInfo_person"
},
v4 = [
  (v2/*: any*/),
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
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "temp",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ]
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
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "temp",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "b703bdb7d84e82ec60d508cb4b8a41aa",
    "id": null,
    "metadata": {},
    "name": "PersonEditQuery",
    "operationKind": "query",
    "text": "query PersonEditQuery(\n  $id: ID!\n) {\n  person(id: $id) {\n    id\n    ...PersonInfo_person\n  }\n}\n\nfragment PersonInfo_person on Person {\n  id\n  lastName\n  firstName\n  patronymic\n  pseudonym\n  profession\n  description\n  birthDate\n  deathDate\n  wikiLink\n}\n"
  }
};
})();
(node as any).hash = '2cb015c075e75fc66b0a598ee0c81a00';
export default node;
