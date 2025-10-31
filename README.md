
````markdown
# CibESphere (Frontend)

![React + Vite + TypeScript](https://img.shields.io/badge/React-Vite%20%7C%20TS-blue?logo=react)
![Material-UI](https://img.shields.io/badge/Material%20UI-blue?logo=mui)
![React_Router](https://img.shields.io/badge/React%20Router-v6-red?logo=reactrouter)
![Leaflet](https://img.shields.io/badge/Leaflet-green?logo=leaflet)

Este repositorio contiene el frontend del proyecto CibESphere, una plataforma sin ánimo de lucro diseñada para unificar y centralizar todos los eventos de ciberseguridad en España, fomentando la comunidad y la visibilidad.

Esta aplicación está construida en React (con Vite y TypeScript) y utiliza un diseño responsive basado en componentes de Material-UI.

## 🚀 Funcionalidades Implementadas

Este proyecto es una aplicación frontend completamente funcional que opera en un **modo de API simulada (mock)**.

- **Autenticación Completa:** Sistema de **Login** y **Registro** con manejo de estado global (React Context).
- **Roles de Usuario:** Diferenciación entre `Asistente` y `Organizador`, con formularios y campos condicionales.
- **Rutas Protegidas:** Los paneles de usuario y organizador son privados y solo accesibles tras iniciar sesión.
- **Landing Page Dinámica:** Página de inicio que carga eventos desde la API simulada.
- **Mapa Interactivo:** Implementación de **React Leaflet** con marcadores de eventos (pins) y pop-ups.
- **Sistema de Filtros Completo:** Filtrado de eventos por rango de fechas, localización (Comunidades y Provincias), tags (categorías) y nivel (principiante, etc.).
- **Página de Detalles de Evento:** Vista detallada para cada evento con formulario de suscripción.
- **Panel de Usuario:** Permite a los usuarios ver los eventos a los que están suscritos y cancelar su suscripción.
- **Panel de Organizador:**
  - Dashboard con estadísticas (total de eventos, asistentes, etc.).
  - Gestión de eventos: Ver, **Crear** y **Borrar** eventos.
- **Diseño Responsive:** La aplicación se adapta a formatos de móvil, tablet y escritorio.

## 🛠️ Stack Tecnológico

- **Framework:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Componentes UI:** [Material-UI (MUI) v7](https://mui.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Mapas:** [React Leaflet](https://react-leaflet.js.org/)
- **Manejo de Estado:** React Context (API)

## 🏁 Cómo Empezar

### Prerrequisitos

- [Node.js](https://nodejs.org/en) (versión 20.x o superior recomendada).

### Instalación y Ejecución

1.  **Clonar el repositorio:**

    ```bash
    git clone [URL-DEL-REPOSITORIO]
    cd ciblo
    ```

2.  **Instalar dependencias:**
    Este paso instalará todas las librerías necesarias (React, MUI, Leaflet, etc.).

    ```bash
    npm install
    ```

3.  **Ejecutar el proyecto:**
    Esto iniciará el servidor de desarrollo de Vite.

    ```bash
    npm start
    ```

4.  Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

## ⚙️ Modo de API Simulada (Mock)

Actualmente, este proyecto **no necesita un backend** para funcionar.

Toda la lógica del servidor (autenticación, obtención de datos, creación de eventos) está simulada localmente.

- **API Simulada:** La lógica se encuentra en `src/services/apiService.ts`.
- **Base de Datos Falsa:** Los datos de prueba (usuarios y eventos) están en `src/mocks/db.ts`.

### Cuentas de Demostración

Puedes usar estas cuentas (definidas en `src/mocks/db.ts`) para probar la aplicación:

- **Rol:** Asistente
- **Email:** `attendee@cybesphere.local`
- **Pass:** `Attendee123!`

- **Rol:** Organizador
- **Email:** `organizer@cybesphere.local`
- **Pass:** `Organizer123!`

- **Rol:** Administrador
- **Email:** `admin@cybesphere.local`
- **Pass:** `Admin123!`

### 🔌 Cómo Conectar al Backend Real

Cuando el backend de [CibESphere-backend](https://github.com/CibESphere-project/CibESphere-backend) esté desplegado en una URL (ej. `https://api.cybesphere.com`), solo necesitarás hacer **un cambio**:

1.  Abre el archivo `src/services/apiService.ts`.
2.  Borra (o comenta) las funciones simuladas.
3.  Reemplázalas con llamadas `fetch` o `axios` a los endpoints reales del backend.

Como todo el proyecto se ha construido siguiendo el "contrato" de la API del backend, la transición será rápida y directa.

## 📁 Estructura del Proyecto
````

ciblo/
├── public/ \# Imágenes estáticas y logos
├── src/
│ ├── assets/ \# Iconos SVG utilizados en el proyecto
│ ├── components/ \# Componentes reutilizables (Header, Footer, EventCard, EventMap...)
│ ├── constants/ \# Listas de filtros (localizaciones, tags, niveles)
│ ├── context/ \# React Context para estado global (AuthContext)
│ ├── mocks/ \# API simulada (apiService.ts) y BD falsa (db.ts)
│ ├── pages/ \# Componentes de página (LandingPage, SignUp, PanelDeUsuario...)
│ ├── types/ \# Definiciones de TypeScript (User, Event, etc.)
│ ├── App.tsx \# Definición de rutas
│ ├── global.tsx \# Estilos CSS globales (variables de Figma)
│ └── index.tsx \# Punto de entrada de React
├── .gitignore
├── index.html \# Plantilla HTML principal (incluye CSS de Leaflet)
├── package.json \# Dependencias del proyecto
├── README.md \# Esta documentación
└── tsconfig.json \# Configuración de TypeScript

```

```
