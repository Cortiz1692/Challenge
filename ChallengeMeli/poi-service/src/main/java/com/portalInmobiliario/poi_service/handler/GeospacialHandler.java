package com.portalInmobiliario.poi_service.handler;

import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.documents.Property;
import com.portalInmobiliario.poi_service.models.services.GeospatialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.validation.Validator;

import java.net.URI;


@Component
public class GeospacialHandler {

    @Autowired
    private GeospatialService geospatialService;
    @Autowired
    private Validator validator;

    public Mono<ServerResponse> findPoisNearProperty(ServerRequest request) {
        double latitude = Double.parseDouble(request.queryParam("latitude").orElse("0"));
        double longitude = Double.parseDouble(request.queryParam("longitude").orElse("0"));
        double radius = 2.0; // Radio de 2 km
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

    /*    public Mono<ServerResponse> create(ServerRequest request) {
            Mono<PointOfInterest> poiMono = request.bodyToMono(PointOfInterest.class);
            return poiMono.flatMap(poi -> {

                Errors errors = new BeanPropertyBindingResult(poi, PointOfInterest.class.getName());
                validator.validate(poi, errors);
                if (errors.hasErrors()) {
                    return Flux.fromIterable(errors.getFieldErrors()).map(fieldError -> "El campo " + fieldError.getField() + " " + fieldError.getDefaultMessage()).collectList().flatMap(list -> ServerResponse.badRequest().contentType(MediaType.APPLICATION_JSON).bodyValue(list));
                } else {
                    return geospatialService.save(poi).flatMap(savedPoi -> ServerResponse.created(URI.create("/geospatial/pois/".concat(savedPoi.getId()))).contentType(MediaType.APPLICATION_JSON).bodyValue(savedPoi));
                }
            });*/
    public Mono<ServerResponse> create(ServerRequest request) {
        Mono<PointOfInterest> poiMono = request.bodyToMono(PointOfInterest.class);
        return poiMono.flatMap(poi -> { // Crear un objeto Errors para almacenar los errores de validación
            Errors errors = new BeanPropertyBindingResult(poi, PointOfInterest.class.getName()); // Validar
            validator.validate(poi, errors);
            if (errors.hasErrors()) { // Manejar errores de validación
                return Flux.fromIterable(errors.getFieldErrors())
                        .map(fieldError -> "El campo " + fieldError.getField() + " " + fieldError.getDefaultMessage())
                        .collectList()
                        .flatMap(list -> ServerResponse.badRequest().contentType(MediaType.APPLICATION_JSON)
                                .bodyValue(list));
            } else { // Guardar el POI si no hay errores
                return geospatialService.save(poi).flatMap(savedPoi -> ServerResponse
                        .created(URI.create("/geospatial/pois/".concat(savedPoi.getId())))
                        .contentType(MediaType.APPLICATION_JSON).bodyValue(savedPoi));
            }
        });
    }
}
