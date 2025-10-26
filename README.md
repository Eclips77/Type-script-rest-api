# 🎬 Video Content API

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A robust and production-ready REST API for managing a video content library. This project is built with TypeScript and Express.js, featuring a JSON file-based database, powerful validation with Zod, and advanced filtering capabilities.

### ✨ Key Features

-   **Full CRUD Operations**: Create, Read, Update, and Delete video entries.
-   **Advanced Filtering**: Smart search capabilities for exact matches, numeric/date ranges, and array-based filtering.
-   **Schema Validation**: Type-safe validation for all incoming data powered by Zod.
-   **TypeScript Strict Mode**: A clean, maintainable, and robust codebase.
-   **Centralized Error Handling**: Consistent and predictable error responses.
-   **RESTful Architecture**: Follows industry best practices for API design.

---

## 📚 Table of Contents

-   [Features](#-features)
-   [Tech Stack](#-tech-stack)
-   [Prerequisites](#-prerequisites)
-   [Installation](#-installation)
-   [Project Structure](#-project-structure)
-   [Configuration](#-configuration)
-   [Running the Application](#-running-the-application)
-   [API Documentation](#-api-documentation)
-   [Filtering & Search](#-filtering--search)
-   [Data Model](#-data-model)
-   [Error Handling](#-error-handling)
-   [Development](#-development)
-   [Testing](#-testing)
-   [Contributing](#-contributing)
-   [License](#-license)
-   [Contact](#-contact)

---

## 🌟 Features

-   **Smart Filtering**:
    -   **Exact Match**: Filter by `creator` and `language`.
    -   **Range Filtering**: Filter by `minDuration`, `maxDuration`, `startDate`, and `endDate`.
    -   **Array-Based Filtering**: Filter by `targetAudience` using one or more values.
-   **TypeScript Integration**: Written entirely in TypeScript with strict mode enabled for high-quality code.
-   **Zod Schemas**: All data models and request validations are defined and enforced using Zod, with TypeScript types inferred directly from schemas.
-   **Async Error Handling**: Uses a global error handler and an `asyncHandler` wrapper to eliminate `try-catch` blocks in controllers.
-   **Modular & Scalable**: A clean service-oriented architecture that is easy to extend.

---

## 🛠️ Tech Stack

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **TypeScript**: Superset of JavaScript that adds static typing.
-   **Zod**: TypeScript-first schema declaration and validation library.
-   **UUID**: For generating unique identifiers.
-   **ts-node & nodemon**: For development workflow and live reloading.

---

## ✅ Prerequisites

-   **Node.js**: `v18.x` or later.
-   **npm**: `v9.x` or later (or yarn).

---

## 🚀 Installation

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Initial Database Setup:**
    The application will automatically create the `data/videos.json` file on first run if it doesn't exist.

---

## 📂 Project Structure

The project follows a modular structure to keep the code organized and maintainable.

```
project/
├── src/
│ ├── schemas/
│ │ └── video.schema.ts
│ ├── types/
│ │ └── video.types.ts
│ ├── services/
│ │ ├── video.service.ts
│ │ └── filter.service.ts
│ ├── controllers/
│ │ └── video.controller.ts
│ ├── routes/
│ │ └── video.routes.ts
│ ├── middleware/
│ │ ├── validation.middleware.ts
│ │ └── errorHandler.middleware.ts
│ ├── utils/
│ │ ├── database.util.ts
│ │ └── errors.util.ts
│ └── app.ts
├── data/
│ └── videos.json
├── tsconfig.json
└── package.json
```

-   `src/schemas`: Contains Zod schemas for data validation.
-   `src/types`: Holds shared TypeScript types and interfaces.
-   `src/services`: Business logic and data manipulation.
-   `src/controllers`: Handles incoming requests and sends responses.
-   `src/routes`: Defines the API endpoints and connects them to controllers.
-   `src/middleware`: Custom middleware for validation and error handling.
-   `src/utils`: Utility functions for database interaction and error classes.
-   `data/`: Stores the `videos.json` database file.

---

## ⚙️ Configuration

-   **Port**: The application runs on port `3000` by default, as defined in `src/app.ts`.
-   **Database**: The JSON database is located at `data/videos.json`.

---

## ▶️ Running the Application

The project includes scripts for both development and production.

-   **Development Mode**:
    Starts the server with `nodemon` for live reloading on file changes.
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    Starts the server with `ts-node`.
    ```bash
    npm run start
    ```

### Available Scripts

-   `npm run start`: Starts the application.
-   `npm run dev`: Starts the application in development mode.
-   `npm test`: (Placeholder) "Error: no test specified"

---

## 📖 API Documentation

**Base URL**: `http://localhost:3000`

### Endpoints

| Method   | Path                  | Description                                |
| :------- | :-------------------- | :----------------------------------------- |
| `GET`    | `/api/videos`         | Get all videos with optional filtering.    |
| `GET`    | `/api/videos/:id`     | Get a single video by its ID.              |
| `POST`   | `/api/videos`         | Create a new video.                        |
| `PUT`    | `/api/videos/:id`     | Update an existing video.                  |
| `DELETE` | `/api/videos/:id`     | Delete a video by its ID.                  |

---

### 1. Get All Videos

-   **Method**: `GET`
-   **Path**: `/api/videos`
-   **Description**: Retrieves a list of all videos. Supports filtering via query parameters.
-   **Query Parameters**: See the [Filtering & Search](#-filtering--search) section for details.
-   **Success Response (200 OK)**:
    ```json
    [
      {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "title": "Introduction to TypeScript",
        "creator": "John Doe",
        "duration": 1800000,
        "uploadTime": "2024-10-26T10:00:00.000Z",
        "description": "A comprehensive guide to TypeScript.",
        "targetAudience": "teens",
        "language": "en"
      }
    ]
    ```

### 2. Get Video by ID

-   **Method**: `GET`
-   **Path**: `/api/videos/:id`
-   **Description**: Retrieves a single video by its unique ID.
-   **Success Response (200 OK)**:
    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "title": "Introduction to TypeScript",
      "creator": "John Doe",
      "duration": 1800000,
      "uploadTime": "2024-10-26T10:00:00.000Z",
      "description": "A comprehensive guide to TypeScript.",
      "targetAudience": "teens",
      "language": "en"
    }
    ```
-   **Error Response (404 Not Found)**:
    ```json
    {
      "message": "Video not found"
    }
    ```

### 3. Create a New Video

-   **Method**: `POST`
-   **Path**: `/api/videos`
-   **Description**: Adds a new video to the database. `id` and `uploadTime` are auto-generated.
-   **Request Body**:
    ```json
    {
      "title": "Advanced Node.js",
      "creator": "Jane Smith",
      "duration": 3600000,
      "description": "Deep dive into Node.js concepts.",
      "targetAudience": "adults",
      "language": "en"
    }
    ```
-   **Success Response (201 Created)**:
    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
      "title": "Advanced Node.js",
      "creator": "Jane Smith",
      "duration": 3600000,
      "uploadTime": "2024-10-26T11:00:00.000Z",
      "description": "Deep dive into Node.js concepts.",
      "targetAudience": "adults",
      "language": "en"
    }
    ```

### 4. Update a Video

-   **Method**: `PUT`
-   **Path**: `/api/videos/:id`
-   **Description**: Updates an existing video's details. All fields are optional.
-   **Request Body**:
    ```json
    {
      "title": "Advanced Node.js & Express",
      "duration": 3700000
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
      "title": "Advanced Node.js & Express",
      "creator": "Jane Smith",
      "duration": 3700000,
      "uploadTime": "2024-10-26T11:00:00.000Z",
      "description": "Deep dive into Node.js concepts.",
      "targetAudience": "adults",
      "language": "en"
    }
    ```

### 5. Delete a Video

-   **Method**: `DELETE`
-   **Path**: `/api/videos/:id`
-   **Description**: Removes a video from the database.
-   **Success Response**: `204 No Content`

---

## 🔍 Filtering & Search

The `GET /api/videos` endpoint supports the following query parameters for filtering:

| Parameter        | Type     | Description                                               | Example                                     |
| :--------------- | :------- | :-------------------------------------------------------- | :------------------------------------------ |
| `creator`        | `string` | Exact match for the video creator.                        | `?creator=John Doe`                         |
| `language`       | `string` | Exact match for the video language (ISO 639-1).           | `?language=en`                              |
| `minDuration`    | `number` | Minimum video duration in milliseconds.                   | `?minDuration=600000`                       |
| `maxDuration`    | `number` | Maximum video duration in milliseconds.                   | `?maxDuration=1800000`                      |
| `startDate`      | `string` | Videos uploaded on or after this date (ISO 8601).         | `?startDate=2024-01-01`                     |
| `endDate`        | `string` | Videos uploaded on or before this date (ISO 8601).        | `?endDate=2024-12-31`                       |
| `targetAudience` | `string` | One or more target audiences. Matches any of the provided values. | `?targetAudience=children&targetAudience=teens` |

#### Combined Filter Example

To find all English videos for teens created by "John Doe" with a duration between 10 and 30 minutes:
```
/api/videos?language=en&creator=John%20Doe&minDuration=600000&maxDuration=1800000&targetAudience=teens
```

---

## 📋 Data Model

The `Video` entity has the following structure:

| Field            | Type     | Description                                                 | Validation Rules      |
| :--------------- | :------- | :---------------------------------------------------------- | :-------------------- |
| `id`             | `string` | Auto-generated unique identifier (UUID).                    | UUID format           |
| `title`          | `string` | The title of the video.                                     | Required              |
| `creator`        | `string` | The name of the video creator.                              | Required              |
| `duration`       | `number` | The duration of the video in milliseconds.                  | Required, positive    |
| `uploadTime`     | `Date`   | Auto-generated timestamp of when the video was created.     | ISO 8601 Date         |
| `description`    | `string` | A brief description of the video content.                   | Required              |
| `targetAudience` | `string` | The intended audience. Must be one of `children`, `teens`, `adults`. | Enum, Required |
| `language`       | `string` | The language of the video (ISO 639-1 two-letter code).      | 2 characters, Required |

#### Example Video Object

```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Introduction to TypeScript",
  "creator": "John Doe",
  "duration": 1800000,
  "uploadTime": "2024-10-26T10:00:00.000Z",
  "description": "A comprehensive guide to TypeScript.",
  "targetAudience": "teens",
  "language": "en"
}
```

---

## 🚨 Error Handling

The API uses a standardized error response format.

| Status Code | Meaning             | Description                                                  |
| :---------- | :------------------ | :----------------------------------------------------------- |
| `400`       | `Bad Request`       | The request was malformed, often due to validation errors.   |
| `404`       | `Not Found`         | The requested resource (e.g., a specific video) could not be found. |
| `500`       | `Internal Server Error` | An unexpected error occurred on the server.                |

#### Example Validation Error (400 Bad Request)

```json
{
  "message": "Validation Error",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["title"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "undefined",
      "path": ["duration"],
      "message": "Required"
    }
  ]
}
```

---

## 💻 Development

### Code Organization

-   **Controllers**: Handle HTTP request/response cycle. They should be lightweight and only call services.
-   **Services**: Contain the core business logic. They interact with the database and perform data manipulation.
-   **Middleware**: Intercept requests to perform cross-cutting concerns like validation and error handling.

### Adding New Endpoints

1.  Add a new function in `src/controllers/video.controller.ts`.
2.  Add a corresponding business logic function in `src/services/video.service.ts`.
3.  Define the new route in `src/routes/video.routes.ts` and connect it to the controller.

### Adding New Filters

1.  Add the new filter property to `VideoFilterSchema` in `src/schemas/video.schema.ts`.
2.  Update the `VideoFilters` type in `src/types/video.types.ts`.
3.  Implement the filtering logic in a new or existing function in `src/services/filter.service.ts`.
4.  Call the new filter function from `applyFilters`.

---

## 🧪 Testing

The API can be tested using any standard API client like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or `curl`.

#### Example `curl` Request

```bash
# Get all videos
curl http://localhost:3000/api/videos

# Create a new video
curl -X POST http://localhost:3000/api/videos \
-H "Content-Type: application/json" \
-d '{
  "title": "My New Video",
  "creator": "Awesome Dev",
  "duration": 120000,
  "description": "This is a test video.",
  "targetAudience": "adults",
  "language": "fr"
}'
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please adhere to the existing code style and ensure all changes are well-documented.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Author**: Jules (AI Software Engineer)
