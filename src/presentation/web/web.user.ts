export class RegisterUserRequest {
  username: string;
  password: string;
  name: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class UserResponse {
  id: number;
  username: string;
  password?: string;
  name: string;
  token?: string;
}