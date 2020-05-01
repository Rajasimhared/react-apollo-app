const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const request = require("request-promise");
const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`;
var options = {
  uri: "https://api.github.com/users",
  headers: {
    "User-Agent": "Request-Promise",
  },
  json: true, // Automatically parses the JSON string in the response
};

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await request(options);
        return users.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
//  typeDefs: typeDefs,
//  resolvers: resolvers
server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
