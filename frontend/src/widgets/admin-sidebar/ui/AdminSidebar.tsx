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

  const linkClass = (href: string) =>
    `flex shrink-0 items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
      pathname === href
        ? 'bg-white/20 text-white'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <aside className="w-full md:w-64 shrink-0 bg-white/10 backdrop-blur-sm border-b md:border-b-0 md:border-r border-white/20 md:min-h-screen p-4 md:p-6">
      <div className="mb-4 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white">Admin</h2>
        <p className="text-white/60 text-sm hidden sm:block">Panel de administración</p>
      </div>

      <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            <span>{link.icon}</span>
            <span className="whitespace-nowrap">{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
        <Link href="/welcome" className={linkClass('')}>
          <span>🏠</span>
          <span className="whitespace-nowrap">Volver al inicio</span>
        </Link>
      </div>
    </aside>
  );
}
