# Instagram Mini Clone

## Overview

This project is a **mini Instagram-style application** built using **Django REST Framework** and **React**.
It demonstrates **backend API design**, **database relationships**, and **JWT-based authentication**.

The application supports user authentication, post creation, likes, comments, follow/unfollow functionality, and a personalized feed based on followed users.


<table>
  <tr>
    <td align="center">
      <b>Create Post</b><br/>
      <img width="380" src="https://github.com/user-attachments/assets/0bdd1320-413e-457c-a3c4-dc3c87d11eba" />
    </td>
    <td align="center">
      <b>Find People</b><br/>
      <img width="380" src="https://github.com/user-attachments/assets/9403672f-d0c4-42fd-a6dd-3c614f0cca44" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <b>Feed</b><br/>
      <img width="380" src="https://github.com/user-attachments/assets/14468f84-97ff-48e3-a761-381dd2ec4dc4" />
    </td>
    <td align="center">
      <b>Post Detail</b><br/>
      <img width="380" src="https://github.com/user-attachments/assets/ea3064c7-9cf0-42a7-bf3b-b97675bd3545" />
    </td>
  </tr>
</table>


---


## Features

### Backend Features

* User registration and login using JWT
* Secure authentication and authorization
* Follow and unfollow users
* Create posts with image URL and caption
* Like and unlike posts
* Add and fetch comments on posts
* Personalized feed based on followed users
* User profile API with posts and follow status

### Frontend Features

* Login and Signup screens
* Protected routes for authenticated users
* Home feed with posts
* Create post screen
* User profile page
* Like and comment functionality
* Dynamic UI updates without page refresh
* Clean and responsive design

---

## Tech Stack

* **Backend:** Django, Django REST Framework
* **Authentication:** JWT (SimpleJWT)
* **Database:** SQLite
* **Frontend:** React, Axios, React Router
* **Tools:** Postman, Git, GitHub

---

## Database Design

* User → Post : One-to-Many
* User → Comment : One-to-Many
* User → User (Follow) : Many-to-Many
* User → Post (Like) : Many-to-Many

---

## How to Run the Project

### Backend Setup

```bash
git clone <repository-url>
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

```http
POST /api/register/
POST /api/login/
```

### Users

```http
GET  /api/users/
POST /api/users/{user_id}/follow/
POST /api/users/{user_id}/unfollow/
GET  /api/users/{user_id}/profile/
```

### Posts

```http
POST /api/posts/
GET  /api/feed/
POST /api/posts/{post_id}/like/
POST /api/posts/{post_id}/unlike/
```

### Comments

```http
POST /api/posts/{post_id}/comment/
GET  /api/posts/{post_id}/comments/
```

---

## Postman Collection

* A Postman collection is included in the repository
* Import it into Postman
* Use the **login API** to generate a JWT token
* Add the token as **Bearer Token** for all protected APIs

---

## Project Structure

```
backend/
frontend/
postman/
README.md
```

---

## What This Project Demonstrates

* Backend logic and API design
* Database relationships
* JWT authentication
* CRUD operations
* Clean and structured code

---

## Notes

* Images are handled using image URLs
* SQLite is used for simplicity
* Project is built for learning and evaluation purposes

---
MADE BY ANSHUL KAVISHWAR <>

