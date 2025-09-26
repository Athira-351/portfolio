import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// Models
const Project = sequelize.define("Project", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.STRING },
});

// Sync DB
sequelize.sync({ alter: true }).then(() => console.log("DB synced"));

// Routes
app.get("/api/projects", async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

app.post("/api/projects", async (req, res) => {
  const { title, description, link } = req.body;
  const newProject = await Project.create({ title, description, link });
  res.json(newProject);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
