/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelationsGraph_data = {
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
                    readonly locationTypes: ReadonlyArray<{
                        readonly id: string;
                    } | null> | null;
                } | null;
            };
        }>;
    };
    readonly locationTypes: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
    }>;
    readonly " $refType": "RelationsGraph_data";
};
export type RelationsGraph_data$data = RelationsGraph_data;
export type RelationsGraph_data$key = {
    readonly " $data"?: RelationsGraph_data$data;
    readonly " $fragmentRefs": FragmentRefs<"RelationsGraph_data">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RelationsGraph_data",
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
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "LocationType",
                      "kind": "LinkedField",
                      "name": "locationTypes",
                      "plural": true,
                      "selections": [
                        (v0/*: any*/)
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationTypes",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Query"
};
})();
(node as any).hash = 'ba99a5a209bbce4d18ea2727a53a6f68';
export default node;
