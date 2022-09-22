import express from "express";
import PLANETS from '../data/planets.js';
import planetsRepository from '../repositories/planets-repository.js'
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
    async getAll(req, res, next){
        try {
            const transformOptions = {};
            const filter = {};
            if (req.query.explorer) {
                filter.discoveredBy = req.query.explorer;
            }
            if (req.query.unit) {
                const unit = req.query.unit;
                if (unit === 'c') {
                    transformOptions.unit = unit;
                }else{
                    return next(HttpError.BadRequest('Le paramètre unit doit avoir comme valeur c pour Celsius'));
                }
                
            }

            let planets = await planetsRepository.retrieveAll(filter);
            //Transformation
            //Map == boucle
            planets = planets.map(p => {
                p = p.toObject({getters:false, virtuals:false});
                p = planetsRepository.transform(p, transformOptions);
                return p;
            });
            res.status(200).json(planets);
        } catch (err) {
            return next(err);   
        }
    }
    async getOne(req, res, next){
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
        try {
            let planet = await planetsRepository.retrieveOne(req.params.idPlanet);
            if(!planet){
                return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`))
            }
            // Transformer/Nettoyer l'objet avant de l'envoyer dans la réponse
            planet = planet.toObject({getters:false, virtuals:false});
            planet = planetsRepository.transform(planet);
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
        }

    }
    async post(req, res, next){
        /*const newPlanet = req.body;
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
        }*/
        try {
            let newPlanet = await planetsRepository.create(req.body);
            newPlanet = newPlanet.toObject({getters:false, virtuals:false});
            newPlanet = planetsRepository.transform(newPlanet);
            res.status(201).json(newPlanet);
        } catch (err) {
            return next(err);
        }
    }
    async deleteOne(req, res, next){
        try {
            const idPlanet = req.params.idPlanet;
            const deleteResult = await planetsRepository.delete(idPlanet);
            if (deleteResult) {
                res.status(204).end();
            } else {
                return next(HttpError.NotFound(`La planète avec l'indentifiant ${req.params.idPlanet} n'existe pas`));
            }
        } catch (err) {
            return next(err);
        }
        /*
        const idPlanet = parseInt(req.params.idPlanet, 10);
        const index = PLANETS.findIndex(p => p.id === idPlanet)
        if(index === -1){
            return next(HttpError.NotFound(`La planète avec l'indentifiant ${idPlanet} n'existe pas`));
        }
        PLANETS.splice(index, 1);
        res.status(204).end();*/
    }

}

new PlanetsRoutes();
export default router;

