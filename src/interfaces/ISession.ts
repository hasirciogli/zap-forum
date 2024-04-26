import { IAccount } from "./IAccount";

export interface ISession {
  id: number;
  uuid: string;
  token: string;
  account: IAccount;
  accountId: number;
  created_at: Date;
  updated_at: Date;
}
