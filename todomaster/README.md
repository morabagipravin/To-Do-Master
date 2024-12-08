# Task Tracker App

This document provides an overview of the project structure, technologies used, and instructions for setting up and running the application.

## Project Overview

This project is a full-stack web application built with various technologies. The primary functionality includes a Task Tracker, supporting CRUD operations for tasks and authentication features.

- **Frontend**: Developed using React.js and CSS.
- **Backend**: Built with Node.js, utilizing Express.js for the web server.
- **Database**: MongoDB is used for storing task data.
- **CDN (Content Delivery Network)**: CloudFront is employed to deliver static assets efficiently.
- **Storage**: Amazon S3 is utilized to store the favicon image.
- **Reverse Proxy**: Nginx is used as a reverse proxy to manage requests to the frontend and backend.
- **Containerization**: The project is containerized using Docker, enabling consistent deployment across various environments..

## Project Structure

The project follows a microservices architecture, with separate services for the frontend (`web`), backend (`api`), and a MongoDB database (`db`). Docker is used for containerization to ensure consistent and reproducible deployments.

## Docker Usage

Docker is utilized in this project to containerize each service, ensuring a consistent and isolated environment across different development machines and deployment environments. The `docker-compose.yml` file defines the configuration for all services, orchestrating the setup of the application stack.

### Services

#### 1. Web (Frontend)

- **Technology**: React.js, Node.js
- **Build Path**: `./frontend`
- **Exposed Port**: 3000

#### 2. API (Backend)

- **Technology**: Node.js, Express.js
- **Build Path**: `./backend`
- **Exposed Port**: 8000

#### 3. Database (MongoDB)

- **Technology**: MongoDB
- **Image**: `mongo:latest`
- **Exposed Port**: 27017
- **Volume**: Persists data in the `mindler` volume.

#### 4. Nginx

- **Technology**: Nginx
- **Image**: `nginx:alpine`
- **Exposed Port**: 80
- **Configuration**: Uses `nginx.conf` for custom Nginx configuration.
- **Dependencies**: Depends on both `web` (frontend) and `api` (backend).

## Task Tracker Functionality

The Task Tracker application supports the following operations:

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Authentication**: Secure your tasks by authenticating users.


To run the application, simply execute the following command in the project directory:

```bash
docker-compose up 
```

This command builds the necessary Docker images, starts the containers, and sets up the entire application stack.
