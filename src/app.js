import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import session from 'express-session';

import auth from "./util/auth.js";
import initDB from "./database/initDB.js";
import passport from "./util/auth.js";

initDB();

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authRouter from './routes/auth.js'
const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      sameSite: 'None',  //activar en produccion si los servidores son diferentes
    },
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);

app.use("/users", usersRouter);

export default app;
