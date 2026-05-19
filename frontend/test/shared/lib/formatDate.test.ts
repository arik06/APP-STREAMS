import { describe, it, expect } from 'vitest';
import { formatDate } from '@/shared/lib/formatDate';

describe('formatDate', () => {
  it('debe formatear fecha DD-MM-YYYY correctamente', () => {
    const result = formatDate('15-05-2026');
    expect(result).toContain('mayo');
    expect(result).toContain('2026');
    expect(result).toContain('15');
  });

  it('debe retornar "Fecha no disponible" para valores nulos', () => {
    expect(formatDate('')).toBe('Fecha no disponible');
  });

  it('debe retornar "Fecha no disponible" para "sin fecha"', () => {
    expect(formatDate('sin fecha')).toBe('Fecha no disponible');
  });

  it('debe retornar "Fecha no disponible" para "Invalid Date"', () => {
    expect(formatDate('Invalid Date')).toBe('Fecha no disponible');
  });

  it('debe retornar "No pagado" para "no pagado"', () => {
    expect(formatDate('no pagado')).toBe('No pagado');
  });

  it('debe retornar "No pagado" para "sin activar"', () => {
    expect(formatDate('sin activar')).toBe('No pagado');
  });

  it('debe retornar "Fecha no disponible" para formato inválido', () => {
    expect(formatDate('not-a-date')).toBe('Fecha no disponible');
  });
});
