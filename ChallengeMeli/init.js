db = db.getSiblingDB('portalInmobiliario');

// Crear colección propiedades
db.createCollection('propiedades');
db.propiedades.insertMany([
  {
    "address": "Calle Principal 123",
    "city": "Buenos Aires",
    "state": "CABA",
    "postalCode": "1001",
    "location": {
      "type": "Point",
      "coordinates": [-58.4173, -34.6118]  // Longitud, Latitud
    }
  },
  {
    "address": "Calle Secundaria 456",
    "city": "Buenos Aires",
    "state": "CABA",
    "postalCode": "1002",
    "location": {
      "type": "Point",
      "coordinates": [-58.3847, -34.6155]  // Longitud, Latitud
    }
  }
]);

// Crear colección puntos_de_interes
db.createCollection('puntos_de_interes');
db.puntos_de_interes.insertMany([
  {
    "name": "Escuela A",
    "category": "Educación",
    "address": "Calle Tercera 789",
    "location": {
      "type": "Point",
      "coordinates": [-58.3923, -34.6123]  // Longitud, Latitud
    }
  },
  {
    "name": "Hospital B",
    "category": "Salud",
    "address": "Calle Cuarta 321",
    "location": {
      "type": "Point",
      "coordinates": [-58.3845, -34.6170]  // Longitud, Latitud
    }
  }
]);
