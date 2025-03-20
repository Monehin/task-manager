# Task Manager API & Frontend

[![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)](https://task-manager.monehin.com)
[![Backend](https://img.shields.io/badge/Backend-GraphQL%20%2B%20Rails-red)](https://task-manager-graphql.monehin.com/graphql)

## Live Demo

- **Frontend:** [task-manager.monehin.com](https://task-manager.monehin.com)
- **Backend API:** [task-manager-graphql.monehin.com/graphql](https://task-manager-graphql.monehin.com/graphql)

> The frontend is fully connected to the backend API and demonstrates real-time data fetching via GraphQL.

---

## Overview

A full-stack task management application built for the **Senior React Full-Stack Engineer Challenge**.

### Tech Stack

- **Backend:** Ruby on Rails 8 (API-only), GraphQL, MySQL
- **Frontend:** React, Apollo Client

The focus was on designing a clean GraphQL API, ensuring production readiness, and demonstrating a straightforward deployment pipeline.

---

## Key Technologies

### Backend

- **Ruby on Rails 8** (API-only)
- **GraphQL** (via `graphql-ruby`)
- **MySQL**
- **Docker + Docker Compose** for local development and production parity
- **Devcontainer** setup to ensure consistent development environment

### Frontend

- **ReactJS**
- **Apollo Client** for GraphQL queries/mutations
- **Tailwind CSS** for styling and responsive design

---

## Approach & Decisions

### Backend Implementation

- Generated minimal Rails app with:

  ```bash
  rails new task_manager_api --api -d mysql --skip-action-mailbox --skip-action-mailer --skip-jbuilder
  ```
- Used Docker Compose to run both Rails and MySQL with readiness checks
- GraphQL schema configured and GraphiQL for development only

---

## Local Development Setup

### Requirements

- Docker & Docker Compose
- VS Code with devcontainer support

### Setup Steps

```bash
git clone <your-repo-url>
cd <repo-folder>
docker-compose up --build
```

**Access Points:**

- Backend GraphiQL: http://localhost/graphiql
- Frontend: http://localhost:3001

---

## Deployment Strategy

### Backend Deployment

- Deployed to Hetzner VPS via Github actions and Kamal
- GitHub Actions workflow to SSH into the server and Kamal deploy automatically

### Frontend Deployment

- Deployed to Vercel connected to backend endpoint

## Future Improvements

- Add authentication (JWT/OAuth)
- Add pagination and advanced filtering in GraphQL
- Add CI for test coverage on PRs

---

## Conclusion

This project showcases backend and API design, clean frontend integration, containerized setup, and deployment automation.

Thank you for reviewing this solution!
