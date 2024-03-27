"use client";

import { Container, Button, TextField, Paper, Typography, Select, MenuItem, FormControlLabel, Checkbox, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react'; import { styled } from '@mui/system';
import { FormProvider as Form } from 'react-hook-form';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

// Estilos personalizados para el Typography con borde
const StyledTypography = styled(Typography)`
    border: 1px solid rgba(0, 0, 0, 0.23); /* Color del borde */
    border-radius: 4px; /* Radio de borde */
    padding: 16.5px 14px; /* Espaciado interno */
    height: 3.6em;
    display: inline-block; /* Mostrar como bloque en línea */
`;


export default function Formulario() {
    const [inputModelo, setInputModelo] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [currentErrors, setCurrentErrors] = useState([]);

    let timer = null;

    const schema = yup.object().shape({
        email: yup.string().email().required('Debes ingresar un email válido'),
        name: yup.string().required('El email debe estar registrado para cargar un nombre válido'),
        model: yup.string().required('Debes seleccionar un modelo'),
        terms: yup.boolean()
            .required("Debes aceptar los términos de uso.")
            .oneOf([true], "Debes aceptar los términos de uso.")
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = window.location.origin;
                const url = new URL('/api/user/username', baseUrl)
                url.search = new URLSearchParams({ email: inputEmail }).toString();

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                if ('username' in result) {
                    const username = result.username
                    setUsername(username)
                    setFormValues((prevValues) => ({ ...prevValues, email: inputEmail, name: username }))
                }
                else {
                    setFormValues((prevValues) => ({ ...prevValues, email: inputEmail }))
                    setUsername('')
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        }
        if (inputEmail !== '')
            fetchData();
    }, [inputEmail])

    const handleEmailUpdate = (event) => {
        setUsername('')
        clearTimeout(timer); // Reinicia el temporizador cada vez que el usuario escribe
        const email = event.target.value
        timer = setTimeout(findUsername, 1000, email); // Espera 1 segundo antes de ejecutar la función
    }

    const findUsername = (email) => {
        setInputEmail(email);
    }

    const handleChangeModelo = (event) => {
        const valModel = event.target.value
        setInputModelo(valModel);
        setFormValues((prevValues) => ({ ...prevValues, model: valModel }))
    };

    const handleCheckboxChange = (e) => {
        const stateCheckbox = e.target.checked
        setIsChecked(stateCheckbox);
        setFormValues((prevValues) => ({ ...prevValues, terms: true }))
    };

    const runValidations = () => {
        schema
            .validate(formValues, { abortEarly: false })
            .then((responseData) => {
                setCurrentErrors([]);
            })
            .catch((err) => {
                setCurrentErrors(err.errors);
            });
    };


    return (<Container maxWidth="md">
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <Paper style={{
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                padding: '40px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                width: '100%',
            }}>
                <Typography variant="h4" component="h1" className="pb-8">
                    Formulario de solicitud de dispositivos
                </Typography>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        textAlign: 'left',
                    }}>
                    <label>
                        Correo electrónico
                    </label>
                    <TextField
                        variant="outlined"
                        label="Correo electrónico"
                        fullWidth
                        onChange={handleEmailUpdate}
                    />
                    <label>
                        Confirmación de nombre
                    </label>
                    <StyledTypography variant="p" component="p">
                        {username}
                    </StyledTypography>
                    <label>
                        Modelo de lente
                    </label>
                    <FormControl>
                        <InputLabel id="demo-multiple-checkbox-label">Modelo</InputLabel>
                        <Select
                            id="select-modelo"
                            value={inputModelo}
                            label="Modelo"
                            onChange={handleChangeModelo}
                        >
                            <MenuItem value={'aviador'}>Aviador</MenuItem>
                            <MenuItem value={'mariposa'}>Mariposa</MenuItem>
                            <MenuItem value={'ojo de gato'}>Ojo de gato</MenuItem>
                            <MenuItem value={'redondeado'}>Redondeado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                        label={<span>He leído y acepto los <a href="https://politicas.ceibal.edu.uy/"
                            target="_blank">Términos de Uso</a></span>}
                    />
                    <ul>
                        {currentErrors.map((e) => {
                            return (
                                <li style={{ color: 'red' }} key={e}>
                                    {e}
                                </li>
                            );
                        })}
                    </ul>

                    <Button variant="contained" style={{ backgroundColor: '#00635D' }} onClick={runValidations} >
                        Enviar
                    </Button>
                </form>
            </Paper>
        </div>
    </Container>)
}