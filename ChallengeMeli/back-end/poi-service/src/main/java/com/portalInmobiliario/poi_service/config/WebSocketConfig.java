package com.portalInmobiliario.poi_service.config;

import com.portalInmobiliario.poi_service.handler.POIWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.socket.server.WebSocketService;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.HandshakeWebSocketService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@Configuration
public class WebSocketConfig {

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter(webSocketService());
    }

    @Bean
    public WebSocketService webSocketService() {
        return new HandshakeWebSocketService();
    }

    @Bean
    public WebSocketHandler poiWebSocketHandler() {
        return new POIWebSocketHandler();
    }

    @Bean
    public CommandLineRunner commandLineRunner(@Qualifier("poiWebSocketHandler") WebSocketHandler handler) {
        return args -> {
            System.out.println("WebSocket handler initialized: " + handler);
        };
    }
}
