'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '@/entities/user/api/user.api';
import type { User, CreateUserDto, UpdateUserDto } from '@/entities/user/model/user.types';

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', password: '' });

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error cargando usuarios:', err);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleCreate = async () => {
    const dto: CreateUserDto = { username: form.username, password: form.password };
    await createUser(dto);
    setForm({ username: '', password: '' });
    setShowForm(false);
    fetchUsers();
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    const dto: UpdateUserDto = {};
    if (form.username) dto.username = form.username;
    if (form.password) dto.password = form.password;
    await updateUser(editingUser.id, dto);
    setForm({ username: '', password: '' });
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Usuarios</h1>
        <button
          onClick={() => { setShowForm(true); setEditingUser(null); setForm({ username: '', password: '' }); }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Usuario
        </button>
      </div>

      {(showForm || editingUser) && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <div className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder={editingUser ? 'Nueva contraseña (dejar vacío para mantener)' : 'Contraseña'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-3">
              <button
                onClick={editingUser ? handleUpdate : handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingUser(null); setForm({ username: '', password: '' }); }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20 text-left">
              <th className="p-4 font-medium text-white/70">ID</th>
              <th className="p-4 font-medium text-white/70">Usuario</th>
              <th className="p-4 font-medium text-white/70">Rol</th>
              <th className="p-4 font-medium text-white/70">Creado</th>
              <th className="p-4 font-medium text-white/70">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-purple-500/30 text-purple-300' : 'bg-blue-500/30 text-blue-300'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-white/60">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => { setEditingUser(user); setForm({ username: user.username, password: '' }); }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Editar
                    </button>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
