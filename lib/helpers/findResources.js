import filterNestedAttributes from '../helpers/filterNestedAttributes';
import { omit } from 'lodash';

export default (model, args, returnLength) => {
  let resource;
  const sanitizedArgs = omit(args, ['first', 'skip']);
  if (Object.keys(sanitizedArgs).length > 0) {
    resource = filterNestedAttributes(model, sanitizedArgs);
  } else {
    resource = model;
  }
  if (returnLength) {
    return { length: resource.length };
  }

  return resource.slice(args.skip, resource.length).slice(0, args.first);
};
