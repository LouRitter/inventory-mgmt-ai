import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Inventory: a
    .model({
      ItemID: a.string(),
    }).authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});