import faker from 'faker';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const users = new Array(300).fill(0).map((user, index) => {
  return {
    id: index,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    createdAt: faker.date.recent()
  };
});

const posts = new Array(300).fill(0).map((post, index) => {
  return {
    id: index,
    title: faker.lorem.paragraph(),
    userId: getRandomInt(1, 299),
    votes: getRandomInt(1, 200),
    createdAt: faker.date.recent()
  };
});

class Data {
  users = users;
  posts = posts;
}

export default new Data();