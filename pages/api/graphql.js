import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

const JWKS_URL = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`;

const weights = [
  {
    value: 60000,
    timestamp: "1584428499491",
  },
  {
    value: 61000,
    timestamp: "1588428499491",
  },
];

const typeDefs = gql`
  type Weight {
    value: Int!
    timestamp: ID!
  }

  type Query {
    weights: [Weight!]!
  }

  type Mutation {
    addWeight(value: Int!): Weight!
  }
`;

const resolvers = {
  Query: {
    weights: () =>
      weights.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        return 0;
      }),
  },
  Mutation: {
    addWeight: (parent, { value }) => {
      const weight = { value, timestamp: new Date().getTime().toString() };
      weights.push(weight);
      return weight;
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const jwksPromise = axios.get(JWKS_URL).then(({ data: { keys } }) => keys);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) =>
    jwksPromise.then((keys) => {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      const decoded = jwt.decode(token, { complete: true });
      const key = keys.find(({ kid }) => kid === decoded.header.kid);
      const pem = jwkToPem(key);

      const decodedVerifiedToken = jwt.verify(token, pem, {
        algorithms: ["RS256"],
      });

      return { userId: decodedVerifiedToken.sub };
    }),
});

export default apolloServer.createHandler({ path: "/api/graphql" });
