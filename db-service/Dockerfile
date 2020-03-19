FROM openjdk:8
RUN mkdir db-service
RUN apt-get update
RUN apt-get install -y maven
COPY . /db-service
WORKDIR /db-service
RUN mvn package
EXPOSE 8300
CMD ["java","-jar","target/db-service-0.0.1-SNAPSHOT.jar"]
