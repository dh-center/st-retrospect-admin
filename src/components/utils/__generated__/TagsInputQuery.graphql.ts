/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type TagsInputQueryVariables = {};
export type TagsInputQueryResponse = {
    readonly tags: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly value: string;
            };
        }>;
    };
};
export type TagsInputQuery = {
    readonly response: TagsInputQueryResponse;
    readonly variables: TagsInputQueryVariables;
};



/*
query TagsInputQuery {
  tags {
    edges {
      node {
        id
        value
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TagConnection",
    "kind": "LinkedField",
    "name": "tags",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TagEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tag",
            "kind": "LinkedField",
            "name": "node",
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
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TagsInputQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TagsInputQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2691cd349287a34f92fd21eb2d34bbed",
    "id": null,
    "metadata": {},
    "name": "TagsInputQuery",
    "operationKind": "query",
    "text": "query TagsInputQuery {\n  tags {\n    edges {\n      node {\n        id\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8b385548c80a82283e79ce65b862f4d3';
export default node;
