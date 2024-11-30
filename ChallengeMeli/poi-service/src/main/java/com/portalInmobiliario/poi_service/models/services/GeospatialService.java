package com.portalInmobiliario.poi_service.models.services;

import com.portalInmobiliario.poi_service.models.dao.PropertyRepository;
import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.dao.PointOfInterestRepository;
import com.portalInmobiliario.poi_service.models.documents.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GeospatialService implements IGeospacialService {
    @Autowired
    private PointOfInterestRepository pointOfInterestRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PointOfInterestRepository pointOfInterest;

    public Flux<PointOfInterest> findPoisNearProperty(double latitude, double longitude, double radiusInKilometers) {
        return pointOfInterestRepository.findPoisNearLocation(longitude, latitude, radiusInKilometers * 1000); // Converting km to meters
    }
    @Override
    public Flux<Property> findAll() {
        return propertyRepository.findAll();
    }

    @Override
    public Flux<PointOfInterest> findAllPointsOfInterest() {
        return pointOfInterest.findAll();
    }

    @Override
    public Mono<PointOfInterest> save(PointOfInterest pointOfInterest) {
        return pointOfInterestRepository.save(pointOfInterest); }
}