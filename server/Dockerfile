# Stage 1: Build the application using Maven
FROM maven:3.8.8-eclipse-temurin-21 AS builder

# Set the working directory
WORKDIR /build

# Copy the Maven project files
COPY pom.xml ./
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests -q

# Stage 2: Run the application using a JRE
FROM eclipse-temurin:21-jre

# Set the working directory
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /build/target/*.jar /app/app.jar

# Expose the port the application runs on
EXPOSE 8081

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]