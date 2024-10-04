# Sistema de Gestión y Asesoría Financiera

## Introducción

Este proyecto es un **sistema web de gestión y asesoría financiera** diseñado para proporcionar a los usuarios recomendaciones financieras personalizadas a través de **análisis impulsado por inteligencia artificial** y herramientas interactivas. Desarrollado utilizando **Next.js**, **Node.js**, **LangChain**, **FastAPI**, **scikit-learn** y **PostgreSQL**, la plataforma ofrece una experiencia completa para gestionar finanzas personales mediante IA asi como tambien agendar citas con asesores financieros, y acceder a recursos educativos.

## Funcionalidades

- **Registro y creación de perfiles**: Los usuarios pueden registrarse y crear un perfil financiero detallado.
- **Análisis basado en IA**: Los perfiles son analizados y categorizados mediante **machine learning** para ofrecer recomendaciones financieras personalizadas.
- **Chatbot financiero**: Los usuarios tienen acceso a un **chatbot basado en IA** que responde consultas y sugiere acciones en función de su perfil financiero.
- **Agendar citas**: Los usuarios pueden agendar sesiones de asesoría financiera directa con expertos.
- **Análisis financiero**: El sistema realiza un análisis detallado de los gastos, nivel financiero, deudas, metas, préstamos, entre otros.
- **Recursos educativos**: Acceso a cursos y libros recomendados según las necesidades del usuario.

## Tecnologías

- **Frontend**: Next.js
- **Backend**: Node.js y FastAPI
- **Base de datos**: PostgreSQL
- **Machine Learning**: scikit-learn para el análisis y categorización de datos financieros.
- **Procesamiento de Lenguaje Natural**: LangChain para el chatbot.

## Instalación

### Prerrequisitos

- Node.js v14+
- Python 3.8+
- PostgreSQL
- Entorno virtual para Python

### Pasos

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/ADGuastalli/CashIn.git
    ```

2. **Instalar dependencias** para el backend y frontend:
    - Backend:
        ```bash
        cd backend
        npm install
        npm start server.js
        
        pip install -r requirements.txt
        ```
         ```bash
        cd API_PLN_SN
        pip install -r requirements.txt
         uvicorn main:app --reload
        ```
        
    - Frontend:
        ```bash
        cd frontend
        npm install
        npm run build
        ```

3. **Configurar la base de datos**:
    - Asegúrate de tener PostgreSQL instalado y crea una base de datos:
        ```bash
        createdb nombre_base_datos
        ```
    - Configura las credenciales en el archivo de configuración del backend.

4. **Ejecutar los servidores de desarrollo**:
    - Para FastAPI:
        ```bash
        uvicorn main:app --reload
        ```
    - Para Next.js:
        ```bash
        npm run dev
        ```

## Uso

- **Regístrate** y crea tu perfil financiero.
- **Analiza** tus datos financieros utilizando herramientas impulsadas por IA.
- **Chatea** con el asistente financiero para recibir asesoramiento al instante.
- **Agenda** citas con asesores financieros.
- **Explora** libros y cursos recomendados para mejorar tu conocimiento financiero.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, sigue el proceso estándar de pull request y asegúrate de que todo el código nuevo esté completamente testeado.
