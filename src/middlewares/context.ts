import type { IncomingMessage, ServerResponse } from 'http'
import type { CustomContext } from '@/types/context.js'
import type { User } from '@/types/graphql/index.js'
import {
  getPersonPic,
  deleteImage,
  addPersonPic,
} from '../client/index.js'

export type Context = {
  req: IncomingMessage
  res: ServerResponse
}

const handleContext = async (
  context: Context,
): Promise<CustomContext> => {
  const customCtx: CustomContext = {
    deleteImage,
    getPersonPic,
    addPersonPic,
  }
  const { req: { headers } } = context
  const { user: userInfo, auth: token } = headers

  if (userInfo && typeof userInfo === 'string') {
    const userJSON = JSON.parse(userInfo)
    customCtx.user = userJSON as User
  }
  if (token && typeof token === 'string') {
    customCtx.token = token
  }

  return customCtx
}

export default handleContext
