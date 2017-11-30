import Data from '../data';
import { find, findIndex, filter, remove } from 'lodash';
import findResources from '../helpers/findResources';
import dateFormat from 'dateFormat';

const queries = {
  myPosts(_, {}, { userId }) {
    return filter(Data.posts, { userId: parseInt(userId) });
  },
  posts(_, args) {
    return findResources(Data.posts, args);
  },
  post(_, { id }) {
    return find(Data.posts, { id: parseInt(id) });
  },
  postsLength(_, args) {
    return findResources(Data.posts, args, true);
  }
};

const mutations = {
  upvotePost(_, { id }) {
    const post = find(Data.posts, { id: parseInt(id) });
    if (!post) {
      throw new Error(`Couldn't find post with id ${id}`);
    }
    post.votes += 1;
    return post;
  },
  createPost(_, { userId, title }) {
    const post = {
      id: Data.posts.length + 1,
      title,
      userId: parseInt(userId),
      votes: 0,
      createdAt: dateFormat(Date.now(), 'isoDateTime')
    };
    Data.posts.push(post);
    return post;
  },
  updatePost(_, { id, ...args }) {
    let postIndex = findIndex(Data.posts, { id: parseInt(id) });
    let post = Data.posts[postIndex];

    if (!post) {
      throw new Error(`Post #${id} doesn't exist!`);
    }

    return (Data.posts[postIndex] = { ...post, ...args });
  },
  deletePost(_, { id }) {
    const post = remove(Data.posts, { id: parseInt(id) })[0];
    if (!post) {
      throw new Error(`Couldn't find post with id ${id}`);
    }
    return post;
  }
};

const baseResolver = {
  Post: {
    user(post) {
      return find(Data.users, { id: post.userId });
    }
  }
};

export default {
  queries,
  mutations,
  baseResolver
};
