import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/widgets/service-card/ui/ServiceCard';

const mockService = {
  id: 1,
  name: 'Netflix',
  image_url: '/img/netflix.png',
  end_date: '03-09-2026',
};

describe('ServiceCard', () => {
  it('debe renderizar el nombre del servicio', () => {
    render(<ServiceCard service={mockService} onClick={() => {}} />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
  });

  it('debe mostrar la fecha de expiración', () => {
    render(<ServiceCard service={mockService} onClick={() => {}} />);
    expect(screen.getByText(/Expira:/)).toBeInTheDocument();
  });

  it('debe mostrar la imagen del servicio', () => {
    render(<ServiceCard service={mockService} onClick={() => {}} />);
    const img = screen.getByAltText('Netflix');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/img/netflix.png');
  });
});
