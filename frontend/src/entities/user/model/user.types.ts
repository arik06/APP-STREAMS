export interface LoginDto {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  createdAt: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
}
