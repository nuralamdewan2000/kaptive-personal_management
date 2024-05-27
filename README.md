# Personal Financial Management System

Personal Financial Management System API allows users to register, authenticate, and manage their financial transactions, categorized as income or expenses. Each user can create custom categories unique to their account, log their transactions, and generate detailed monthly reports.

## Table of Contents
- [Live Demo](#live-demo)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)

## Live Demo
Explore the live demo on [render.com](https://render.com): [Personal Finance Tracker](https://personal-financial-management-system.onrender.com/)

## Technology Stack
The backend of this application utilizes the following technologies:

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Web framework for creating robust APIs quickly.
- **JSON Web Token (JWT)**: For secure authentication of users.
- **Prisma**: ORM for database interactions, migrations, and modeling.

## API Documentation

### User Operations

- **Register User**
  - **Endpoint**: `/user/register`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "johndoe123"
    }
    ```
  - **Response**:
    ```json
    { "message": "You've been registered successfully!" }
    ```

- **User Login**
  - **Endpoint**: `/user/login`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "johndoe123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User successfully logged in!",
      "accessToken": "jwt_token"
    }
    ```

### Category Operations

**Note**: The following endpoints require a valid JWT token in the request headers for authentication.

- **Create a Category**
  - **Endpoint**: `/category`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "sample category",
      "description": "optional description"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Successfully created new category",
      "category": {
        "id": "category_id",
        "name": "sample category",
        "userId": "user_id",
        "description": "optional description",
        "createdAt": "creation_date"
      }
    }
    ```

- **List User Categories**
  - **Endpoint**: `/category`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "categories": [
        // array of categories
      ]
    }
    ```

- **Get Category Details**
  - **Endpoint**: `/category/:id`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "category": {
        "id": ":id",
        "name": "sample category",
        "userId": "user_id",
        "description": "optional description",
        "createdAt": "creation_date"
      }
    }
    ```

- **Update a Category**
  - **Endpoint**: `/category/:id`
  - **Method**: `PUT` or `PATCH`
  - **Request Body**:
    ```json
    {
      "name": "sample category",
      "description": "optional description"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Category updated successfully!",
      "category": {
        "id": "category_id",
        "name": "sample category",
        "userId": "user_id",
        "description": "optional description",
        "createdAt": "creation_date"
      }
    }
    ```

- **Delete a Category**
  - **Endpoint**: `/category/:id`
  - **Method**: `DELETE`
  - **Response**:
    ```json
    { "message": "Category deleted successfully!" }
    ```

- **Get Transactions by Category**
  - **Endpoint**: `/category/type/:category`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "transactions": [
        // array of transactions for the specified category
      ]
    }
    ```

### Transaction Operations

- **Add a Transaction**
  - **Endpoint**: `/transactions`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "category": "category name",
      "type": "income or expense",
      "amount": "amount in float",
      "description": "optional description"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Successfully created new transaction",
      "transaction": {
        "id": "transaction_id",
        "userId": "user_id",
        "categoryId": "category_id",
        "type": "income or expense",
        "amount": "amount in float",
        "date": "transaction_date",
        "description": "optional description"
      }
    }
    ```

- **List All Transactions**
  - **Endpoint**: `/transactions`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "message": "Found all the transactions",
      "transactions": [
        // array of transactions
      ]
    }
    ```

- **Get Transaction Details**
  - **Endpoint**: `/transactions/:id`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "transaction": {
        "id": "transaction_id",
        "userId": "user_id",
        "categoryId": "category_id",
        "type": "income or expense",
        "amount": "amount in float",
        "date": "transaction_date",
        "description": "optional description"
      }
    }
    ```

- **Update a Transaction**
  - **Endpoint**: `/transactions/:id`
  - **Method**: `PUT` or `PATCH`
  - **Request Body**:
    ```json
    {
      "category": "category name",
      "type": "income or expense",
      "amount": "amount in float",
      "description": "optional description"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Transaction updated successfully!",
      "transaction": {
        "id": "transaction_id",
        "userId": "user_id",
        "categoryId": "category_id",
        "type": "income or expense",
        "amount": "amount in float",
        "date": "transaction_date",
        "description": "optional description"
      }
    }
    ```

- **Delete a Transaction**
  - **Endpoint**: `/transactions/:id`
  - **Method**: `DELETE`
  - **Response**:
    ```json
    { "message": "Transaction deleted successfully!" }
    ```

### Reporting Operations

- **Monthly Report by Type**
  - **Endpoint**: `/monthly-report/type/:type`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "transactions": [
        // transactions of the specified type
      ]
    }
    ```

- **Monthly Report by Category**
  - **Endpoint**: `/monthly-report/category/:category`
  - **Method**: `GET`
  - **Response**:
    ```json
    {
      "transactions": [
        // transactions of the specified category
      ]
    }
    ```

- **Detailed Monthly Report**
  - **Endpoint**: `/monthly-report/all-report`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "type": "income or expense",
      "category": "user-defined category"
    }
    ```
  - **Response**:
    ```json
    {
      "report": {
        "transactionTypeReport": [
          // transactions of the specified type
        ],
        "transactionCategoryReport": [
          // transactions of the specified category
        ]
      }
    }
    ```

This documentation provides a comprehensive overview of the Personal Finance Tracker API, designed to help users manage and track their financial activities efficiently through a structured RESTful API.
