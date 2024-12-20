package com.portalInmobiliario.poi_service.models.documents;

import java.util.List;

public class Coordinates {
    private String type;
    private List<Double> coordinates;

    public Coordinates() {}

    public Coordinates(String type, List<Double> coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }
}
