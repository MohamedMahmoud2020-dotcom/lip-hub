import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import memberRoutes from "./routes/memberRoutes.js"
import borrowsRoutes from "./routes/borrowsRoutes.js"
dotenv.config();
connectDB();

const app = express();

/* CORS */
app.use(cors());
app.use(express.json());


/* API */
app.use("/api/", bookRoutes);
app.use("/api/", memberRoutes);
app.use("/api/", borrowsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
