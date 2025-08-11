'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';


interface Service {
  id: number;
  name: string;
  image_url: string;
  end_date: string;
}

interface ServiceDetail {
  id: number;
  name: string;
  email: string;
  password: string;
  end_date: string;
  image_url: string;
}

export default function WelcomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos en segundos
  const [showTimer, setShowTimer] = useState(false);
  const router = useRouter();
  
  // Referencias para el timer
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Función para resetear el timer de inactividad
  const resetInactivityTimer = useCallback(() => {
    // Limpiar timers existentes
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    
    // Ocultar contador
    setShowTimer(false);
    setTimeLeft(120);
    
    // Iniciar nuevo timer de 2 minutos
    logoutTimerRef.current = setTimeout(() => {
      // Mostrar contador de 10 segundos
      setShowTimer(true);
      setTimeLeft(10);
      
      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Auto-logout después de 10 segundos
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 110000); // 1 minuto y 50 segundos (110 segundos)
  }, []);

  // Función para manejar actividad del usuario
  const handleUserActivity = useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Función para cerrar sesión
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/');
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (!token) {
      router.push('/');
      return;
    }

    setUsername(storedUsername || 'Usuario');
    fetchServices();
    
    // Iniciar timer de inactividad
    resetInactivityTimer();
    
    // Eventos para detectar actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });
    
    // Cleanup al desmontar el componente
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [router, resetInactivityTimer, handleUserActivity]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar servicios');
      }

      const data = await response.json();
      console.log('Servicios recibidos:', data); // Para debugging
      
      // Actualizar las rutas de las imágenes para usar /img/
      const updatedData = data.map((service: Service) => ({
        ...service,
        image_url: service.image_url.replace('/images/', '/img/')
      }));
      setServices(updatedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceClick = async (serviceId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/services/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar detalles del servicio');
      }

      const data = await response.json();
      // Actualizar la ruta de la imagen para usar /img/
      data.image_url = data.image_url.replace('/images/', '/img/');
      setSelectedService(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Cargando servicios...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                ¡Bienvenido, {username}!
              </h1>
              <p className="text-white/80">Tus servicios de streaming</p>
              
              {/* Indicador de timer activo */}
              <div className="mt-1 flex items-center space-x-2">
                <div className="text-white/60 text-xs flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>Timer de inactividad activo</span>
                </div>
              </div>
              
              {/* Timer de inactividad - Cuenta regresiva */}
              {showTimer && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    ⏰ Sesión expira en: {timeLeft}s
                  </div>
                  <button
                    onClick={resetInactivityTimer}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Extender
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer p-6 border border-white/20 hover:bg-white/20"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-white/80">
                    Expira: {formatDate(service.end_date)}
                  </p>
                </div>
                <span className="text-white/60">👁️</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={selectedService.image_url}
                  alt={selectedService.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedService.name}</h2>
                <p className="text-sm text-gray-500">
                  Expira: {formatDate(selectedService.end_date)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-900">{selectedService.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-900">{selectedService.password}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
