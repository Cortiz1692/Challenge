package com.portalInmobiliario.poi_service.models.services;

import com.portalInmobiliario.poi_service.models.dao.PropertyRepository;
import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.dao.PointOfInterestRepository;
import com.portalInmobiliario.poi_service.models.documents.Property;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.portalInmobiliario.poi_service.models.documents.Coordinates;


@Service
public class GeospatialService implements IGeospacialService {


    private final PointOfInterestRepository pointOfInterestRepository;
    private final PropertyRepository propertyRepository;
    private final PointOfInterestRepository pointOfInterest;


    public GeospatialService(PointOfInterestRepository pointOfInterestRepository,
                         PropertyRepository propertyRepository,
                         PointOfInterestRepository pointOfInterest) {
        this.pointOfInterestRepository = pointOfInterestRepository;
        this.propertyRepository = propertyRepository;
        this.pointOfInterest = pointOfInterest;
    }

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
    public Mono<Boolean> existsByNameAndLocation(String name, Coordinates location) {
        return pointOfInterest.existsByNameAndLocation(name, location);
    }
    @Override
    public Mono<PointOfInterest> save(PointOfInterest pointOfInterest) {
        return pointOfInterestRepository.save(pointOfInterest); }
}