import PostModel from "../models/post";

export default {
  Query: {
    posts: async () => await PostModel.getAllPosts(),
    post: async (_: any, { id }: any) => await PostModel.getPost(id),
    userPost: async (_: any, { user_id, id }: any) =>
      await PostModel.getUserPost(user_id, id),
    userPosts: async (_: any, { user_id }: any) =>
      await PostModel.getAllUserPosts(user_id),
  },
  Mutation: {
    createPost: async (_: any, { user_id, title }: any) =>
      await PostModel.createPost(user_id, title),
    updateUserPost: async (_: any, { user_id, post_id, input }: any) =>
      await PostModel.updateUserPost(user_id, post_id, input),
    deleteUserPost: async (_: any, { user_id, post_id }: any) =>
      await PostModel.deleteUserPost(user_id, post_id),
  },
};
