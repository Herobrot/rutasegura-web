import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Conductor {
  _id: string;
  nombre: string;
  correo: string;
  password: string;
}

interface ConductorFormProps {
  onSubmit: (conductor: Conductor) => void;
  initialData: Conductor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ConductorForm: React.FC<ConductorFormProps> = ({ onSubmit, initialData, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ nombre: '', correo: '', password: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = { ...formData, _id: '' };
    onSubmit(updatedFormData);
    setFormData({ nombre: '', correo: '', password: '' });
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-10`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Editar' : 'Crear'} Conductor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-2 border border-gray-300 rounded"
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            placeholder="Nombre" 
            required 
          />
          <input 
            className="w-full p-2 border border-gray-300 rounded"
            name="correo" 
            value={formData.correo} 
            onChange={handleChange} 
            placeholder="Correo" 
            type="email"
            required 
          />
          <input 
            className="w-full p-2 border border-gray-300 rounded"
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Contraseña" 
            type="password"
            required 
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {initialData ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
