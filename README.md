# Ceibal Smart Glasses

Este proyecto fue realizado por Bruno Carballido en el marco del desafio técnico para el llamado de Desarrollador Senior en Ceibal.

## Tecnologías utilizadas

### Nextjs
Este proyecto utuliza Next.js tanto para el backend como para el frontend, aprovechando las funcionalidades de lado del servidor que este proporciona.

### Docker
Docker es utilizado para facilitar la ejecución del proyecto, permitiendo desplegar una base de datos MySQL en conjunto con la aplicación web de forma que estas sean accesibles entre sí. También cuenta con generación automática de la base de datos y carga de datos iniciales. 

## Ejecución del proyecto

Antes de ejecutar el proyecto, es necesario crear un archivo llamado .env en la raíz del proyecto con las variables necesarias para su ejecución. Para esto, se puede tomar como referencia el archivo .env.example proporcionado.

Para iniciar el proyecto, es necesario ejecutar el siguiente comando desde la raíz del proyecto:

> docker compose up --build

Al terminar de iniciar Docker el sitio debería estar disponible en http://localhost:3000/.