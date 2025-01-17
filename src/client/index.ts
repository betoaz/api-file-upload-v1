import type {
  DeleteImageFn,
  DeleteImageData,
  GetPersonPicFn,
  GetPersonPicData,
  AddPersonPicFn,
  AddPersonPicData,
} from '@/types/client.js'
import { gql, GraphQLClient, type ClientError, type Variables } from 'graphql-request'
import logger from '@/utils/logger.js'

const { GATEWAY_URL } = process.env
const ENDPOINT = `${GATEWAY_URL || 'http://localhost:8080'}/graphql`
const client = new GraphQLClient(ENDPOINT)

export const deleteImage: DeleteImageFn = async (id, token) => {
  const query = gql`
    mutation DeleteImage($filter: ImageFilter!) {
      deleteImage(filter: $filter) {
        numUids
        msg
      }
    }
  `
  const variables: Variables = { id }
  const headers = { auth: `Bearer ${token}` }

  try {
    const data = await client.request<DeleteImageData>(query, variables, headers)
    const result = data.deleteImage
    if (result) {
      const { numUids, msg } = result
      return numUids > 0 && msg === 'Deleted'
    }
  } catch (error) {
    const err = error as ClientError
    logger.error('checkUser: %s', err.message)
  }

  return null
}

export const getPersonPic: GetPersonPicFn = async (id, token) => {
  const query = gql`
    query GetPersonPic($id: ID!) {
      getPerson(id: $id) {
        pic {
          id
          name
          description
          mimetype
          uploadedAt
          encode
          # url
        }
      }
    }
  `
  const variables: Variables = { id }
  const headers = { auth: `Bearer ${token}` }

  try {
    const data = await client.request<GetPersonPicData>(query, variables, headers)
    const result = data.getPerson
    if (result) return result.pic
  } catch (error) {
    const err = error as ClientError
    logger.error('checkUser: %s', err.message)
  }

  return null
}

export const addPersonPic: AddPersonPicFn = async (
  id,
  { filename, description, mimetype, encode },
  token,
) => {
  const mutation = gql`
    mutation AddPersonPic($input: UpdatePersonInput!) {
      updatePerson(input: $input) {
        person {
          pic {
            id
            name
            description
            mimetype
            uploadedAt
            encode
            # url
          }
        }
      }
    }
  `
  const variables: Variables = {
    input: {
      filter: {
        id,
      },
      set: {
        pic: {
          name: filename,
          description: description ?? 'Foto de perfil',
          mimetype,
          uploadedAt: new Date().toISOString(),
          encode,
        },
      },
    },
  }
  const headers = { auth: `Bearer ${token}` }

  try {
    const data = await client.request<AddPersonPicData>(mutation, variables, headers)
    const result = data.updatePerson
    if (result) return result.person.pic
  } catch (error) {
    const err = error as ClientError
    logger.error('checkUser: %s', err.message)
  }

  return null
}
