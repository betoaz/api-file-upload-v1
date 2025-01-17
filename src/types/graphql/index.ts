import { Scalars, type Maybe } from './codegen/resolvers.js'

export type AuthScalars = Scalars & {
  DateTime: {
    input: string
    output: string
  }
}

export const Role = {
  Admin: 'Admin',
  Reviewer: 'Reviewer',
  Unknown: 'Unknown',
  User: 'User',
} as const
export type Role = typeof Role[keyof typeof Role]

export const Permission = {
  Create: 'Create',
  Delete: 'Delete',
  Print: 'Print',
  Update: 'Update',
} as const
export type Permission = typeof Permission[keyof typeof Permission]

export type ModuleAggregateResult = {
  __typename?: 'ModuleAggregateResult'
  count?: Maybe<AuthScalars['Int']['output']>
  descriptionMax?: Maybe<string>
  descriptionMin?: Maybe<string>
  nameMax?: Maybe<string>
  nameMin?: Maybe<string>
  routeMax?: Maybe<string>
  routeMin?: Maybe<string>
}

export type Area = {
  __typename?: 'Area'
  id: AuthScalars['ID']['output']
  modules?: Maybe<Array<Module>>
  modulesAggregate?: Maybe<ModuleAggregateResult>
  name: string
}

export type Module = {
  __typename?: 'Module'
  area: Area
  description?: Maybe<string>
  id: AuthScalars['ID']['output']
  name: string
  route: string
}

export type AllowedModule = {
  __typename?: 'AllowedModule'
  id: AuthScalars['ID']['output']
  module: Module
  permissions: Array<Permission>
}

export type AllowedModuleAggregateResult = {
  __typename?: 'AllowedModuleAggregateResult'
  count?: Maybe<AuthScalars['Int']['output']>
}

export type User = {
  __typename?: 'User'
  active: boolean
  allowed?: Maybe<Array<AllowedModule>>
  allowedAggregate?: Maybe<AllowedModuleAggregateResult>
  createdAt: AuthScalars['DateTime']['output']
  email: string
  id: AuthScalars['ID']['output']
  nickname: string
  phone: string
  role: Role
  verified: boolean
}

export type File = {
  __typename?: 'File'
  id: AuthScalars['ID']['output']
  encode: string
  // url: string
  name: string
  mimetype: string
  uploadedAt: string
}

export type Image = Omit<File, '__typename'> & {
  __typename?: 'Image'
  description?: string
}

export type Document = Omit<File, '__typename'> & {
  __typename?: 'Document'
  original: boolean // Es Original
  collated: boolean // Está Cotejado
  verified: boolean // Fue Verificado
}
