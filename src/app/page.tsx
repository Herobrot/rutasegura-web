"use client"
import React, { useState, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import { faArrowsDownToLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAuthData, clearAuthData } from "./token";
import "./inicio.css";

interface Credentials {
    password: string;
    nickname: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({ password: '', nickname: '' });
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const register = () => {
        const { email, password, confirmPassword } = registerForm;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
            });
            return;
        }

        if (password.length < 4) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 4 caracteres.',
            });
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: registerForm.email,
                password: registerForm.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearAuthData();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Registro fallido.',
                });
            } else {
                console.log(data);
                const objectUser = { token: data.token, _idUser: data.user._id };
                saveAuthData(objectUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro exitoso.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        // Redirigir a la página de perfil o a donde sea necesario
                        window.location.href = "/admin";
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
    const login = () => {
        if (credentials.password.length < 4) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 4 caracteres.',
            });
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_APIURL}/user/login`, {
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
                    text: 'Inicio de sesión exitoso de conductor.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        window.location.href = "/admin";
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
        <main>
            <input type="checkbox" id="chk" aria-hidden="false" />
            <div className="signup">
                <div>
                    <label htmlFor="chk" aria-hidden="true">Registrarse</label>
                    <input type="email" name="email" placeholder="Email" autoComplete="off" onChange={handleRegisterInputChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleRegisterInputChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleRegisterInputChange} />
                    <button onClick={register}>Registrarse</button>
                </div>
            </div>

            <div className="login">
                <div>
                    <label htmlFor="chk" aria-hidden="true">Iniciar sesión</label>
                    <input type="email" name="email-L" placeholder="Email" autoComplete="off" onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    <button onClick={login}>Login</button>
                    <label htmlFor="chk" aria-hidden="true">
                        <FontAwesomeIcon icon={faArrowsDownToLine} />
                    </label>
                </div>
            </div>
        </main>
    );
};

export default Login;
