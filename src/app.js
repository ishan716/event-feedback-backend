const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // e.g. postgres://user:pass@localhost:5432/dbname
});

// Test DB
pool.connect()
    .then(() => console.log("Connected to PostgreSQL 🚀"))
    .catch(err => console.error("DB connection error", err));

// Routes
app.get("/", (req, res) => {
    res.send("Feedback API with PostgreSQL is running ✅");
});

const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes(pool));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
