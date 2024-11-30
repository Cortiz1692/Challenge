package com.portalInmobiliario.poi_service;

import com.portalInmobiliario.poi_service.handler.GeospacialHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class RouterFunctionConfig {


    @Bean
    public RouterFunction<ServerResponse> routes(GeospacialHandler handler) {

        {
            return route(GET("/geospatial/pois-near-property"), handler::findPoisNearProperty)
                    .andRoute(GET("/geospatial/properties"), handler::list)
                    .andRoute(GET("/geospatial/categories"), handler::listPointsOfInterest)
                     .andRoute(POST("/create/newPois"), handler::create);

        }
    }
}

