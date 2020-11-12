/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonsTreeMap_data = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly professions: ReadonlyArray<string | null>;
                readonly birthDate: string | null;
            };
        }>;
    };
    readonly " $refType": "PersonsTreeMap_data";
};
export type PersonsTreeMap_data$data = PersonsTreeMap_data;
export type PersonsTreeMap_data$key = {
    readonly " $data"?: PersonsTreeMap_data$data;
    readonly " $fragmentRefs": FragmentRefs<"PersonsTreeMap_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PersonsTreeMap_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PersonConnection",
      "kind": "LinkedField",
      "name": "persons",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PersonEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Person",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "name": "birthDate",
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
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '844b5ceac8fec2496b7ae69a59f14a01';
export default node;
