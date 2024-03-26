"use client";

import Image from "next/image";
import { Container, Button, TextField, Paper, Typography, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';


export default function Home() {
  const [modelo, setModelo] = useState('aviador');

  const handleChangeModelo = (event) => {
    console.log(event);
    setModelo(event.target.value);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Container maxWidth="md">
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

            <form style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                required
              />
              <Select
                id="select-modelo"
                value={modelo}
                label="Modelo"
                onChange={handleChangeModelo}
              >
                <MenuItem value={'aviador'}>Aviador</MenuItem>
                <MenuItem value={'mariposa'}>Mariposa</MenuItem>
                <MenuItem value={'ojo de gato'}>Ojo de gato</MenuItem>
                <MenuItem value={'redondeado'}>Redondeado</MenuItem>
              </Select>

              <FormControlLabel required control={<Checkbox />} label={<span>He leído y acepto los <a href="https://politicas.ceibal.edu.uy/" target="_blank">Términos de Uso</a></span>} />

              <Button variant="contained" style={{ backgroundColor: '#00635D' }} >
                Enviar
              </Button>
            </form>
          </Paper>
        </div>
      </Container>
    </main>
  );
}
