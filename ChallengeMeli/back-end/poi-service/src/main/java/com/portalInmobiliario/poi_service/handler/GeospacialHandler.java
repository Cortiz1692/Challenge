package com.portalInmobiliario.poi_service.handler;

import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.documents.Property;
//import com.portalInmobiliario.poi_service.models.services.CacheService;
import com.portalInmobiliario.poi_service.models.services.GeospatialService;
import com.portalInmobiliario.poi_service.validator.PointOfInterestValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Map;

@Component
public class GeospacialHandler {

    private final GeospatialService geospatialService;
    private final PointOfInterestValidator pointOfInterestValidator;
    private final POIWebSocketHandler socketHandler;
  /*  private final CacheService cacheService;*/

    public GeospacialHandler(GeospatialService geospatialService,
                             PointOfInterestValidator pointOfInterestValidator,
                             POIWebSocketHandler socketHandler
                             ) {
        this.geospatialService = geospatialService;
        this.pointOfInterestValidator = pointOfInterestValidator;
        this.socketHandler = socketHandler;
      /*  this.cacheService = cacheService;*/
    }

    public Mono<ServerResponse> findPoisNearProperty(ServerRequest request) {
        double latitude = Double.parseDouble(request.queryParam("latitude").orElse("0"));
        double longitude = Double.parseDouble(request.queryParam("longitude").orElse("0"));
        double radius = 2.0;
        String cacheKey = "pois:" + latitude + ":" + longitude;

        String latitudeParam = request.queryParam("latitude").orElse(null);
        String longitudeParam = request.queryParam("longitude").orElse(null);

        if (latitudeParam == null || longitudeParam == null) {
            return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(Map.of("error", "Faltan parámetros de coordenadas (latitude y longitude)")));
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(Map.of("error", "Las coordenadas proporcionadas son inválidas")));
        }

    /*    return cacheService.getFromCache(cacheKey)
                .flatMap(cachedPois -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(cachedPois))
                .switchIfEmpty(
                        geospatialService.findPoisNearProperty(latitude, longitude, radius)
                                .collectList()
                                .flatMap(pois -> cacheService.saveToCache(cacheKey, pois)
                                        .then(ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(pois))
                                )
                );*/
        Flux<PointOfInterest> pois = geospatialService.findPoisNearProperty(latitude, longitude, radius);
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(pois, PointOfInterest.class);
    }

    public Mono<ServerResponse> listPointsOfInterest(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(geospatialService.findAllPointsOfInterest(), PointOfInterest.class);
    }

    public Mono<ServerResponse> list(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(geospatialService.findAll(), Property.class);
    }

    public Mono<ServerResponse> create(ServerRequest request) {
        Mono<PointOfInterest> poiMono = request.bodyToMono(PointOfInterest.class);

        return poiMono.flatMap(poi -> {
            Errors errors = new BeanPropertyBindingResult(poi, PointOfInterest.class.getName());
            pointOfInterestValidator.validate(poi, errors);

            if (errors.hasErrors()) {
                return Flux.fromIterable(errors.getFieldErrors())
                        .map(fieldError -> "El campo " + fieldError.getField() + " " + fieldError.getDefaultMessage())
                        .collectList()
                        .flatMap(list -> ServerResponse.badRequest()
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(BodyInserters.fromValue(list)));
            }

            return checkIfPoiExists(poi)
                    .flatMap(exists -> {
                        if (exists) {
                            return ServerResponse.status(HttpStatus.CONFLICT)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .body(BodyInserters.fromValue(Map.of("error", "El punto de interés ya existe")));
                        } else {
                            return geospatialService.save(poi)
                                    .flatMap(savedPoi -> {
                                        socketHandler.sendNewPOIMessage(savedPoi.getId()).subscribe();
                                        return ServerResponse.created(URI.create("/geospatial/pois/".concat(savedPoi.getId())))
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .body(BodyInserters.fromValue(savedPoi));
                                    });
                        }
                    });
        });
    }

    private Mono<Boolean> checkIfPoiExists(PointOfInterest poi) {
        return geospatialService.existsByNameAndLocation(poi.getName(), poi.getLocation());
    }
}
