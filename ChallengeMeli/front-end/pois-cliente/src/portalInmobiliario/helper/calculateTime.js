export const calculateTime = (distance) => {
    const averageWalkingSpeedKmH = 5; // Velocidad promedio de caminata en km/h
    const timeInHours = distance / 1000 / averageWalkingSpeedKmH; // Convertir metros a kilómetros y dividir por la velocidad
    const timeInMinutes = timeInHours * 60; // Convertir horas a minutos
    return timeInMinutes;
  };
  