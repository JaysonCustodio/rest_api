import PostModel from "../models/post";
import UserModel from "../models/user";
import {
  IUser,
  ICreateUserArgs,
  IUpdateUserArgs,
  IDeleteUserArgs,
  IUserPostsArgs,
} from "../type/user";

export default {
  Query: {
    users: async () => await UserModel.getAllUsers(),
    user: async (_: any, { id }: IUser) => await UserModel.getUser(id),
  },
  Mutation: {
    createUser: async (__: any, { input }: ICreateUserArgs) =>
      await UserModel.createUser(input),
    updateUser: async (__: any, { id, input }: IUpdateUserArgs) =>
      await UserModel.updateUser(id, input),
    deleteUser: async (__: any, { id }: IDeleteUserArgs) =>
      await UserModel.deleteUser(id),
  },
  User: {
    post: async (__: any, { id }: IUserPostsArgs) =>
      await PostModel.getAllUserPosts(id),
  },
};
                                                    