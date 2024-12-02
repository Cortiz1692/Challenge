package com.portalInmobiliario.poi_service.models.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CacheService {

    @Autowired
    private ReactiveRedisTemplate<String, Object> reactiveRedisTemplate;



    public Mono<Object> getFromCache(String key) {
        return reactiveRedisTemplate.opsForValue().get(key);
    }

    public Mono<Boolean> saveToCache(String key, Object value) {
        return reactiveRedisTemplate.opsForValue().set(key, value);
    }

    public Mono<Boolean> deleteFromCache(String key) {
        return reactiveRedisTemplate.opsForValue().delete(key);
    }
}

