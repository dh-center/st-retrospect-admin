/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationTypeEditQueryVariables = {
    id: string;
};
export type RelationTypeEditQueryResponse = {
    readonly relationType: {
        readonly " $fragmentRefs": FragmentRefs<"RelationTypeEditForm_originalRelationType">;
    } | null;
};
export type RelationTypeEditQuery = {
    readonly response: RelationTypeEditQueryResponse;
    readonly variables: RelationTypeEditQueryVariables;
};



/*
query RelationTypeEditQuery(
  $id: GlobalId!
) {
  relationType(id: $id) {
    ...RelationTypeEditForm_originalRelationType
    id
  }
}

fragment RelationTypeEditForm_originalRelationType on RelationType {
  id
  name
  synonyms
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
    "name": "RelationTypeEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RelationType",
        "kind": "LinkedField",
        "name": "relationType",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RelationTypeEditForm_originalRelationType"
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
    "name": "RelationTypeEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RelationType",
        "kind": "LinkedField",
        "name": "relationType",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "synonyms",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9c1ed2011c7937976611787c0109ec20",
    "id": null,
    "metadata": {},
    "name": "RelationTypeEditQuery",
    "operationKind": "query",
    "text": "query RelationTypeEditQuery(\n  $id: GlobalId!\n) {\n  relationType(id: $id) {\n    ...RelationTypeEditForm_originalRelationType\n    id\n  }\n}\n\nfragment RelationTypeEditForm_originalRelationType on RelationType {\n  id\n  name\n  synonyms\n}\n"
  }
};
})();
(node as any).hash = '0c006ff334aa5551c9c53125bc3ff969';
export default node;
