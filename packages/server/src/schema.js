import { GraphQLSchema } from "graphql";

import QueryType from "./type/QueryType";
import MutationType from "./type/MutationType";
// Subscription is not working
// import SubscriptionType from "./type/SubscriptionType";

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
  // subscription: SubscriptionType
});
