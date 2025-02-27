import { number, string } from 'zod';

export class UserEntity {
  id: number;
  username: string;
  password: string;
  name: string;
  createdAt: Date;

  constructor(params: {
    id: number;
    username: string;
    password: string;
    name: string;
  }) {
    this.id = params.id;
    this.username = params.username;
    this.password = params.password;
    this.name = params.name;
  }
}