'use client';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export function Header({ username, onLogout }: HeaderProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-white">¡Bienvenido, {username}!</h1>
            <p className="text-white/80">Tus servicios de streaming</p>
            <div className="mt-1 flex items-center space-x-2">
              <div className="text-white/60 text-xs flex items-center space-x-1">
                <span>⏱️</span>
                <span>Timer de inactividad activo</span>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
          >
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
