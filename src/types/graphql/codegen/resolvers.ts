import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Image as CustomImage, Document as CustomDocument } from '../index.js';
import type { CustomContext } from '@/types/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  NonEmptyString: { input: string; output: string; }
  _FieldSet: { input: any; output: any; }
};

export enum Code {
  Error = 'Error',
  Info = 'Info',
  Success = 'Success',
  Warning = 'Warning'
}

export type DocUploadInput = {
  collated?: InputMaybe<Scalars['Boolean']['input']>;
  file: FileUploadInput;
  original?: InputMaybe<Scalars['Boolean']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocUploadPayload = Response & {
  __typename?: 'DocUploadPayload';
  code: Code;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  uploaded?: Maybe<Document>;
};

export type Document = {
  __typename?: 'Document';
  id: Scalars['ID']['output'];
};

export type FileUploadInput = {
  encode: Scalars['NonEmptyString']['input'];
  name: Scalars['NonEmptyString']['input'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID']['output'];
};

export type ImgUploadInput = {
  description?: InputMaybe<Scalars['NonEmptyString']['input']>;
  file: FileUploadInput;
};

export type ImgUploadPayload = Response & {
  __typename?: 'ImgUploadPayload';
  code: Code;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  uploaded?: Maybe<Image>;
};

export type Mutation = {
  __typename?: 'Mutation';
  uploadPersonPic: ImgUploadPayload;
};


export type MutationUploadPersonPicArgs = {
  id: Scalars['NonEmptyString']['input'];
  pic: ImgUploadInput;
};

export type Response = {
  code: Code;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum Role {
  Admin = 'Admin',
  Reviewer = 'Reviewer',
  Unknown = 'Unknown',
  User = 'User'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Response: ( Omit<DocUploadPayload, 'uploaded'> & { uploaded?: Maybe<_RefType['Document']> } ) | ( Omit<ImgUploadPayload, 'uploaded'> & { uploaded?: Maybe<_RefType['Image']> } );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Code: Code;
  DocUploadInput: DocUploadInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DocUploadPayload: ResolverTypeWrapper<Omit<DocUploadPayload, 'uploaded'> & { uploaded?: Maybe<ResolversTypes['Document']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Document: ResolverTypeWrapper<CustomDocument>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  FileUploadInput: FileUploadInput;
  Image: ResolverTypeWrapper<CustomImage>;
  ImgUploadInput: ImgUploadInput;
  ImgUploadPayload: ResolverTypeWrapper<Omit<ImgUploadPayload, 'uploaded'> & { uploaded?: Maybe<ResolversTypes['Image']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  Role: Role;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DocUploadInput: DocUploadInput;
  Boolean: Scalars['Boolean']['output'];
  DocUploadPayload: Omit<DocUploadPayload, 'uploaded'> & { uploaded?: Maybe<ResolversParentTypes['Document']> };
  String: Scalars['String']['output'];
  Document: CustomDocument;
  ID: Scalars['ID']['output'];
  FileUploadInput: FileUploadInput;
  Image: CustomImage;
  ImgUploadInput: ImgUploadInput;
  ImgUploadPayload: Omit<ImgUploadPayload, 'uploaded'> & { uploaded?: Maybe<ResolversParentTypes['Image']> };
  Mutation: {};
  NonEmptyString: Scalars['NonEmptyString']['output'];
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
}>;

export type AuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Role>>>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = CustomContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DocUploadPayloadResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['DocUploadPayload'] = ResolversParentTypes['DocUploadPayload']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Code'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploaded?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DocumentResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImgUploadPayloadResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['ImgUploadPayload'] = ResolversParentTypes['ImgUploadPayload']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Code'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  uploaded?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  uploadPersonPic?: Resolver<ResolversTypes['ImgUploadPayload'], ParentType, ContextType, RequireFields<MutationUploadPersonPicArgs, 'id' | 'pic'>>;
}>;

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export type ResponseResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DocUploadPayload' | 'ImgUploadPayload', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Code'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = CustomContext> = ResolversObject<{
  DocUploadPayload?: DocUploadPayloadResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImgUploadPayload?: ImgUploadPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  Response?: ResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = CustomContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
