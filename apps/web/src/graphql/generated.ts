import { useMutation, useQuery, useSuspenseQuery, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

            type FetchOptions = {
              cache?: RequestCache;
              next?: NextFetchRequestConfig;
            };
            
            type RequestInit = {
              headers: (HeadersInit & FetchOptions) | FetchOptions;
            };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  comment: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
};


export type MutationCreateCommentArgs = {
  authorId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  user?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  posts: Array<Post>;
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  authorId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, comment: string, post: { __typename?: 'Post', id: string, title: string }, author?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } };

export type CreatePostMutationVariables = Exact<{
  authorId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null, comments: Array<{ __typename?: 'Comment', id: string, comment: string, author?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null }> } | null };

export type GetPostsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string, content: string, author?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null, comments: Array<{ __typename?: 'Comment', id: string, comment: string }> }> | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, posts: Array<{ __typename?: 'Post', id: string, title: string }>, comments: Array<{ __typename?: 'Comment', id: string, comment: string, post: { __typename?: 'Post', id: string, title: string } }> } | null };



export const CreateCommentDocument = `
    mutation CreateComment($postId: ID!, $authorId: ID!, $comment: String!) {
  createComment(postId: $postId, authorId: $authorId, comment: $comment) {
    id
    comment
    post {
      id
      title
    }
    author {
      id
      firstName
      lastName
    }
  }
}
    `;

export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
    ...options
  }
    )};


useCreateCommentMutation.fetcher = (variables: CreateCommentMutationVariables, options?: RequestInit['headers']) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options);

export const CreatePostDocument = `
    mutation CreatePost($authorId: ID!, $title: String!, $content: String!) {
  createPost(authorId: $authorId, title: $title, content: $content) {
    id
    title
    content
    author {
      id
      firstName
      lastName
    }
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
    ...options
  }
    )};


useCreatePostMutation.fetcher = (variables: CreatePostMutationVariables, options?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables, options);

export const GetPostDocument = `
    query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
    author {
      id
      firstName
      lastName
    }
    comments {
      id
      comment
      author {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      variables: GetPostQueryVariables,
      options?: Omit<UseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostQuery, TError, TData>(
      {
    queryKey: ['GetPost', variables],
    queryFn: fetcher<GetPostQuery, GetPostQueryVariables>(GetPostDocument, variables),
    ...options
  }
    )};

useGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost', variables];

export const useSuspenseGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      variables: GetPostQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetPostQuery, TError, TData>(
      {
    queryKey: ['GetPostSuspense', variables],
    queryFn: fetcher<GetPostQuery, GetPostQueryVariables>(GetPostDocument, variables),
    ...options
  }
    )};

useSuspenseGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPostSuspense', variables];


useGetPostQuery.fetcher = (variables: GetPostQueryVariables, options?: RequestInit['headers']) => fetcher<GetPostQuery, GetPostQueryVariables>(GetPostDocument, variables, options);

export const GetPostsDocument = `
    query GetPosts($skip: Int, $take: Int) {
  posts(skip: $skip, take: $take) {
    id
    title
    content
    author {
      id
      firstName
      lastName
    }
    comments {
      id
      comment
    }
  }
}
    `;

export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      variables?: GetPostsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
    queryFn: fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables),
    ...options
  }
    )};

useGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts'] : ['GetPosts', variables];

export const useSuspenseGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      variables?: GetPostsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostsSuspense'] : ['GetPostsSuspense', variables],
    queryFn: fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables),
    ...options
  }
    )};

useSuspenseGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPostsSuspense'] : ['GetPostsSuspense', variables];


useGetPostsQuery.fetcher = (variables?: GetPostsQueryVariables, options?: RequestInit['headers']) => fetcher<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables, options);

export const GetUserDocument = `
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    fullName
    posts {
      id
      title
    }
    comments {
      id
      comment
      post {
        id
        title
      }
    }
  }
}
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      variables: GetUserQueryVariables,
      options?: Omit<UseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      {
    queryKey: ['GetUser', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
    ...options
  }
    )};

useGetUserQuery.getKey = (variables: GetUserQueryVariables) => ['GetUser', variables];

export const useSuspenseGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      variables: GetUserQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetUserQuery, TError, TData>(
      {
    queryKey: ['GetUserSuspense', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
    ...options
  }
    )};

useSuspenseGetUserQuery.getKey = (variables: GetUserQueryVariables) => ['GetUserSuspense', variables];


useGetUserQuery.fetcher = (variables: GetUserQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
