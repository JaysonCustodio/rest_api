import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID
    user_id: String
    title: String
    created_at: String
    updated_at: String
  }
  input PostInput {
    title: String
  }
  type PostResult {
    inserted: String
    deleted: String
    replaced: String
    errors: String
    skipped: String
    unchanged: String
  }
  extend type Query {
    posts: [Post!]!
    post(id: ID!): Post!
    userPost(user_id: ID!, id: ID!): Post!
    userPosts(user_id: ID!): [Post!]!
  }
  extend type Mutation {
    createPost(user_id: ID!, title: String!): PostResult!
    updateUserPost(user_id: ID!, post_id: ID!, input: PostInput!): PostResult!
    deleteUserPost(user_id: ID!, post_id: ID!): PostResult!
  }
`;
