'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/entities/service/api/service.api';
import { getUsers } from '@/entities/user/api/user.api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, users: 0 });

  useEffect(() => {
    Promise.all([
      getServices().then((s) => setStats((prev) => ({ ...prev, services: s.length }))),
      getUsers().then((u) => setStats((prev) => ({ ...prev, users: u.length }))),
    ]).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="text-4xl mb-2">🎬</div>
          <div className="text-3xl font-bold text-white">{stats.services}</div>
          <div className="text-white/60">Servicios de streaming</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-3xl font-bold text-white">{stats.users}</div>
          <div className="text-white/60">Usuarios registrados</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="text-4xl mb-2">🔐</div>
          <div className="text-3xl font-bold text-white">Admin</div>
          <div className="text-white/60">Rol de administrador</div>
        </div>
      </div>
    </div>
  );
}
