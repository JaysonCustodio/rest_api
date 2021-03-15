import { ApolloServer } from "apollo-server";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import r_initializer from "./config/rethink/initializer";
import s_initializer from "./config/elastic/initializer";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4001 }).then(async ({ url }) => {
  await r_initializer();
  await s_initializer();
  console.log(`The server is running on ${url}`);
});
