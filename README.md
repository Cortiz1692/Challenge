# Desafío de Mercado

Este proyecto implementa un sistema de alta capacidad de respuesta para un portal inmobiliario utilizando una arquitectura orientada a microservicios. La solución está diseñada para manejar picos de tráfico y consultas geoespaciales de manera eficiente, proporcionando una experiencia de usuario fluida y en tiempo real.

---

## Solución Propuesta

La solución se basa en una **Arquitectura Orientada a Microservicios**, lo que permite flexibilidad, escalabilidad y un manejo eficiente de las demandas del sistema.

### Características Clave

1. **Alta Capacidad de Respuesta**  
   - Los microservicios garantizan respuestas rápidas a las solicitudes de los usuarios, mejorando la experiencia general.

2. **Escalabilidad**  
   - Cada microservicio puede escalarse de manera independiente según la demanda, asegurando que el sistema pueda manejar picos de tráfico sin degradar el rendimiento.

3. **Manejo de Concurrencia**  
   - Tecnologías como **Redis** para el caché y **MongoDB** para el almacenamiento permiten manejar eficientemente consultas geoespaciales y solicitudes concurrentes.

4. **Comunicación en Tiempo Real**  
   - Implementación de **WebSockets** para actualizar dinámicamente la información de los puntos de interés (POIs), ofreciendo una experiencia de usuario enriquecida.

5. **Frontend Modular y Escalable**  
   - Desarrollado en **React** siguiendo un enfoque basado en componentes, asegurando modularidad, reutilización de código y facilidad de mantenimiento.

---

## Componentes Principales

1. **Frontend (React)**  
   - Administra la experiencia del usuario, las vistas y las solicitudes hacia los servicios backend.

2. **Microservicios**  
   - **Microservicio de Propiedades**: Maneja la lógica relacionada con las propiedades.  
   - **Microservicio de POIs**: Administra la información de los puntos de interés.

3. **Base de Datos (MongoDB)**  
   - Utiliza índices **2dsphere** para optimizar consultas geoespaciales y almacenar datos estructurados de propiedades y POIs.

4. **Sistema de Cache (Redis)**  
   - Reduce la carga sobre la base de datos principal y mejora significativamente el rendimiento de las consultas frecuentes.

---

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- **Node.js** (v16 o superior)
- **Docker** (opcional, para levantar servicios en contenedores)
- **MongoDB** y **Redis** instalados o disponibles como servicios.

### Instalación

1. Clona el repositorio y organiza los archivos:  
   ```bash
   git clone <repositorio>
   cd <nombre-del-proyecto>
   npm install
docker-compose up -d
docker exec -it mongo mongosh
se portalInmobiliaria
