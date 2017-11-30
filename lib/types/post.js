import gql from '../helpers/gql';

const type = gql`
  # post model
  type Post {
    # id of the post
    id: ID!
    # title of the post
    title: String
    # user associated with the post
    user: User
    # number of votes the post has received
    votes: Int
    # created at time
    createdAt: Date
  }

  type PostLength {
    # length of the posts
    length: Int
  }
`;

const queries = gql`
  # fetch posts for current user
  myPosts: [Post]
  # fetch all posts
  posts(title: String, votes: Int, userId: ID, first: Int, skip: Int): [Post]
  # fetch post by id
  post(id: ID!): Post
  # get length of posts query
  postsLength(title: String, votes: Int, userId: ID, first: Int, skip: Int): PostLength
`;

const mutations = gql`
  # upvote a post
  upvotePost (id: ID!): Post
  # create a new post
  createPost(title: String!, userId: ID!): Post
  # update a post
  updatePost(id: ID!, title: String!): Post
  # delete a post
  deletePost (id: ID!): Post
`;

export default {
  type,
  queries,
  mutations
};
