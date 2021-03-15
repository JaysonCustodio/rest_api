import r_client from "../config/rethink/client";
import s_client from "../config/elastic/client";
import IPost from "../type/post";

export default class PostModel {
  static getPost(post_id: string) {
    return r_client.table("posts").get(post_id).run();
  }

  static createPost(user_id: string, post: IPost) {
    return r_client
      .table("posts")
      .insert({
        title: post,
        user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .run();
  }

  static async getAllPosts() {
    const { body } = await s_client.search({
      index: "posts",
      body: {
        query: {
          match_all: {},
        },
        size: 100,
      },
    });
    return body.hits.hits.map((item: any) => {
      return item._source;
    });
  }
  static async getAllUserPosts(user_id: string) {
    const { body } = await s_client.search({
      index: "posts",
      body: {
        query: {
          match: {
            user_id,
          },
        },
      },
    });
    return body.hits.hits.map((item: any) => {
      return item._source;
    });
  }
  static getUserPost(user_id: string, post_id: string) {
    return r_client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .run();
  }
  static updateUserPost(user_id: string, post_id: string, post: IPost) {
    return r_client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .update({
        ...post,
        updated_at: new Date().toISOString(),
      })
      .run();
  }
  static deleteUserPost(user_id: string, post_id: string) {
    return r_client
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .delete()
      .run();
  }
}
