import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import authRouter from "./src/routes/auth.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import casesRouter from "./src/routes/cases.routes.js";
import symptomsRouter from "./src/routes/symptoms.routes.js";
import hospitalsRouter from "./src/routes/hospitals.routes.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import alertsRouter from "./src/routes/alerts.routes.js";

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const port = 3000;
dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//------------------------ Routes ----------------------//
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/cases", casesRouter);
app.use("/api/symptoms", symptomsRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/alerts", alertsRouter);

//------------------------ Start Server & Connect to DB ----------------------//
const start = async () => {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
  const connectionDb = await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
      console.log("successfully Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
start();
