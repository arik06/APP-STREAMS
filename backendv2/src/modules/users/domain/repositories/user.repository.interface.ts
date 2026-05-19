import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findAll(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  create(data: { username: string; password: string; role?: string }): Promise<UserEntity>;
  update(id: number, data: { username?: string; password?: string }): Promise<UserEntity>;
  delete(id: number): Promise<void>;
}
