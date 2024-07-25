"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import { faArrowsDownToLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAuthData, clearAuthData } from "./token";
import "./login.css";
import Navbar from '../components/Navbar';

interface Credentials {
    password: string;
    nickname: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({ password: '', nickname: '' });
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registering, setRegistering] = useState(false); // Estado para controlar el registro en curso

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (registering) return; // Evitar envíos múltiples

        const { name, email, password, confirmPassword } = registerForm;

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

        setRegistering(true); // Iniciar proceso de registro

        fetch(`${process.env.NEXT_PUBLIC_APIURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: name,
                correo: email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            setRegistering(false); 
            console.log(data);

            if (!data) {
                clearAuthData();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Registro fallido.',
                });
            } else {
                console.log(data);
                const objectUser = { token: data.token, _idUser: data._id };
                saveAuthData(objectUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro exitoso.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        if (data.tipo === 'admin') {
                            window.location.href = "/admin";
                        }
                        else{
                            window.location.href = "/"+data.id;
                        }
                    }
                });
            }
        })
        .catch(error => {
            setRegistering(false);
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la petición.',
            });
        });
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
                    text: 'Inicio de sesión exitoso de conductor.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        if (data.tipo === 'admin') {
                            window.location.href = "/admin";
                        }
                        else{
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
        <><main>
            <Navbar></Navbar>
            <input type="checkbox" id="chk" aria-hidden="false" />
            <div className="signup">
                <form onSubmit={handleRegisterSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Registrarse</label>
                    <input type="email" name="email" placeholder="Email" autoComplete="off" onChange={handleRegisterInputChange} />
                    <input type='text' name='name' placeholder='Nombre' onChange={handleRegisterInputChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleRegisterInputChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleRegisterInputChange} />
                    <button type="submit" disabled={registering}>Registrarse</button>
                </form>
            </div>

            <div className="login">
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Iniciar sesión</label>
                    <input type="email" name="nickname" placeholder="Nickname" autoComplete="off" onChange={handleInputChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    <button type="submit">Login</button>
                    <label htmlFor="chk" aria-hidden="true">
                        <FontAwesomeIcon icon={faArrowsDownToLine} />
                    </label>
                </form>
            </div>
        </main></>
    );
};

export default Login;
