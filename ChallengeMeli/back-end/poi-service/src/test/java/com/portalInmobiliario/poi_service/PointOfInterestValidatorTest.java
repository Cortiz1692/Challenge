package com.portalInmobiliario.poi_service;

import com.portalInmobiliario.poi_service.models.documents.Coordinates;
import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.validator.PointOfInterestValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

import java.util.List;

import static org.junit.Assert.*;

public class PointOfInterestValidatorTest {
    private PointOfInterestValidator validator;
    private PointOfInterest poi;
    @BeforeEach void setUp() {
        validator = new PointOfInterestValidator();
        poi = new PointOfInterest();
    }

    @Test void supports() {
        assertTrue(validator.supports(PointOfInterest.class));
    }

    @Test void validateValidPoi() {
        poi.setName("Valid Name");
        poi.setCategory("Valid Category");
        poi.setAddress("Valid Address");
        poi.setLocation(new Coordinates("Point", List.of(-58.3900, -34.6200)));
        Errors errors = new BeanPropertyBindingResult(poi, "pointOfInterest");
        validator.validate(poi, errors); assertFalse(errors.hasErrors()); }


    @Test void validateInvalidPoi() {
        poi.setName("");
        poi.setCategory("");
        poi.setAddress("");
        poi.setLocation(new Coordinates("Point", List.of(0.0, 0.0)));
        Errors errors = new BeanPropertyBindingResult(poi, "pointOfInterest");
        validator.validate(poi, errors);
        assertTrue(errors.hasErrors()); assertEquals(4, errors.getErrorCount());
    }


    @Test void validateNullLocation() {
        poi.setName("Valid Name");
        poi.setCategory("Valid Category");
        poi.setAddress("Valid Address");
        poi.setLocation(null);

        Errors errors = new BeanPropertyBindingResult(poi, "pointOfInterest");
        validator.validate(poi, errors);
        assertTrue(errors.hasErrors());
        assertEquals(1, errors.getErrorCount());
    }
}
