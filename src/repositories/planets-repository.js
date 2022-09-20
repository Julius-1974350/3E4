import dayjs from 'dayjs';
import Planet from '../models/planet-model.js';

class planetsRepository {
    retrieveAll() {
        return Planet.find(); // SELECT * FROM planets
    }
    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); //Select * FROM planets WHERE idPlanet = [idPlanet]
    }
    create(planet){
        return Planet.create(planet); // INSERT () INTO planets VALUES()
    }

    transform(planet){
        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');
        delete planet.createdAt;
        delete planet.updatedAt;
        delete planet.__v;
        return planet;
    }

}
export default new planetsRepository();