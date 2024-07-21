# RegionMaster

## Overview

The RegionMaster provides endpoints for managing regions and handling administrative tasks. It includes functionality for admin registration, login, and region management. The API uses JWT for authentication and supports role-based access.

## Authentication

The API uses JWT (JSON Web Tokens) for securing endpoints. Admins must be authenticated to access protected routes.

## Endpoints

### Admin Endpoints

#### 1. Register a New Admin

- **Endpoint:** `POST /admin/register`
- **Description:** Registers a new admin.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "admin" | "moderator"
  }
  ```
- **Responses:**
  - **200 OK**
    ```json
    {
      "status_code": 200,
      "message": "Admin registered successfully"
    }
    ```
  - **422 Unprocessable Entity**
    ```json
    {
      "status_code": 422,
      "data": [
        { "message": "Username is required", "field": "username" },
        { "message": "Email is required", "field": "email" },
        { "message": "Password is required", "field": "password" },
        { "message": "Role must be either admin or moderator", "field": "role" }
      ]
    }
    ```

#### 2. Admin Login

- **Endpoint:** `POST /admin/login`
- **Description:** Logs an admin in and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - **200 OK**
    ```json
    {
      "message": "Login successful",
      "access_token": "string"
    }
    ```
  - **422 Unprocessable Entity**
    ```json
    {
      "status_code": 422,
      "data": [
        { "message": "Email is required", "field": "email" },
        { "message": "Password is required", "field": "password" }
      ]
    }
    ```
  - **404 Not Found**
    ```json
    {
      "message": "Admin not found"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Region Endpoints

#### 1. Retrieve All Regions

- **Endpoint:** `GET /v1/api/regions`
- **Description:** Retrieves all regions.
- **Responses:**
  - **200 OK**
    ```json
    [
      {
        "RegionCode": "string",
        "RegionName": "string",
        "Status": "active" | "inactive",
        "CreatedOn": "string",
        "CreatedBy": "string",
        "ModifiedOn": "string",
        "ModifiedBy": "string"
      }
    ]
    ```
  - **404 Not Found**
    ```json
    {
      "status_code": 404,
      "message": "No regions found"
    }
    ```

#### 2. Create a New Region

- **Endpoint:** `POST /v1/api/regions`
- **Description:** Creates a new region.
- **Request Body:**
  ```json
  {
    "RegionCode": "string",
    "RegionName": "string",
    "Status": "active" | "inactive"
  }
  ```
- **Responses:**
  - **200 OK**
    ```json
    {
      "status_code": 200,
      "message": "Operation was successful"
    }
    ```
  - **422 Unprocessable Entity**
    ```json
    {
      "status_code": 422,
      "data": [
        { "message": "Region code is required", "field": "RegionCode" },
        { "message": "Region name is required", "field": "RegionName" },
        { "message": "Status is required", "field": "Status" }
      ]
    }
    ```

#### 3. Update an Existing Region

- **Endpoint:** `PUT /v1/api/regions/:RegionCode`
- **Description:** Updates an existing region.
- **Request Parameters:**
  - `RegionCode`: The code of the region to update.
- **Request Body:**
  ```json
  {
    "RegionName": "string",
    "Status": "active" | "inactive"
  }
  ```
- **Responses:**
  - **200 OK**
    ```json
    {
      "status_code": 200,
      "message": "Operation was successful"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "status_code": 404,
      "message": "Region with code NA not found"
    }
    ```
  - **422 Unprocessable Entity**
    ```json
    {
      "status_code": 422,
      "data": [
        {
          "message": "Status must be either 'active' or 'inactive'",
          "field": "Status"
        },
        { "message": "Region name already exists", "field": "RegionName" }
      ]
    }
    ```

#### 4. Delete a Region

- **Endpoint:** `DELETE /v1/api/regions/:RegionCode`
- **Description:** Deletes a region.
- **Request Parameters:**
  - `RegionCode`: The code of the region to delete.
- **Responses:**
  - **200 OK**
    ```json
    {
      "status_code": 200,
      "message": "Operation was successful"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "status_code": 404,
      "message": "Region with code NA not found"
    }
    ```

## Authentication

- **Token Type:** Bearer Token
- **Token Required:** Yes
- **Header:** `Authorization: Bearer <token>`

## Error Handling

The API uses HTTP status codes and JSON responses to indicate the result of requests and any errors that may occur.
