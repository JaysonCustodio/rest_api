export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUserArgs {
  input: IUser;
}

export interface IUpdateUserArgs {
  id: string;
  input: IUser;
}

export interface IDeleteUserArgs {
  id: string;
}

export interface IUserPostsArgs {
  id: string;
}
