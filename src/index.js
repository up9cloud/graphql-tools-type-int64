import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'

export default new GraphQLScalarType({
  name: 'Int64',
  description: `Int64 scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools).
This is not actually 64-bit!
Because javascript safe integers are between -(2^53 - 1) and 2^53 - 1,
see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger.`,
  serialize (value) {
    if (Number.isSafeInteger(value)) {
      return value
    }
    return null
  },
  parseValue (value) {
    if (Number.isSafeInteger(value)) {
      return value
    }
    throw new GraphQLError('', [])
  },
  parseLiteral (ast) {
    const num = Number(ast.value)
    if (Number.isSafeInteger(num)) {
      return num
    }
    throw new GraphQLError(`Invalid Int64 literal.\n${ast.value} is not Int64.`, [ast])
  }
})
