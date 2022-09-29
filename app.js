import express from "express"
import morgan from "morgan"
import { router } from "./routes/memos.routes";
import {authenticate} from "./utils/sequelize"
const app = express()


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
authenticate()
app.get("/", (_req, res) => {
    return res.status(200).json("hola mundo")
});



app.listen(3000,() => console.log("Active"))