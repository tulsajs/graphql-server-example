import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import dateFormat from 'dateFormat';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return dateFormat(value, 'isoDateTime'); // value from the client
  },
  serialize(value) {
    return dateFormat(value, 'isoDateTime'); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  }
});
