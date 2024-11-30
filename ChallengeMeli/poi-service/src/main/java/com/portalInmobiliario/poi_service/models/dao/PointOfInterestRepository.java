package com.portalInmobiliario.poi_service.models.dao;

import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface PointOfInterestRepository extends ReactiveMongoRepository<PointOfInterest, String> {
    @Query("{ 'location': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] }, $maxDistance: ?2 } } }")
    Flux<PointOfInterest> findPoisNearLocation(double longitude, double latitude, double maxDistance);
}
