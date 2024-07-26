import React, { FC, FormEvent, useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translatex(200px);
  }
  to {
    opacity: 1;
    transform: translatex(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
`;

const ModalContainer = styled.div<{ show: boolean, isClosing: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(51, 51, 51, 0.75);
  justify-content: center;
  align-items: center;
  animation: ${({ isClosing }) => isClosing ? fadeOut : fadeIn} 0.4s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  max-width: 720px;
  width: 90%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalBody = styled.div`
  padding: 20px;
  flex: 1.5;
`;

const ModalImage = styled.div`
  flex: 1;
  background: url('https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80') no-repeat center center;
  background-size: cover;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
  color: #333;
`;

const Modal: FC<ModalProps> = ({ show, onClose, onSubmit }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <ModalContainer show={show || isClosing} isClosing={isClosing} onClick={handleClickOutside}>
      <ModalContent ref={modalRef}>
        <ModalBody>
          <ModalTitle>Agregar Vehículo</ModalTitle>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Placa</label>
              <input
                type="text"
                name="placa"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Modelo</label>
              <input
                type="text"
                name="modelo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Chofer</label>
              <input
                type="text"
                name="chofer"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsClosing(true)}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        </ModalBody>
        <ModalImage />
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;