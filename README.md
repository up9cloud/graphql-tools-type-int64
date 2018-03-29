# graphql-tools-type-int64

[![Build Status](https://travis-ci.org/up9cloud/graphql-tools-type-int64.svg?branch=master)](https://travis-ci.org/up9cloud/graphql-tools-type-int64)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/graphql-tools-type-int64/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/graphql-tools-type-int64?branch=master)

Int64 scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)

> This is not actually 64-bit!
> Because javascript safe integers are between -(2^53 - 1) and 2^53 - 1,
> see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger.

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools'
// import Int64 from 'graphql-tools-type-int64'
import Int64 from 'graphqltoolstypeint64' // because of npm spam detection

let typeDefs = [`
scalar Int64
type Query {
  value(v: Int64): Int64
}`
]
let resolvers = {
  Int64,
  Query: {
    value: (root, { v }) => v
  }
}
let schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
```
