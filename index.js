const {
  introspectSchema,
  makeRemoteExecutableSchema,
  ApolloServer
} = require("apollo-server");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL;
const HASURA_GRAPHQL_API_URL = HASURA_GRAPHQL_URL + "/v1alpha1/graphql";

// Server Function
async function run() {
  // 1. Create Apollo Link that's connected to the underlying GraphQL API
  const hasuraLink = () =>
    createHttpLink({
      uri: HASURA_GRAPHQL_API_URL,
      fetch,
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
      }
    });
  // 2. Retrieve schema definition of the underlying GraphQL API
  const schema = await introspectSchema(hasuraLink());
  // 3. Create the executable schema based on schema definition and Apollo Link
  const hasuraSchema = makeRemoteExecutableSchema({
    schema,
    link: hasuraLink()
  });
  // 4. Create and start proxy server based on the executable schema
  const server = new ApolloServer({
    schema: hasuraSchema,
    introspection: true,
    playground: true
  });

  server.listen(PORT, () => {
    console.log(`🚀 Server ready ${PORT}`);
  });
}

try {
  console.log("get ready");
  run();
} catch (e) {
  console.log(e);
}
