import { makeExecutableSchema } from 'graphql-tools';
import Data from './data';
import date from './types/date';
import User from './types/user';
import Post from './types/Post';
import UserResolver from './resolvers/user';
import PostResolver from './resolvers/post';
import gql from './helpers/gql';

const typeDefs = gql`
  scalar Date
  
  ${User.type}
  ${Post.type}
  
  # all queries
  type Query {
    ${User.queries}
    ${Post.queries}
  }

  # all mutations
  type Mutation {
    ${User.mutations}
    ${Post.mutations}
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    ...UserResolver.queries,
    ...PostResolver.queries
  },
  Mutation: {
    ...UserResolver.mutations,
    ...PostResolver.mutations
  },
  ...UserResolver.baseResolver,
  ...PostResolver.baseResolver,
  Date: date
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
