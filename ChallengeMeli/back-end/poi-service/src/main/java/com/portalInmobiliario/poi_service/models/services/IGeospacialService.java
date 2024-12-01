package com.portalInmobiliario.poi_service.models.services;

import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.documents.Property;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IGeospacialService {

    public Flux<Property> findAll();

    Flux <PointOfInterest> findAllPointsOfInterest();

    Mono<PointOfInterest> save(PointOfInterest pointOfInterest);
}
