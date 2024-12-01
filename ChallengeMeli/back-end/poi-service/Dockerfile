FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/poi-service-0.0.1-SNAPSHOT.jar poi-service.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "poi-service.jar"]
