import { apiFetch } from '@/shared/api/base';
import type { LoginDto, User, CreateUserDto, UpdateUserDto } from '@/entities/user/model/user.types';
import type { LoginResponse } from '@/shared/types';

export function login(dto: LoginDto): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function getUsers(): Promise<User[]> {
  return apiFetch<User[]>('/api/admin/users');
}

export function createUser(dto: CreateUserDto): Promise<User> {
  return apiFetch<User>('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export function updateUser(id: number, dto: UpdateUserDto): Promise<User> {
  return apiFetch<User>(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dto),
  });
}

export function deleteUser(id: number): Promise<void> {
  return apiFetch<void>(`/api/admin/users/${id}`, { method: 'DELETE' });
}
