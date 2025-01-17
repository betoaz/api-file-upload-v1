import { type GraphQLSchema, defaultFieldResolver, GraphQLError } from 'graphql'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import type { CustomContext } from '@/types/context.js'
import type { Role } from '@/types/graphql/index.js'

export const authDirectiveTransformer = (
  schema: GraphQLSchema,
  directiveName: string,
): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (!authDirective) return

      const { resolve = defaultFieldResolver } = fieldConfig
      fieldConfig.resolve = async (source, args, context, info) => {
        const { user } = context as CustomContext
        if (!user)
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          })

        const roles = authDirective.roles as [Role]
        const isAuthorized = !roles || roles.includes(user.role)
        if (!isAuthorized)
          throw new GraphQLError('User is not authorized', {
            extensions: {
              code: 'FORBIDDEN',
            },
          })

        const result = await resolve(source, args, context, info)
        return result
      }
      return fieldConfig
    },
  })
}

export const addDirectives = (schema: GraphQLSchema): GraphQLSchema => {
  schema = authDirectiveTransformer(schema, 'auth')
  return schema
}
