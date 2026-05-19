export function formatDate(dateString: string): string {
  if (!dateString || dateString === 'sin fecha' || dateString === 'Invalid Date') {
    return 'Fecha no disponible';
  }

  if (dateString === 'no pagado' || dateString === 'sin activar') {
    return 'No pagado';
  }

  try {
    const [day, month, year] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    if (isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Fecha no disponible';
  }
}
