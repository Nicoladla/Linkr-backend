import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import indexRouter from "./routers/indexRouters.js";
import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port: ${port}`));
