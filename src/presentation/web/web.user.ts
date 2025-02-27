export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
}

export class RegisterUserResponse {
  id: number;
  username: string;
  password: string;
  name: string;
}