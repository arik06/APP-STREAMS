'use client';

import { useState, useEffect, useCallback } from 'react';
import { getServices, getServiceById, createService, updateService, uploadImage } from '@/entities/service/api/service.api';
import type { Service, ServiceDetail, UpdateServiceDto } from '@/entities/service/model/service.types';

export function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', endDate: '', imageUrl: '' });
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', endDate: '', imageUrl: '' });

  const fetchServices = useCallback(async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error('Error cargando servicios:', err);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const resetCreateForm = () => setCreateForm({ name: '', email: '', password: '', endDate: '', imageUrl: '' });

  const handleImageUpload = async (file: File, isCreate: boolean) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (isCreate) {
        setCreateForm((prev) => ({ ...prev, imageUrl: url }));
      } else {
        setForm((prev) => ({ ...prev, imageUrl: url }));
      }
    } catch (err) {
      console.error('Error subiendo imagen:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createService(createForm);
      setShowCreate(false);
      resetCreateForm();
      fetchServices();
    } catch (err) {
      console.error('Error creando servicio:', err);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const detail = await getServiceById(id);
      setEditingService(detail);
      setForm({ email: detail.email, password: detail.password, endDate: detail.end_date, imageUrl: '' });
    } catch (err) {
      console.error('Error cargando detalle:', err);
    }
  };

  const handleSave = async () => {
    if (!editingService) return;
    const dto: UpdateServiceDto = {};
    if (form.email) dto.email = form.email;
    if (form.password) dto.password = form.password;
    if (form.endDate) dto.endDate = form.endDate;
    if (form.imageUrl) dto.imageUrl = form.imageUrl;
    await updateService(editingService.id, dto);
    setEditingService(null);
    setForm({ email: '', password: '', endDate: '', imageUrl: '' });
    fetchServices();
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Servicios de Streaming</h1>
        <button
          onClick={() => { setShowCreate(true); setEditingService(null); resetCreateForm(); }}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Servicio
        </button>
      </div>

      {showCreate && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Nuevo Servicio</h2>
          <div className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={createForm.name}
              onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={createForm.email}
              onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Contraseña"
              value={createForm.password}
              onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Fecha expiración (DD-MM-YYYY)"
              value={createForm.endDate}
              onChange={(e) => setCreateForm({ ...createForm, endDate: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label className="block text-white/70 text-sm mb-1">Imagen del servicio</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, true);
                }}
                className="w-full text-white file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              />
              {uploading && <p className="text-yellow-400 text-sm mt-1">Subiendo imagen...</p>}
              {createForm.imageUrl && (
                <div className="mt-2 flex items-center space-x-2">
                  <img src={createForm.imageUrl} alt="preview" className="w-8 h-8 object-contain" />
                  <span className="text-white/50 text-xs truncate">{createForm.imageUrl}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleCreate}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Crear Servicio
              </button>
              <button
                onClick={() => { setShowCreate(false); resetCreateForm(); }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {editingService && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Editar: {editingService.name}
          </h2>
          <div className="space-y-4 max-w-md">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Fecha expiración (DD-MM-YYYY)"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label className="block text-white/70 text-sm mb-1">Cambiar imagen</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, false);
                }}
                className="w-full text-white file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
              />
              {uploading && <p className="text-yellow-400 text-sm mt-1">Subiendo imagen...</p>}
              {form.imageUrl && (
                <div className="mt-2 flex items-center space-x-2">
                  <img src={form.imageUrl} alt="preview" className="w-8 h-8 object-contain" />
                  <span className="text-white/50 text-xs truncate">{form.imageUrl}</span>
                </div>
              )}
              {!form.imageUrl && (
                <p className="text-white/40 text-xs mt-1">Deja vacío para mantener la imagen actual</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleSave}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-8 h-8 object-contain service-logo"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">{service.name}</h3>
                <p className="text-white/60 text-sm">Expira: {service.end_date}</p>
              </div>
            </div>
            <button
              onClick={() => handleEdit(service.id)}
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 sm:py-1 rounded text-sm transition-colors"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
