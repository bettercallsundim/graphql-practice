import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

const port = process.env.PORT || 1111;
const app = express();
app.use(express.json());


const typeDefs = `#graphql
 type Query {
   hello: String
 }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use("/graphql", expressMiddleware(server));
app.get("/hello", (req, res) => {
  res.json({ hello: "hello" });
});
app.listen({ port }, () => {
  console.log(`GraphQL Server running at http://localhost:${port}`);
});
