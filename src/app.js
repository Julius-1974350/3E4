import PlanetsRoutes from "./routes/planets-routes.js";
import database from "../libs/database.js";
import express from "express";
import errors from "./middlewares/errors.js";
database();
const app = express();
app.use(express.json()); //Permettre à notre serveur de comprendre le json recu
//TODO: Ajouter du code ici
app.get('/premiere', (req,res) => {
    res.status(200)
    res.set('Content-Type','text/plain');
    res.send('premier route avec express');
});
app.use('/planets', PlanetsRoutes);
app.use(errors);

export default app;