package com.portalInmobiliario.poi_service.validator;

import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class PointOfInterestValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return PointOfInterest.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PointOfInterest poi = (PointOfInterest) target;

        if (poi.getName() == null || poi.getName().trim().isEmpty()) {
            errors.rejectValue("name", "El nombre es obligatorio");
        }
        if (poi.getCategory() == null || poi.getCategory().trim().isEmpty()) {
            errors.rejectValue("category", "La categoría es obligatoria");
        }
        if (poi.getAddress() == null || poi.getAddress().trim().isEmpty()) {
            errors.rejectValue("address", "La dirección es obligatoria");
        }

        if (poi.getLocation() == null) {
            errors.rejectValue("location", "La ubicación es obligatoria");
            return;
        }
        double longitude = poi.getLocation().getCoordinates().get(0);
        double latitude = poi.getLocation().getCoordinates().get(1);
        if (longitude == 0.0 && latitude == 0.0) {
            errors.rejectValue("location.coordinates", "field.invalid", "Las coordenadas no pueden ser (0.0, 0.0)");
        }

        if (!"Point".equalsIgnoreCase(poi.getLocation().getType())) {
            errors.rejectValue("location.type", "El tipo debe ser 'Point'");
        }
        if (poi.getLocation().getCoordinates() == null || poi.getLocation().getCoordinates().size() != 2) {
            errors.rejectValue("location.coordinates", "Debe proporcionar exactamente dos coordenadas");
        } else {
            double x = poi.getLocation().getCoordinates().get(0);
            double y = poi.getLocation().getCoordinates().get(1);
            if (x < -180 || x > 180) {
                errors.rejectValue("location.coordinates[0]", "La coordenada x debe estar entre -180 y 180");
            }
            if (y < -90 || y > 90) {
                errors.rejectValue("location.coordinates[1]", "La coordenada y debe estar entre -90 y 90");
            }
        }

    }
}
