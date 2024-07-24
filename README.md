# Server Gestión

Servidor REST para el sistema de gestión de actas.

## Descripción

Este proyecto es un servidor REST diseñado para gestionar actas. Está construido con Node.js y utiliza varias dependencias para manejar autenticación, validación, manejo de archivos, y comunicación por correo electrónico.

## Instalación y Configuración

1. Clona el repositorio a tu máquina local y navega al directorio del proyecto:

    ```bash
    git clone https://github.com/Dyrien07/Actasbck.git
    cd Actasbck
    ```

2. Instala las dependencias del proyecto con npm:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

    ```env
    DBUSER=
    DBPWD=
    DBNAME=
    DBSV=
    ```

   

## Uso

1. Para iniciar el servidor en modo producción, usa:

    ```bash
    npm start
    ```

2. Para iniciar el servidor en modo desarrollo con `nodemon` (reinicio automático durante el desarrollo), usa:

    ```bash
    npm run dev
    ```

    El servidor estará disponible en `http://localhost:3000` (o el puerto que hayas configurado).



## Repositorio

El código fuente está disponible en [GitHub](https://github.com/Dyrien07/Actasbck).

## Autor

Ignacio Martin Elisii


