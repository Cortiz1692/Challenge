package com.portalInmobiliario.poi_service;

import com.portalInmobiliario.poi_service.models.documents.Coordinates;
import com.portalInmobiliario.poi_service.models.documents.PointOfInterest;
import com.portalInmobiliario.poi_service.models.documents.Property;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PoiServiceApplicationTests {

	@Autowired
	private WebTestClient client;

	@Test
	void listarPropertiesTest() {

		client.get()
				.uri("/geospatial/properties")
				.accept(MediaType.APPLICATION_JSON)
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.expectBodyList(Property.class)
				.consumeWith(response -> {
					List<Property> porperties =response.getResponseBody();
					porperties.forEach(p -> {
						System.out.println(p.getLocation());
					});
					Assertions.assertTrue(porperties.size() > 0);
				});

	}
	@Test
	void listarPointInterestTest() {

		client.get()
				.uri("/geospatial/categories")
				.accept(MediaType.APPLICATION_JSON)
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.expectBodyList(PointOfInterest.class)
				.consumeWith(response -> {
					List<PointOfInterest> poi =response.getResponseBody();
					poi.forEach(p -> {
						System.out.println(p.getLocation());
					});
					Assertions.assertTrue(poi.size() > 0);
				});

	}

	@Test
	void createPointOfInterestTest() {
		PointOfInterest poi = new PointOfInterest();
		poi.setName("Parque Central del Luna");
		poi.setCategory("Recreación");
		poi.setAddress("Avenida Central del Palma 789");
		poi.setLocation(new Coordinates("Point", List.of(-55.3900, -32.6200)));

		client.post()
				.uri("/create/newPois")
				.contentType(MediaType.APPLICATION_JSON)
				.body(BodyInserters.fromValue(poi))
				.exchange()
				.expectStatus().isCreated()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.expectBody(PointOfInterest.class)
				.consumeWith(response -> {
					PointOfInterest responseBody = response.getResponseBody();
					Assertions.assertNotNull(responseBody);
					Assertions.assertEquals("Parque Central del Luna", responseBody.getName());
					Assertions.assertEquals("Recreación", responseBody.getCategory());
					Assertions.assertEquals("Avenida Central del Palma 789", responseBody.getAddress());
					Assertions.assertNotNull(responseBody.getLocation());
					Assertions.assertEquals("Point", responseBody.getLocation().getType());
					Assertions.assertEquals(-55.3900, responseBody.getLocation().getCoordinates().get(0));
					Assertions.assertEquals(-32.6200, responseBody.getLocation().getCoordinates().get(1));
				});
	}

	@Test
	void createInvalidPointOfInterestTest() {
		PointOfInterest invalidPoi = new PointOfInterest();
		invalidPoi.setName(""); // Nombre vacío
		invalidPoi.setCategory(""); // Categoría vacía
		invalidPoi.setAddress(""); // Dirección vacía
		invalidPoi.setLocation(new Coordinates("Point", List.of(0.0, 0.0))); // Coordenadas inválidas

		client.post()
				.uri("/create/newPois")
				.contentType(MediaType.APPLICATION_JSON)
				.body(BodyInserters.fromValue(invalidPoi))
				.exchange()
				.expectStatus().isBadRequest()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.expectBodyList(String.class)
				.consumeWith(response -> {
					List<String> errors = response.getResponseBody();
					Assertions.assertNotNull(errors);
					Assertions.assertTrue(errors.size() > 0);
					errors.forEach(System.out::println);
				});
	}

	@Test
	void findPoisNearPropertyTest() {
		double latitude = -34.6118;
		double longitude = -58.4173;

		client.get()
				.uri(uriBuilder -> uriBuilder.path("/geospatial/pois-near-property")
						.queryParam("latitude", latitude)
						.queryParam("longitude", longitude)
						.build())
				.accept(MediaType.APPLICATION_JSON)
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.expectBodyList(PointOfInterest.class)
				.consumeWith(response -> {
					List<PointOfInterest> pois = response.getResponseBody();
					pois.forEach(poi -> {
						System.out.println(poi.getLocation());
					});
					Assertions.assertNotNull(pois);
					Assertions.assertTrue(pois.size() > 0);
				});
	}








}
