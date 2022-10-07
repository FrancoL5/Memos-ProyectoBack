import express from "express"
import morgan from "morgan"
import { router } from "./routes/validate.routes.js";
import {authenticate} from "./utils/sequelize.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "SuperSecreto",
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: false,
	})
);
app.use(cookieParser());


app.use(router)
authenticate()



app.listen(3000,() => console.log("Active"))