package com.portalInmobiliario.poi_service.models.dao;

import com.portalInmobiliario.poi_service.models.documents.Property;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface PropertyRepository extends ReactiveMongoRepository<Property, String>{

}