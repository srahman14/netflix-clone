# netflix-clone app

A full-stack application to search, browse, and track movies, TV shows, and actors. Users can authenticate, save search history, and explore trailers, details, and recommendations.

---

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express, MongoDB
* **Authentication:** JWT, bcrypt
* **APIs:** TMDB (movies/TV data)

---

## Features

* User authentication: Sign up, login, logout, and session check
* CRUD operations for user-related features
* Search movies, TV shows, and actors
* Save search history per user
* Click on movies/TV shows to view trailers, details, and similar recommendations
* Main page layout: one main movie/TV show and four additional categories rendered below

---

## API Endpoints

### **Authentication**

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| POST   | `/api/v1/auth/signup`    | Register a new user            |
| POST   | `/api/v1/auth/login`     | Log in user                    |
| POST   | `/api/v1/auth/logout`    | Log out user                   |
| POST   | `/api/v1/auth/authcheck` | Check if user is authenticated |

### **Movies**

| Method | Endpoint                        | Description                            |
| ------ | ------------------------------- | -------------------------------------- |
| GET    | `/api/v1/movies/trending`       | Get trending movies                    |
| GET    | `/api/v1/movies/trailers`       | Get movie trailers                     |
| GET    | `/api/v1/movies/details`        | Get movie details                      |
| GET    | `/api/v1/movies/similar`        | Get similar movies                     |
| GET    | `/api/v1/movies/:category_name` | Get movies by category (e.g., popular) |

### **TV Shows**

* Same endpoints as movies but under `/api/v1/tv/`

### **Search**

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/v1/search/person/` | Search actors/people       |
| GET    | `/api/v1/search/movie/`  | Search movies              |
| GET    | `/api/v1/search/tv/`     | Search TV shows            |
| GET    | `/api/v1/search/history` | Get user search history    |
| DELETE | `/api/v1/search/delete`  | Delete user search history |

---

## Setup

### Backend

```bash
# Clone the repo
git clone https://github.com/srahman14/netflix-clone/
cd netflix-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root (backend) directory with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```
