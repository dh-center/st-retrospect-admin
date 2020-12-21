/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationEditQueryVariables = {
    id: string;
};
export type RelationEditQueryResponse = {
    readonly relation: {
        readonly " $fragmentRefs": FragmentRefs<"RelationEditForm_originalRelation">;
    } | null;
};
export type RelationEditQuery = {
    readonly response: RelationEditQueryResponse;
    readonly variables: RelationEditQueryVariables;
};



/*
query RelationEditQuery(
  $id: GlobalId!
) {
  relation(id: $id) {
    ...RelationEditForm_originalRelation
    id
  }
}

fragment RelationEditForm_originalRelation on Relation {
  id
  person {
    id
  }
  relationType {
    id
  }
  locationInstance {
    id
  }
  startDate
  endDate
  quote
  link
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
v3 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RelationEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Relation",
        "kind": "LinkedField",
        "name": "relation",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RelationEditForm_originalRelation"
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
    "name": "RelationEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Relation",
        "kind": "LinkedField",
        "name": "relation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "person",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RelationType",
            "kind": "LinkedField",
            "name": "relationType",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationInstance",
            "kind": "LinkedField",
            "name": "locationInstance",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "quote",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "link",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "329e62149486fd02ff060aa687f4b23e",
    "id": null,
    "metadata": {},
    "name": "RelationEditQuery",
    "operationKind": "query",
    "text": "query RelationEditQuery(\n  $id: GlobalId!\n) {\n  relation(id: $id) {\n    ...RelationEditForm_originalRelation\n    id\n  }\n}\n\nfragment RelationEditForm_originalRelation on Relation {\n  id\n  person {\n    id\n  }\n  relationType {\n    id\n  }\n  locationInstance {\n    id\n  }\n  startDate\n  endDate\n  quote\n  link\n}\n"
  }
};
})();
(node as any).hash = 'efb4234b043c953451361a3f9e5176b9';
export default node;
