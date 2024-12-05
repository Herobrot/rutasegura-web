"use client"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { ConductorForm as ConductorForm } from '../components/Formulario';
import { SidebarProvider } from '@/app/context/SidebarContext';
import Sidebar from '../components/Sidebar';
interface Conductor {
  _id: string;
  nombre: string;
  correo: string;
  password: string;
}

const ConductoresManager: React.FC = () => {
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingConductor, setEditingConductor] = useState<Conductor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchConductores();
  }, []);

  const fetchConductores = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APIURL+'/users/drivers');
      if (!response.ok) throw new Error('Error al cargar conductores');
      const data = await response.json();
      setConductores(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudieron cargar los conductores', 'error');
      setLoading(false);
    }
  };

  const handleCreate = async (newConductor: Omit<Conductor, '_id'>) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APIURL+'/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConductor),
      });
      if (!response.ok) throw new Error('Error al crear conductor');
      const data = await response.json();
      setConductores([...conductores, data]);
      Swal.fire('Éxito', 'Conductor creado correctamente', 'success');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo crear el conductor', 'error');
    }
  };

  const handleUpdate = async (updatedConductor: Conductor) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/users/users/${updatedConductor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConductor),
      });
      if (!response.ok) throw new Error('Error al actualizar conductor');
      const data = await response.json();
      setConductores(conductores.map(c => c._id === data._id ? data : c));
      setEditingConductor(null);
      Swal.fire('Éxito', 'Conductor actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo actualizar el conductor', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/users/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar conductor');
        setConductores(conductores.filter(c => c._id !== id));
        Swal.fire('Eliminado', 'El conductor ha sido eliminado', 'success');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo eliminar el conductor', 'error');
    }
  };

  const openForm = (conductor: Conductor | null = null) => {
    setEditingConductor(conductor);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingConductor(null);
    setIsFormOpen(false);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="max-w mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Gestión de Conductores</h1>
      <button
        onClick={() => openForm()}
        className="mb-6 px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      >
        Agregar Conductor
      </button>
      <ConductorForm 
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={(conductor) => {
          if (editingConductor) {
            handleUpdate({ ...conductor, _id: editingConductor._id });
          } else {
            handleCreate(conductor);
          }
          closeForm();
        }}
        initialData={editingConductor} 
      />

      <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 border-b text-left text-gray-600">Nombre</th>
              <th className="py-3 px-6 border-b text-left text-gray-600">Correo</th>
              <th className="py-3 px-6 border-b text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {conductores.map((conductor, index) => (
              <tr 
                key={conductor._id} 
                className={`transition-transform transform hover:scale-105 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-3 px-6 border-b text-gray-800">{conductor.nombre}</td>
                <td className="py-3 px-6 border-b text-gray-800">{conductor.correo}</td>
                <td className="py-3 px-6 border-b space-x-2">
                  <button 
                    onClick={() => openForm(conductor)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(conductor._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default function App() {
    return (
      <SidebarProvider>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <ConductoresManager />
        </div>
      </SidebarProvider>
    );
  }