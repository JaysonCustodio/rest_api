import { IUser } from "../type/user";
import r_client from "../config/rethink/client";
import s_client from "../config/elastic/client";

export default class UserModel {
  static createUser(user: IUser) {
    return r_client
      .table("users")
      .insert({
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .run();
  }
  static getUser(id: string) {
    return r_client.table("users").get(id).run();
  }
  static async getAllUsers() {
    const { body } = await s_client.search({
      index: "users",
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
  static updateUser(id: string, new_user: IUser) {
    return r_client
      .table("users")
      .get(id)
      .update({
        ...new_user,
        updated_at: new Date().toISOString(),
      })
      .run();
  }
  static deleteUser(id: string) {
    return r_client.table("users").get(id).delete().run();
  }
}
