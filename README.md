# 🚗 Sistema de Gestión de Renta de Carros - BackEnd

Este es un sistema de gestión de alquiler de automóviles desarrollado en Node.js con Express y MongoDB. Proporciona una API REST para manejar la autenticación de usuarios, gestión de clientes, vehículos y reservas.

## 📌 Características
- 📋 **Autenticación y autorización** con JWT.
- 🚘 **Gestión de vehículos**: Registro, actualización y eliminación de autos.
- 🧑 **Gestión de clientes**: Registro y administración de clientes.
- 📅 **Gestión de reservas**: Creación y manejo de alquileres de vehículos.
- 🛠 **Validación de datos** con express-validator.
- 🔐 **Middleware de seguridad** para proteger las rutas.

## 🏗 Estructura del Proyecto
```
mtdev2312-rental-car-backend/
│── src/
│   ├── config/                # Configuración de base de datos
│   ├── controllers/           # Controladores para cada entidad
│   ├── helpers/               # Funciones de validación
│   ├── middlewares/           # Middlewares de autenticación y validación
│   ├── models/                # Modelos de datos de MongoDB
│   ├── routers/               # Rutas de la API
│   ├── server.js              # Configuración del servidor Express
│   └── index.js               # Punto de entrada del servidor
│── .env.example               # Variables de entorno
│── package.json               # Dependencias y scripts
│── README.md                  # Documentación del proyecto
```

## 🚀 Instalación y Configuración
### 🔧 Requisitos previos
- Node.js (>= 14)
- MongoDB

### 📥 Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MTDEV2312/Rental-Car-BackEnd.git
   cd Rental-Car-BackEnd
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   - Renombrar `.env.example` a `.env` y completar los valores necesarios.

### ▶️ Ejecución del servidor
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:4000`.

## 📡 Endpoints de la API
### 🔐 Autenticación
| Método | Ruta           | Descripción       |
|--------|--------------|-------------------|
| POST   | `/api/login` | Iniciar sesión |

### 🚘 Vehículos
| Método | Ruta                | Descripción               |
|--------|---------------------|---------------------------|
| POST   | `/api/cars/register` | Registrar un vehículo     |
| GET    | `/api/cars`         | Listar todos los vehículos |
| GET    | `/api/cars/:placa`  | Obtener un vehículo por placa |
| PATCH  | `/api/cars/update/:id` | Actualizar un vehículo |
| DELETE | `/api/cars/delete/:id` | Eliminar un vehículo |

### 🧑 Clientes
| Método | Ruta                   | Descripción               |
|--------|------------------------|---------------------------|
| POST   | `/api/clients/register` | Registrar un cliente     |
| GET    | `/api/clients`         | Listar todos los clientes |
| GET    | `/api/clients/:cedula` | Obtener un cliente por cédula |
| PATCH  | `/api/clients/update/:id` | Actualizar un cliente |
| DELETE | `/api/clients/delete/:id` | Eliminar un cliente |

### 📅 Reservas
| Método | Ruta                     | Descripción               |
|--------|-------------------------|---------------------------|
| POST   | `/api/bookings/register` | Registrar una reserva    |
| GET    | `/api/bookings`         | Listar todas las reservas |
| GET    | `/api/bookings/:codigo` | Obtener una reserva por código |
| PATCH  | `/api/bookings/update/:id` | Actualizar una reserva |
| DELETE | `/api/bookings/delete/:id` | Eliminar una reserva |

## 🛠 Tecnologías Utilizadas
- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación
- **bcrypt.js** para el cifrado de contraseñas
- **express-validator** para validaciones de datos
- **dotenv** para variables de entorno
- **cors** para permitir solicitudes desde otros dominios

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.
