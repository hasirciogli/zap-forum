import { IAccount } from "./IAccount";

export interface IPost {
  id: number;
  uuid: string;
  title: string;
  content: string;
  published: boolean;

  authorId: number;
  author: IAccount;

  created_at: Date;
  updated_at: Date;
  user_id: number;
}
