# Proyecto de Control de Acceso y Gestión de Espacios de Coworking

## Descripción General

Este proyecto tiene como objetivo desarrollar una aplicación para el control de acceso y la gestión de un espacio de coworking. La aplicación permite registrar y monitorear la entrada y salida de personas, gestionar las salas de trabajo y generar informes administrativos.

## Funcionalidades Principales

1. **Registro y Autenticación de Usuarios**  
   - Registro de usuarios.  
   - Autenticación de usuarios.

2. **Control de Acceso**  
   - Registro de entradas y salidas de los usuarios en el espacio de coworking.  
   - Gestión del aforo de las salas en tiempo real.

3. **Gestión de Salas**  
   - Visualización de la disponibilidad de salas.  
   - Reservas de salas para reuniones o trabajo individual.

4. **Informes Administrativos**  
   - Frecuencia de uso de salas y espacio.  
   - Estadísticas de uso, ausencias y usuarios frecuentes/infrecuentes.

## Entidades y Relaciones

Las principales entidades del sistema incluyen **Persona**, **Sala**, **Acceso** y **Historial de Acceso**. Cada entidad está relacionada de manera que permite registrar y administrar los accesos a las diferentes salas del coworking.

## Endpoints Principales

Aquí se destacan algunos de los endpoints más importantes del proyecto:

- **Accesos**  
  - `POST /accesses/entry`: Registra una nueva entrada.  
  - `POST /accesses/exit`: Registra una nueva salida.  
  - `GET /accesses/current/room/{room_id}`: Lista de personas en una sala específica.

- **Personas**  
  - `GET /persons/{id}/current-access`: Acceso actual de una persona.  
  - `GET /persons/{id}/access-history`: Historial de accesos de una persona.

- **Salas**  
  - `GET /rooms/{id}/current-status`: Estado actual de una sala.

- **Administración**  
  - `POST /administration/daily-report`: Genera un informe diario de accesos y ausencias.  
  - `GET /administration/reports`: Obtiene informes de accesos por rango de fechas.  
  - `GET /administration/room-usage`: Estadísticas de uso de las salas.

## Instalación

1. Clona los repositorios del backend y frontend:

   ```bash
   git clone https://github.com/tatisortiz/coworking.git
   git clone https://github.com/tatisortiz/coworking-front.git

2. Instala las dependencias en ambos proyectos.

En el backend:
   ```bash
cd coworking
npm install

En el frontend:
cd coworking-front
npm install

3.Configura las variables de entorno necesarias.

4.Inicia ambos servidores:

En el backend:

bash
Copiar código
npm start
En el frontend:

bash
Copiar código
npm start


