[API Documentation](https://documenter.getpostman.com/view/14043657/2s9YC7SBJB#intro)

# User Management

This repository contains a Node.js, Express.js, TypeScript, Prisma, and PostgreSQL backend application for user management. This REST API allows you to perform various user management operations, such as user registration, authentication, profile management, and more.

The APIs are rate limited up to 100 requests per minute

The API also gracefully handles update conflicts when multiple requests attempt to modify the same resource simultaneously.

The passwords are store as hashed values in the database
