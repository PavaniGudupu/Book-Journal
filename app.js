import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
const __dirname = dirname(fileURLToPath(import.meta.url));
import pg from "pg";
import { PassThrough } from "stream";

const app = express();
const port = 3000;
const API_URL = "https://openlibrary.org";
const posts = [];
const db = new pg.Client({
    user: 'postgres',
    database: 'BooksCompose',
    host: 'localhost',
    password: '123456',
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.get("/search", (req, res) => {
    res.render("search.ejs");
});

app.get("/history", (req, res) => {
    res.render("history.ejs");
});


app.post("/search", async (req, res) => {
    try {
        const subject = req.body.subject; // <-- Get from query string
        const response = await axios.get(`${API_URL}/subjects/${subject}.json`);
        const firstWork = response.data.works[0]; // get first book
        const workResponse = await axios.get(`${API_URL}${firstWork.key}.json`);
        let bookDescription = workResponse.data.description;

        console.log(workResponse);


        // Render the result to your EJS template
        res.render("history.ejs", { 
            bookTitle: firstWork.title, 
            bookAuthor: firstWork.authors[0].name, 
            bookPublishYear: firstWork.first_publish_year,
            bookCover: `https://covers.openlibrary.org/b/id/${firstWork.cover_id}-M.jpg`,
            bookDescription: bookDescription,
            bookPublishPlace: workResponse.data.subject_places
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).send(err.message);
    }
});



app.post("/compose", (req, res) => {
    try{
        const composeData = {
            title: req.body.postTitle,
            body: req.body.postBody
        }
        db.query("INSERT INTO composedata VALUES ($1, $2)", [composeData.title, composeData.body]);
        posts.push(composeData);
        res.redirect("/post");
        console.log(composeData);
    } catch(error) {
        console.log(err.message);
        res.status(404).send(err.message);        
    }
});

// ---------------------- DISPLAY POSTS ----------------------
app.get("/post", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM composedata ORDER BY title ASC");
        const data = result.rows;

        res.render("post.ejs", { posts: data });
        console.log("Fetched:", data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Database fetch error");
    }
});

// ---------------------- UPDATE POST ----------------------
app.put("/post", async (req, res) => {
    try {
        const { title, content } = req.body;

        const result = await db.query(
            "UPDATE composedata SET body = $1 WHERE title = $2 RETURNING *",
            [content, title]
        );

        if (result.rows.length === 0) return res.status(404).send("No such post found");
        console.log("Updated:", result.rows);
        res.json({ updated: result.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error updating database");
    }
});

// ---------------------- DELETE POST ----------------------
app.delete("/delete", async (req, res) => {
    try {
        const { title } = req.body;

        const result = await db.query("DELETE FROM composedata WHERE title = $1 RETURNING *", [title]);

        if (result.rows.length === 0) return res.status(404).send("No post found to delete");
        console.log("Deleted:", result.rows[0]);
        res.json({ deleted: result.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error deleting post");
    }
});




app.listen(port, (req, res) => {
    console.log(`Server running on port: http://localhost:${port}`);
});