/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AchievementsCustomSelect_achievementsQueryVariables = {};
export type AchievementsCustomSelect_achievementsQueryResponse = {
    readonly achievements: ReadonlyArray<{
        readonly value: string;
        readonly name: string;
    }>;
};
export type AchievementsCustomSelect_achievementsQuery = {
    readonly response: AchievementsCustomSelect_achievementsQueryResponse;
    readonly variables: AchievementsCustomSelect_achievementsQueryVariables;
};



/*
query AchievementsCustomSelect_achievementsQuery {
  achievements {
    value: id
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": "value",
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
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AchievementsCustomSelect_achievementsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Achievement",
        "kind": "LinkedField",
        "name": "achievements",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AchievementsCustomSelect_achievementsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Achievement",
        "kind": "LinkedField",
        "name": "achievements",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d32dc8191110f008b9796013eb95464d",
    "id": null,
    "metadata": {},
    "name": "AchievementsCustomSelect_achievementsQuery",
    "operationKind": "query",
    "text": "query AchievementsCustomSelect_achievementsQuery {\n  achievements {\n    value: id\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3b591b732f464c4490d23166965dda7c';
export default node;
