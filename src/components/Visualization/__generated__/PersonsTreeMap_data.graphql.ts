/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PersonsTreeMap_data = {
    readonly persons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly profession: string | null;
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
                  "name": "profession",
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
(node as any).hash = '09d9d73e4580d789820b2c188daf92b5';
export default node;
