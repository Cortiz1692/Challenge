
GeoLocation and Redis with MongoDB
This project implements a geolocation system using MongoDB to store points of interest and properties, and Redis to optimize geospatial queries. The application allows you to find points of interest near a specific property.

Table of Contents
Introduction

Project Structure

Requirements

Installation and Configuration

Technical Details

Usage

Maintenance and Contribution

FAQ

Introduction
This project aims to create a system that integrates geospatial data and caching to efficiently provide information about points of interest near given properties.

Project Structure
/src: Source code of the application

/docker-compose.yaml: Docker Compose configuration

/portalInmobiliario.propiedades.json: Property data

/portalInmobiliario.puntos_de_interes.json: Points of interest data

Requirements
Docker

Docker Compose

MongoDB

Redis

Java 11 or higher

Maven

Installation and Configuration
Clone the Repository
sh
git clone <REPOSITORY_URL>
cd <REPOSITORY_NAME>
Configure Docker Compose
Ensure your docker-compose.yaml looks like this:

yaml
version: '3.9'

services:
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:latest
    ports:
      - "6379:6379"

  app:
    image: poi-service:latest
    ports:
      - "8080:8080"
    depends_on:
      - mongo
      - redis
    environment:
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379

volumes:
  mongo-data:
Start the Services
sh
docker-compose up -d
Import Data into MongoDB
Copy the JSON files to the MongoDB container:

sh
docker cp portalInmobiliario.propiedades.json mongo:/portalInmobiliario.propiedades.json
docker cp portalInmobiliario.puntos_de_interes.json mongo:/portalInmobiliario.puntos_de_interes.json
Import the data into MongoDB:

sh
docker exec -it mongo mongosh --eval 'use portalInmobiliario; db.propiedades.insertMany(require("/portalInmobiliario.propiedades.json"));'
docker exec -it mongo mongosh --eval 'use portalInmobiliario; db.puntos_de_interes.insertMany(require("/portalInmobiliario.puntos_de_interes.json"));'
Configure the Application
Ensure application.properties is configured correctly:

properties
spring.redis.host=redis
spring.redis.port=6379
Run the Application
Start your application:

sh
mvn spring-boot:run
Technical Details
Architecture
Backend: Implemented with Spring Boot, MongoDB for storage, and Redis for caching.

Frontend: React application to interact with the backend.

Containers: Docker Compose for managing MongoDB, Redis, and the application.

Key Points
MongoDB: Used to store geospatial and property data.

Redis: Used to improve query performance.

Spring Boot: Main framework for the backend.

React: Framework for the frontend.

Repositories
PointOfInterestRepository: Repository for managing points of interest.

PropertyRepository: Repository for managing properties.

Usage
Querying Nearby Points of Interest
Make a GET request to the following endpoint:

GET http://localhost:8080/geospatial/pois-near-property?latitude=<LATITUDE>&longitude=<LONGITUDE>
Example Usage in React
javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [pois, setPois] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/geospatial/pois-near-property?latitude=-34.6155&longitude=-58.3847')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setPois(data))
      .catch(error => {
        console.error('Error fetching POIs:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Points of Interest</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {pois.map((poi, index) => (
          <li key={index}>{poi.name} - {poi.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
Maintenance and Contribution
Maintenance
Review dependencies regularly to keep them updated.

Check logs for MongoDB and Redis to ensure services are running smoothly.

Contribution
Fork the repository.

Create a new branch (feature/new-feature).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/new-feature).

Open a pull request.

FAQ
How can I change the port on which the application runs?
You can change the port in application.properties:

properties
server.port=8081
What should I do if Redis is not connecting?
Ensure the Redis container is running and check the configuration in application.properties:

properties
spring.redis.host=redis
spring.redis.port=6379
=======
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
   cd frontend
npm install
docker-compose up -d
docker exec -it mongo mongosh
se portalInmobiliaria




