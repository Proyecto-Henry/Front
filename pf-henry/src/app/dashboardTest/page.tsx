'use client';

import React from 'react';
import ProfileUploader from '../../components/ProfileUploader';
import useUserDataStore from '@/store';
const DashboardTest = () => {
  const { userData, isHydrated } = useUserDataStore();

  if (!isHydrated) {
    return <p>Cargando almacenamiento local...</p>;
  }

  if (!userData || !userData.user.id /* || !userData.token */) {
    return <p>No hay datos del administrador. Inicia sesión primero.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard del Administrador</h1>
      <ProfileUploader />
    </div>
  );
};

export default DashboardTest;