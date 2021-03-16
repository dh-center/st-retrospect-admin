/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TagEditQueryVariables = {
    id: string;
};
export type TagEditQueryResponse = {
    readonly tag: {
        readonly " $fragmentRefs": FragmentRefs<"TagEditForm_originalTag">;
    } | null;
};
export type TagEditQuery = {
    readonly response: TagEditQueryResponse;
    readonly variables: TagEditQueryVariables;
};



/*
query TagEditQuery(
  $id: GlobalId!
) {
  tag(id: $id) {
    ...TagEditForm_originalTag
    id
  }
}

fragment TagEditForm_originalTag on Tag {
  id
  value
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
    "name": "TagEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TagEditForm_originalTag"
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
    "name": "TagEditQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
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
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "626d85540003d0866e13428ed80bc203",
    "id": null,
    "metadata": {},
    "name": "TagEditQuery",
    "operationKind": "query",
    "text": "query TagEditQuery(\n  $id: GlobalId!\n) {\n  tag(id: $id) {\n    ...TagEditForm_originalTag\n    id\n  }\n}\n\nfragment TagEditForm_originalTag on Tag {\n  id\n  value\n}\n"
  }
};
})();
(node as any).hash = '2a87830de4bf8499b2a287cd0e3fe78f';
export default node;
