import type { Code } from '@/types/graphql/codegen/resolvers.js'

export type Append = Record<string, unknown>

export const makeRes = (
  success: boolean,
  code: Code,
  message?: string,
  append?: Append,
) => {
  const res = { code, success, message }
  return append ? { ...res, ...append } : res
}
