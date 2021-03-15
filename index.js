const {
  introspectSchema,
  makeRemoteExecutableSchema,
  ApolloServer
} = require("apollo-server");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");

const HASURA_GRAPHQL_URL = "https://envoy-dev.herokuapp.com";
const HASURA_GRAPHQL_API_URL = HASURA_GRAPHQL_URL + "/v1alpha1/graphql";

const runHandler = (event, context, handler) =>
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));

    handler(event, context, callback);
  });

// Server Function
async function run() {
  // 1. Create Apollo Link that's connected to the underlying GraphQL API
  const hasuraLink = () =>
    createHttpLink({
      uri: HASURA_GRAPHQL_API_URL,
      fetch,
      headers: {
        "x-hasura-admin-secret": `stealthy`
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

  // const handler = server.createHandler({
  //   cors: {
  //     origin: "*",
  //     credentials: true,
  //     allowedHeaders: ["ContentType", "content-type", "Origin", "Accept"]
  //   }
  // });
  // const response = await runHandler(event, context, handler);

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

try {
  console.log("get ready");
  run();
} catch (e) {
  console.log(e);
}
