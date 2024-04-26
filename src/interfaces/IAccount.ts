export interface IAccount {
  id: number;
  uuid: string;
  name: string;
  role: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}
