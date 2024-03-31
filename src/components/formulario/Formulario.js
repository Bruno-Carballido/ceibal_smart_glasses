"use client";

import { Container, Button, TextField, Paper, Typography, Select, MenuItem, FormControlLabel, Checkbox, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react'; import { styled } from '@mui/system';

import styles from './Formulario.module.css'
import { useSnackbar } from 'app/components/snackbar';

import * as yup from "yup";

// Estilos   para el Typography con borde
const StyledTypography = styled(Typography)`
    border: 1px solid rgba(0, 0, 0, 0.23); /* Color del borde */
    border-radius: 4px; /* Radio de borde */
    padding: 16.5px 14px; /* Espaciado interno */
    height: 3.6em;
    display: inline-block; /* Mostrar como bloque en línea */
`;


export default function Formulario() {
    const { enqueueSnackbar } = useSnackbar();

    const [inputModelo, setInputModelo] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputEmailDelay, setInputEmailDelay] = useState('');
    const [username, setUsername] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [currentErrors, setCurrentErrors] = useState([]);
    const [modelValues, setModelValues] = useState([]);

    let timer = null;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = window.location.origin;
                const url = new URL('/api/models', baseUrl)

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setModelValues(result.models);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                enqueueSnackbar('Error al cargar modelos, por favor recargue la página.', {
                    variant: 'warning',
                });
            }
        }
        fetchData();
    }, [])

    const schema = yup.object().shape({
        email: yup.string().email().required('Debes ingresar un email válido.'),
        name: yup.string().required('Debes ingrear un email registrado para cargar su nombre.'),
        model: yup.string().required('Debes seleccionar un modelo.'),
        terms: yup.boolean()
            .required("Debes aceptar los términos de uso.")
            .oneOf([true], "Debes aceptar los términos de uso.")
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = window.location.origin;
                const url = new URL('/api/user/username', baseUrl)
                url.search = new URLSearchParams({ email: inputEmailDelay }).toString();

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                if ('username' in result) {
                    const username = result.username
                    setUsername(username)
                    setFormValues((prevValues) => ({ ...prevValues, email: inputEmailDelay, name: username }))
                }
                else {
                    setFormValues((prevValues) => ({ ...prevValues, email: inputEmailDelay }))
                    setUsername('')
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                enqueueSnackbar('Error al cargar nombre, por favor recargue la página.', {
                    variant: 'warning',
                });
            }
        }
        if (inputEmailDelay !== '')
            fetchData();
    }, [inputEmailDelay])

    const handleEmailUpdate = (event) => {
        setUsername('')
        clearTimeout(timer); // Reinicia el temporizador cada vez que el usuario escribe
        const email = event.target.value
        setInputEmail(email)
        timer = setTimeout(findUsername, 1000, email); // Espera 1 segundo antes de ejecutar la función
    }

    const findUsername = (email) => {
        setInputEmailDelay(email);
    }

    const handleChangeModelo = (event) => {
        const valModel = event.target.value
        setInputModelo(valModel);
        setFormValues((prevValues) => ({ ...prevValues, model: valModel }))
    };

    const handleCheckboxChange = (e) => {
        const stateCheckbox = e.target.checked
        setIsChecked(stateCheckbox);
        setFormValues((prevValues) => ({ ...prevValues, terms: stateCheckbox }))
    };

    const runValidations = () => {
        schema
            .validate(formValues, { abortEarly: false })
            .then((responseData) => {
                setCurrentErrors([]);
                const saveData = async () => {
                    try {
                        const baseUrl = window.location.origin;
                        const url = new URL('/api/requests', baseUrl)

                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json', // Tipo de contenido que estás enviando (JSON en este caso)
                            },
                            body: JSON.stringify(formValues), // Convierte los datos a formato JSON y los envía en el cuerpo de la solicitud
                        });
                        if (!response.ok) {
                            enqueueSnackbar('Error al guardar los datos.', {
                                variant: 'error',
                            });
                        } else {
                            // const result = await response.json();
                            setInputModelo('')
                            setInputEmail('')
                            setInputEmailDelay('')
                            setUsername('')
                            setIsChecked(false)
                            setFormValues({})
                            enqueueSnackbar('Solicitud enviada correctamente.');
                        }
                    } catch (error) {
                        console.error('Error al realizar la solicitud:', error);
                        enqueueSnackbar('Error al guardar los datos.', {
                            variant: 'error',
                        });
                    }
                }
                saveData()
            })
            .catch((err) => {
                setCurrentErrors(err.errors);
            });
    };


    return (<Container maxWidth="md">
        <div className={styles.MainDiv}>
            <Paper className={styles.PaperForm}>
                <Typography variant="h4" component="h1" className="pb-8">
                    Formulario de solicitud de dispositivos
                </Typography>
                <form className={styles.Formulario}>
                    <label>
                        Correo electrónico
                    </label>
                    <TextField
                        variant="outlined"
                        value={inputEmail}
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
                            {modelValues.map((model) => (
                                <MenuItem key={model.id} value={model.id}>
                                    {model.name}
                                </MenuItem>
                            ))}
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
                                <li key={e} className={styles.liItem}>{e}</li>
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