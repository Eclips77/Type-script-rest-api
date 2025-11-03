# 🎬 Video & Playlist API

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A REST API for managing a video and playlist library, built with Node.js and Express.js. This project uses a JSON file-based database, validates data with Zod, and is written in modern JavaScript using Promises.

### ✨ Key Features

-   **Full CRUD for Videos & Playlists**: Create, Read, Update, and Delete both videos and playlists.
-   **Advanced Filtering**: Smart search for videos and filter playlists by genre.
-   **Schema Validation**: Type-safe validation for all incoming data powered by Zod.
-   **Promise-Based**: All asynchronous logic uses `.then()` and `.catch()` for handling operations.
-   **Playlist Management**: Add videos to playlists and manage them.

---

## 📚 Table of Contents

-   [Tech Stack](#-tech-stack)
-   [Prerequisites](#-prerequisites)
-   [Installation](#-installation)
-   [Project Structure](#-project-structure)
-   [Running the Application](#-running-the-application)
-   [API Documentation](#-api-documentation)

---

## 🛠️ Tech Stack

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **Zod**: Schema declaration and validation library.
-   **Fuse.js**: For lightweight fuzzy searching.
-   **UUID**: For generating unique identifiers.

---

## ✅ Prerequisites

-   **Node.js**: `v18.x` or later.
-   **npm**: `v9.x` or later.

---

## 🚀 Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

---

## 📂 Project Structure

```
project/
├── src/
│ ├── schemas/
│ │ ├── video.schema.js
│ │ └── playlist.schema.js
│ ├── services/
│ │ ├── video.service.js
│ │ └── playlist.service.js
│ ├── controllers/
│ │ ├── video.controller.js
│ │ └── playlist.controller.js
│ ├── routes/
│ │ ├── video.routes.js
│ │ └── playlist.routes.js
│ ├── middleware/
│ ├── utils/
│ └── app.js
├── data/
│ ├── videos.json
│ └── playlists.json
└── package.json
```

---

## ▶️ Running the Application

-   **Development Mode (with auto-restart):**
    ```bash
    npm run dev
    ```

-   **Production Mode:**
    ```bash
    npm run start
    ```

---

## 📖 API Documentation

**Base URL**: `http://localhost:3000`

### Video API Endpoints (`/api/videos`)

| Method   | Path         | Description                             |
| :------- | :----------- | :-------------------------------------- |
| `GET`    | `/`          | Get all videos with optional filtering. |
| `GET`    | `/:id`       | Get a single video by its ID.           |
| `POST`   | `/`          | Create a new video.                     |
| `PUT`    | `/:id`       | Update an existing video.               |
| `DELETE` | `/:id`       | Delete a video by its ID.               |

### Playlist API Endpoints (`/api/playlists`)

| Method   | Path                       | Description                        |
| :------- | :------------------------- | :--------------------------------- |
| `GET`    | `/`                        | Get all playlists (filter by genre). |
| `GET`    | `/:id`                     | Get a single playlist by its ID.   |
| `POST`   | `/`                        | Create a new playlist.             |
| `PUT`    | `/:id`                     | Update an existing playlist.       |
| `DELETE` | `/:id`                     | Delete a playlist by its ID.       |
| `PATCH`  | `/:playlistId/videos/:videoId` | Add a video to a playlist.         |

### Genre API Endpoints (`/api/genres`)

| Method   | Path   | Description                   |
| :------- | :----- | :---------------------------- |
| `GET`    | `/`    | Get all available genres.     |
| `GET`    | `/:id` | Get a single genre by its ID. |
| `POST`   | `/`    | Create a new genre.           |
| `PUT`    | `/:id` | Update an existing genre.     |
| `DELETE` | `/:id` | Delete a genre by its ID.     |
