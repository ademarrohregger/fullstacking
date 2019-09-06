import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import pubSub, { EVENTS } from "../../../pubSub";

import UserModel from "../../user/UserModel";
import EventModel from "../EventModel";

export default mutationWithClientMutationId({
  name: "EventCreate",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    id: {
      type: GraphQLID,
      resolve: payload => payload.id
    }
  },
  mutateAndGetPayload: async ({ title, date, description }) => {
    // const user = new UserModel();
    // const author = user.find({ active: true });
    // console.log(author);
    const newEvent = new EventModel({
      title,
      date,
      description,
      author
    });
    const returnedObject = await newEvent.save();
    const eventId = returnedObject._id;
    console.log(`New Event created with id: ${eventId}`); //this will be in a subscription
    await pubSub.publish(EVENTS.EVENT.ADDED, { EventAdded: { newEvent } });

    return {
      id: eventId
    };
  }
});
