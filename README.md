# 📚 BookHaven Journal

BookHaven Journal is a **full-stack Node.js web application** that allows users to **discover books using the Open Library API** and **compose their own reading reflections**, securely stored in a **PostgreSQL database**.

This project demonstrates **API integration inside another API flow (nested API calls)**, making it slightly complex and powerful.

---
https://github.com/user-attachments/assets/b52008e3-7a99-4b45-8523-8fc4abfef2e8
## 🚀 Features

### 🔎 Search Books by Subject
- Uses the **Open Library Subjects API**
- Fetches book data dynamically from millions of records

### 🔁 API within API (Nested API Calls)
- First API call fetches subject-based books
- Second API call fetches detailed information of the selected book

### 📖 Detailed Book View
- Book title  
- Author  
- Description  
- Cover image  
- First published year  
- Published places  

### ✍️ Compose & Manage Journal Posts
- Create personal book reflections
- Store posts in PostgreSQL
- View all composed posts

### 🗂️ CRUD Operations
- Create posts  
- Read posts  
- Update posts  
- Delete posts  

### 🎨 EJS Templating
- Clean UI using EJS templates
- Reusable header and footer partials

---

## 🧠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, HTML, CSS  
- **Database:** PostgreSQL  
- **APIs:** Open Library API  
- **HTTP Client:** Axios  
- **Other Tools:** Body-parser, pg  

---

## 🔗 API Flow (API inside API)
    User
    ↓
    Search Subject
    ↓
    Open Library Subjects API
    ↓
    Get First Book Key
    ↓
    Open Library Work API
    ↓
    Render Full Book Details


This nested API approach allows fetching **rich and complete book information** instead of limited search results.

---

## 📂 Project Structure
    ├── public
    │ └── styles.css
    ├── views
    │ ├── home.ejs
    │ ├── search.ejs
    │ ├── history.ejs
    │ ├── compose.ejs
    │ ├── post.ejs
    │ ├── about.ejs
    │ ├── contact.ejs
    │ └── Partials
    │ ├── header.ejs
    │ └── footer.ejs
    ├── app.js
    └── README.md

---

## ⚙️ Installation & Setup

```bash
1️⃣ Clone the Repository
git clone https://github.com/your-username/bookhaven-journal.git
cd bookhaven-journal

2️⃣ Install Dependencies
    npm install

3️⃣ Setup PostgreSQL Database
    CREATE DATABASE BookCompose;
    
    CREATE TABLE composedata (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL
    );

4️⃣ Run the Application
    node app.js


Server will run at:
    http://localhost:3000
```


🌐 Routes Overview

| Route      | Method | Description                   |
| ---------- | ------ | ----------------------------- |
| `/`        | GET    | Home page                     |
| `/search`  | GET    | Search books page             |
| `/search`  | POST   | Fetch book data using API     |
| `/history` | GET    | Display selected book details |
| `/compose` | GET    | Compose new journal           |
| `/compose` | POST   | Save journal post             |
| `/post`    | GET    | View all posts                |
| `/post`    | PUT    | Update post                   |
| `/delete`  | DELETE | Delete post                   |


📬 Contact

 G. Pavani
    
    📧 Email: pavani9419@gmail.com
    
    💼 LinkedIn: https://linkedin.com/in/pavani-gudupu-3b795528b
    
    🐙 GitHub: https://github.com/PavaniGudupu




⭐ If you like this project
Give it a ⭐ on GitHub — it motivates me to build more!
