import type { User } from './graphql/index.js'
import type { DeleteImageFn, GetPersonPicFn, AddPersonPicFn } from './client.js'

export type CustomContext = {
  user?: User
  token?: string
  deleteImage: DeleteImageFn
  getPersonPic: GetPersonPicFn
  addPersonPic: AddPersonPicFn
}
