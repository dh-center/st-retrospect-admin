/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Navigation_user = {
    readonly me: {
        readonly username: string;
    };
    readonly " $refType": "Navigation_user";
};
export type Navigation_user$data = Navigation_user;
export type Navigation_user$key = {
    readonly " $data"?: Navigation_user$data;
    readonly " $fragmentRefs": FragmentRefs<"Navigation_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Navigation_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'cfcfe9f471596b7bcc4ccaafe601d405';
export default node;
