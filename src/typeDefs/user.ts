import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    username: String
    password: String
    created_at: String
    updated_at: String
    post: [Post!]!
  }
  type UserResult {
    inserted: String
    deleted: String
    replaced: String
    errors: String
    skipped: String
    unchanged: String
  }
  input UserInput {
    first_name: String
    last_name: String
    username: String
    password: String
  }
  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }
  extend type Mutation {
    createUser(input: UserInput!): UserResult!
    updateUser(id: ID!, input: UserInput!): UserResult!
    deleteUser(id: ID!): UserResult!
  }
`;
