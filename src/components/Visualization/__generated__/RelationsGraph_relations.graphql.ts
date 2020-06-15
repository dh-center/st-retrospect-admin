/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationsGraph_relations = {
    readonly relations: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly person: {
                    readonly id: string;
                    readonly lastName: string | null;
                    readonly firstName: string | null;
                    readonly patronymic: string | null;
                } | null;
                readonly locationInstance: {
                    readonly id: string;
                    readonly name: string | null;
                } | null;
            };
        }>;
    };
    readonly " $refType": "RelationsGraph_relations";
};
export type RelationsGraph_relations$data = RelationsGraph_relations;
export type RelationsGraph_relations$key = {
    readonly " $data"?: RelationsGraph_relations$data;
    readonly " $fragmentRefs": FragmentRefs<"RelationsGraph_relations">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelationsGraph_relations",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RelationConnection",
      "kind": "LinkedField",
      "name": "relations",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RelationEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Relation",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Person",
                  "kind": "LinkedField",
                  "name": "person",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
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
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "LocationInstance",
                  "kind": "LinkedField",
                  "name": "locationInstance",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
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
      ],
      "storageKey": null
    }
  ],
  "type": "Query"
};
})();
(node as any).hash = 'c4929e30114d66fdbcbc6a4e98ace6eb';
export default node;
