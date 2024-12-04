export const calculateTime = (distance) => {
    const averageWalkingSpeedKmH = 5; 
    const timeInHours = distance / 1000 / averageWalkingSpeedKmH; 
    const timeInMinutes = timeInHours * 60;
    return timeInMinutes;
  };
  