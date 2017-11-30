import Data from '../data';
import { find, filter, remove, findIndex } from 'lodash';
import findResources from '../helpers/findResources';
import dateFormat from 'dateFormat';

const queries = {
  me(_, {}, { userId }) {
    return find(Data.users, { id: parseInt(userId) });
  },
  users(_, args) {
    return findResources(Data.users, args);
  },
  user(_, { id }) {
    return find(Data.users, { id: parseInt(id) });
  },
  usersLength(_, args) {
    return findResources(Data.users, args, true);
  }
};

const mutations = {
  createUser(_, { firstName, lastName, email }) {
    const user = {
      id: Data.users.length + 1,
      firstName,
      lastName,
      email,
      createdAt: dateFormat(Date.now(), 'isoDateTime')
    };
    if (find(Data.users, { email })) {
      throw new Error(`Email already exists!`);
    }
    Data.users.push(user);
    return user;
  },
  updateUser(_, { id, ...args }) {
    let userIndex = findIndex(Data.users, { id: parseInt(id) });
    let user = Data.users[userIndex];

    if (!user) {
      throw new Error(`User #${id} doesn't exist!`);
    }

    return (Data.users[userIndex] = { ...user, ...args });
  },
  deleteUser(_, { id }) {
    const user = remove(Data.users, { id: parseInt(id) })[0];
    if (!user) {
      throw new Error(`Couldn't find user with id ${id}`);
    }
    remove(Data.posts, { userId: parseInt(id) })[0];

    return user;
  }
};

const baseResolver = {
  User: {
    posts(user) {
      return filter(Data.posts, { userId: user.id });
    }
  }
};

export default {
  queries,
  mutations,
  baseResolver
};
