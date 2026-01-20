const http = require("http");
const fs = require("fs");
const path = require("path");
const db = require("./db");

const PORT = 3000;

const server = http.createServer(async (req, res) => {

//static
  if (req.method === "GET") {
    let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
    let ext = path.extname(filePath);

    const mime = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript"
    };

    if (mime[ext]) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": mime[ext] });
          res.end(data);
        }
      });
      return;
    }

//get them posts
    if (req.url === "/posts") {
      try {
        const [rows] = await db.query(
          "SELECT * FROM posts ORDER BY created_at DESC"
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(rows));
      } catch (err) {
        console.error("DB ERROR:", err);
        res.writeHead(500);
        res.end(err.message);
      }
      return;
    }
  }

//new blogz
  if (req.method === "POST" && req.url === "/posts") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const { title, content } = JSON.parse(body);

        await db.query(
          "INSERT INTO posts (title, content) VALUES (?, ?)",
          [title, content]
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Post saved" }));
      } catch (err) {
        res.writeHead(400);
        res.end("Invalid data");
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
