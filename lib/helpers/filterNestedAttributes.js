import { filter } from 'lodash';

export default (model, args) => {
  return filter(model, item =>
    Object.keys(args).some(key => {
      if (typeof item[key] === 'number') {
        return item[key] === args[key];
      } else {
        return item[key].includes(args[key]);
      }
    })
  );
};
