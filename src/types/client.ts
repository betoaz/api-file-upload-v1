import { Scalars, type Maybe } from './graphql/codegen/resolvers.js'
import type { Image } from './graphql/index.js'
import type { ImgInfo } from '../utils/handleFile.js'

export type DeleteImageFn = (id: Scalars['ID']['input'], token: string) => Promise<Maybe<boolean>>

export type DeleteImageData = {
  deleteImage: Maybe<{ numUids: number, msg: string }>
}

export type GetPersonPicFn = (id: Scalars['ID']['input'], token: string) => Promise<Maybe<Image>>

export type GetPersonPicData = {
  getPerson: Maybe<{ pic: Maybe<Image> }>
}

export type AddPersonPicFn = (
  id: Scalars['ID']['input'],
  pic: ImgInfo,
  token: string,
) => Promise<Maybe<Image>>

export type AddPersonPicData = {
  updatePerson: Maybe<{ person: { pic: Maybe<Image> } }>
}
