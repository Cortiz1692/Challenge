package com.portalInmobiliario.poi_service.handler;


import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class POIWebSocketHandler implements WebSocketHandler {

    private final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.put(session.getId(), session);

        return session.receive()
                .doOnTerminate(() -> sessions.remove(session.getId()))
                .then();
    }

    public Mono<Void> sendNewPOIMessage(String poiId) {
        String message = String.format("{\"message\": \"New POI Created\", \"poiId\": \"%s\"}", poiId);
        return Flux.fromIterable(sessions.values())
                .flatMap(webSocketSession -> webSocketSession.send(Mono.just(webSocketSession.textMessage(message))))
                .then().doOnError(e -> {
                    e.printStackTrace();
                });
    };
}



