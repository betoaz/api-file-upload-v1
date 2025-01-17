import { buildSubgraphSchema } from '@apollo/subgraph'
import typeDefs from './typeDefs/index.js'
import resolvers from './resolvers/index.js'

const subgraphSchema = buildSubgraphSchema({
  typeDefs,
  resolvers,
})

export default subgraphSchema
