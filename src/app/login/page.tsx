"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import { saveAuthData, clearAuthData } from "./token";
import "./login.css";
import Navbar from '../components/Navbar';

interface Credentials {
    password: string;
    correo: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({ password: '', correo: '' });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (credentials.password.length < 4) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 4 caracteres.',
            });
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_APIURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearAuthData();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Inicio de sesión fallido.',
                });
            } else {
                console.log(data);
                const objectUser = { token: data.token, _idUser: data.user._id };
                saveAuthData(objectUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        if (data.tipo === 'admin') {
                            window.location.href = "/admin";
                        } else {
                            window.location.href = "/conductor";
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la petición.',
            });
        });
    };

    return (
        <>
            <Navbar />
            <main className="login-container">
                <div className="login-card">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="correo" 
                                placeholder="Correo electrónico" 
                                autoComplete="off" 
                                onChange={handleInputChange} 
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Contraseña" 
                                onChange={handleInputChange} 
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Iniciar sesión</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Login;