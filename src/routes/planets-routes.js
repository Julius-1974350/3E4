import express from "express";
import PLANETS from '../data/planets.js';
const router = express.Router();

class PlanetsRoutes {
    // déjà dans le path planet = /
    constructor(){
        router.get('/', this.getAll);// /planets
        router.get('/:idPlanet', this.getOne); // /planets/:idPlanets
        router.post('/', this.post); // /planets
        //router.get('/:idPlanet', this.getOne); // /planets/:idPlanets
        router.delete('/:idPlanet', this.deleteOne); // /planets/:idPlanets
    }
    getAll(req, res, next){
        res.status(200);
        res.json(PLANETS);
    }
    getOne(req, res, next){
        // const idPlanet = req.params.idPlanet;
        // for(let planet of PLANETS){
        //     if(planet.id === idPlanet){
        //         //trouver le planet rechercher
        //         res.status(200);
        //         res.json(planet);
        //         break;
        //     }
        // }
        // res.status(404);
        // res.end();
        const idPlanet = parseInt(req.params.idPlanet, 10);
        const planet = PLANETS.filter(p => p.id === idPlanet);
        if(planet.length > 0){
            res.status(200);
            res.json(planet[0]);
        }
        else{
           return next(HttpError.NotFound(`La planète avec l'indentifiant ${idPlanet} n'existe pas`));
        }
    }
    post(req, res, next){
        const newPlanet = req.body;
        if(newPlanet){
            const index = PLANETS.findIndex(p => p.id === req.body.id);
            if(index === -1) {
                PLANETS.push(newPlanet);
                res.status(201).json(newPlanet);
            }else{
                return next(HttpError.Conflict(`Une planète avec l'identifiant ${req.body.id}`));
            }
        }else{
            return next(HttpError.BadRequest('Aucune information transmise'));
        }
    }
    deleteOne(req, res, next){
        const idPlanet = parseInt(req.params.idPlanet, 10);
        const index = PLANETS.findIndex(p => p.id === idPlanet)
        if(index === -1){
            return next(HttpError.NotFound(`La planète avec l'indentifiant ${idPlanet} n'existe pas`));
        }
        PLANETS.splice(index, 1);
        res.status(204).end();
    }

}

new PlanetsRoutes();
export default router;

