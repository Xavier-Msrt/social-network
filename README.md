# 🌐 Social Network Demo

A full-stack application simulating a small social network, developed to demonstrate proficiency in **Angular** (Frontend) and **Spring Boot** (Backend) within a containerized environment.

---

## 🎯 Project Goal

The primary goal of this project was to acquire and demonstrate **practical mastery** of modern web development technologies and the **Full Stack architecture**, focusing on:

* Developing a reactive and scalable user interface using the **Angular** framework.
* Building a robust, RESTful API and implementing business logic with **Spring Boot** (Java).
* Gaining experience with **Docker** and **Docker Compose** for seamless environment setup and deployment.

## ✨ Features

The application provides the core functionalities of a minimal social platform:

* **Posting:** Users can create and submit new text-based posts.
* **Feed View:** Users can view a chronological feed of posts published by others.

---

## 🏗️ Architecture

The project follows a standard **Monorepo** structure and is divided into two main services communicating via a RESTful API:

| Component | Technology | Role | Location |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Angular** (TypeScript) | User Interface (UI), manages client-side routing and communicates with the API. | `frontend/` |
| **Backend** | **Spring Boot** (Java) | Provides the **RESTful API**, handles business logic, and interacts with the database. | `backend/` |
| **Orchestration** | **Docker Compose** | Defines and runs the multi-container application (Frontend, Backend, Database). | Root Directory |

---

## 🚀 Getting Started

The entire environment is set up for easy deployment using Docker Compose.

### Prerequisites

* **Docker**
* **Docker Compose** (usually included with modern Docker installations)

### 1. Run the Application (Recommended)

Navigate to the root directory of the project (where this `README.md` and `docker-compose.yml` are located) and run the following command:

```bash
docker-compose up --build