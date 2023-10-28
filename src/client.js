import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
  } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "https://dev-api.dutyfree-price.com/graphql",
  uri: "http://localhost:3000/graphql",
  // uri : "https://api.dutyfree-price.com/",
  cache: new InMemoryCache(),
});