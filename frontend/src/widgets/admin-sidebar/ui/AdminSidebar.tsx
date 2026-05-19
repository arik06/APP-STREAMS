'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Usuarios', icon: '👥' },
    { href: '/admin/services', label: 'Servicios', icon: '🎬' },
  ];

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">Admin</h2>
        <p className="text-white/60 text-sm">Panel de administración</p>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-8 pt-6 border-t border-white/10">
        <Link
          href="/welcome"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span>🏠</span>
          <span>Volver al inicio</span>
        </Link>
      </div>
    </aside>
  );
}
