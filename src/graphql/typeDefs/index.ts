import { gql } from 'graphql-tag'

const typeDefs = gql`
  # Apollo - Federated directives in a Federation 2 subgraph schema
  extend schema
	@link(
  	url: "https://specs.apollo.dev/federation/v2.0"
  	import: ["@key", "@shareable"]
	)

  directive @auth(roles: [Role]) on FIELD_DEFINITION

  scalar NonEmptyString

  enum Role {
    Admin
    User
    Reviewer
    Unknown
  }

  enum Code {
    Info
    Success
    Error
    Warning
  }

  interface Response {
    success: Boolean!
    code: Code!
    message: String
  }

  input FileUploadInput {
    name: NonEmptyString!
    encode: NonEmptyString!
    # path: NonEmptyString
  }

  type Image @key(fields: "id", resolvable: false) {
    id: ID!
  }

  input ImgUploadInput {
    file: FileUploadInput!
    description: NonEmptyString
  }

  type ImgUploadPayload implements Response {
    success: Boolean!
    code: Code!
    message: String
    uploaded: Image
  }

  type Document @key(fields: "id", resolvable: false) {
    id: ID!
  }

  input DocUploadInput {
    file: FileUploadInput!
    original: Boolean # Es Original
    collated: Boolean # Está Cotejado
    verified: Boolean # Fue Verificado
  }

  type DocUploadPayload implements Response {
    success: Boolean!
    code: Code!
    message: String
    uploaded: Document
  }

  type Mutation {
    uploadPersonPic(id: NonEmptyString!, pic: ImgUploadInput!): ImgUploadPayload! @auth
  }
`

export default typeDefs
