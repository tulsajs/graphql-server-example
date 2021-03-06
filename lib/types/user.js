import gql from '../helpers/gql';

const type = gql`
  # user model
  type User {
    # id of the user
    id: ID!
    # first name of the user
    firstName: String
    # last name of the user
    lastName: String
    # email of the user
    email: String
    # associated posts of the user
    posts: [Post]
    # created at time
    createdAt: Date
  }

  type UserLength {
    # length of the users
    length: Int
  }
`;

const queries = gql`
  # fetch current user
  me: User
  # fetch all users
  users(firstName: String, lastName: String, email: String, first: Int, skip: Int): [User]
  # fetch user by id
  user(id: ID!): User
  # get length of users query
  usersLength(firstName: String, lastName: String, email: String, first: Int, skip: Int): UserLength
`;

const mutations = gql`
  # create a new user
  createUser(firstName: String!, lastName: String!, email: String!): User
  # update a user
  updateUser(id: ID!, firstName: String, lastName: String, email: String): User
  # delete a user
  deleteUser(id: ID!): User
`;

export default {
  type,
  queries,
  mutations
};
