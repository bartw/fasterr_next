import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const JWKS_URL = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`;

const TABLE_WEIGHT = "fasterr_weight";

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
    weights: (_parent, _args, { userId, dbClient }) =>
      dbClient
        .send(
          new QueryCommand({
            TableName: TABLE_WEIGHT,
            KeyConditionExpression: "user_id = :userId",
            ExpressionAttributeValues: {
              ":userId": { S: userId },
            },
          })
        )
        .then(({ Items: items }) =>
          items
            .map(
              ({
                user_id: { S: userId },
                timestamp: { S: timestamp },
                value: { N: value },
              }) => ({ userId, timestamp, value: parseInt(value, 10) })
            )
            .sort((a, b) => {
              if (a.timestamp > b.timestamp) {
                return -1;
              }
              if (a.timestamp < b.timestamp) {
                return 1;
              }
              return 0;
            })
        ),
  },
  Mutation: {
    addWeight: (_parent, { value }, { userId, dbClient }) => {
      const newWeight = { value, timestamp: new Date().getTime().toString() };

      const params = {
        TableName: TABLE_WEIGHT,
        Item: {
          user_id: { S: userId },
          timestamp: { S: newWeight.timestamp },
          value: { N: newWeight.value.toString() },
        },
      };

      return dbClient.send(new PutItemCommand(params)).then(() => newWeight);
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

      const dbClient = new DynamoDBClient({ region: process.env.REGION });

      return { userId: decodedVerifiedToken.sub, dbClient };
    }),
});

export default apolloServer.createHandler({ path: "/api/graphql" });
