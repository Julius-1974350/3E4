import planetsRoutes from '/routes/planets-routes.js';
import express from "express";
const app = express();
//TODO: Ajouter du code ici
app.get('/premiere', (req,res) => {
    res.status(200)
    res.set('Content-Type','text/plain');
    res.send('premier route avec express');
});
app.use('/plantes', planetsRoutes);

export default app;