import { expect } from 'chai'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import Int64 from '../src'

const whiteList = [
  Number.MIN_SAFE_INTEGER,
  0,
  1.0,
  Number.MAX_SAFE_INTEGER
]
const blackList = [
  0.1,
  '' + Number.MIN_SAFE_INTEGER + '0',
  '' + Number.MAX_SAFE_INTEGER + '0',
  'foo',
  [],
  {}
]

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

describe('Int64', () => {
  describe('serialize', () => {
    it('valid value should pass', () => {
      for (let v of whiteList) {
        expect(Int64.serialize(v)).to.be.equal(v)
      }
    })
    it('invalid value should return null', () => {
      for (let v of blackList) {
        expect(Int64.serialize(v)).to.be.equal(null)
      }
    })
  })

  describe('parseValue', () => {
    it('valid value should pass', async () => {
      for (let v of whiteList) {
        let { data } = await graphql(
          schema,
          `query ($v: Int64) {
            value(v: $v)
          }`,
          null,
          null,
          { v }
        )
        expect(data.value).to.be.equal(v)
      }
    })
    it('invalid value should return errors', async () => {
      for (let v of blackList) {
        let data = await graphql(
          schema,
          `query ($v: Int64) {
            value(v: $v)
          }`,
          null,
          null,
          { v }
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })

  describe('parseLiteral', () => {
    it('valid value should pass', async () => {
      for (let v of whiteList) {
        let { data } = await graphql(
          schema,
          `query { value(v: ${isNaN(v) ? JSON.stringify(v) : v}) }`
        )
        expect(data.value).to.be.equal(v)
      }
    })
    it('invalid value should return errors', async () => {
      for (let v of blackList) {
        let data = await graphql(
          schema,
          `query { value(v: ${isNaN(v) ? JSON.stringify(v) : v}) }`
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })
})
