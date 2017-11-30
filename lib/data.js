import faker from 'faker';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const users = new Array(300).fill(0).map((user, index) => {
  return {
    id: index + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    createdAt: faker.date.recent()
  };
});

const posts = new Array(300).fill(0).map((post, index) => {
  return {
    id: index + 1,
    title: faker.lorem.sentence(),
    userId: getRandomInt(1, 300),
    votes: getRandomInt(1, 200),
    createdAt: faker.date.recent()
  };
});

class Data {
  users = users;
  posts = posts;
}

export default new Data();
