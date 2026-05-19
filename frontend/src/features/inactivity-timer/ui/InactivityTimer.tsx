'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface InactivityTimerProps {
  onLogout: () => void;
}

export function InactivityTimer({ onLogout }: InactivityTimerProps) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [showTimer, setShowTimer] = useState(false);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setShowTimer(false);
    setTimeLeft(120);

    logoutTimerRef.current = setTimeout(() => {
      setShowTimer(true);
      setTimeLeft(10);
      countdownTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 110000);
  }, [onLogout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const handler = () => resetTimer();

    resetTimer();
    events.forEach((event) => document.addEventListener(event, handler));

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      events.forEach((event) => document.removeEventListener(event, handler));
    };
  }, [resetTimer]);

  return showTimer ? (
    <div className="mt-2 flex items-center space-x-2">
      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
        ⏰ Sesión expira en: {timeLeft}s
      </div>
      <button
        onClick={resetTimer}
        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
      >
        Extender
      </button>
    </div>
  ) : null;
}
