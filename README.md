# Node.js-Powered-Blog-Poster-Website
A simple full-stack blog application built using pure Node.js, MySQL, HTML, CSS, and vanilla JavaScript — without Express or any backend framework.

This project demonstrates low-level backend concepts such as manual routing, HTTP handling, database connections, and JSON-based client–server communication.

Features
--
Create blog posts from the browser

Persist posts in a MySQL database

Fetch and display posts dynamically

Clean separation of frontend and backend

Safe SQL queries using prepared statements

Tech Stack
--
Backend
Node.js (http module)

MySQL

mysql2 driver

Frontend
HTML

CSS

Vanilla JavaScript (fetch API)

Installation & Setup
--
1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install dependencies
npm install

3. Configure database connection
Edit db.js:

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "YOUR_MYSQL_PASSWORD",
  database: "blog_db",
  port: 3306
});

module.exports = pool.promise();

4. Start the server
node server.js


Server will run at:

http://localhost:3000


How It Works
--
Browser --> HTTP (fetch) --> Node.js Server (manual routing) --> SQL --> MySQL Database
