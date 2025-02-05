import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import subgraphSchema from './graphql/index.js'
import handleContext from './middlewares/context.js'
import type { CustomContext } from './types/context.js'
import logger from './utils/logger.js'

const start = async (
  mode: string,
  port?: string | number,
): Promise<void> => {
  const isDevMode = (mode: string): boolean => mode === 'development'

  const server = new ApolloServer<CustomContext>({
    schema: subgraphSchema,
    introspection: isDevMode(mode),
  })
  const options = {
    listen: { port: Number(port) },
    context: handleContext,
  }
  const { url } = await startStandaloneServer(server, options)
  logger.info(`Service ready at ${url} in ${mode} mode`)
}

const { NODE_ENV, PORT } = process.env

start(
  NODE_ENV || 'development',
  PORT ?? 4003,
)
