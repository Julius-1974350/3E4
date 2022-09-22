import dayjs from 'dayjs';
import Planet from '../models/planet-model.js';
const ZERO_KELVIN = -273.15;
class planetsRepository {
    retrieveAll(filter = {}) {
        // const filterSansWhere = {}
        // const testFiltre = {discoveredBy : 'Skadex' } => Where discoveredBy = 'Skadex'
        // const testFiltre2 = { temperature : { $gt: 240}, 'position.y': {$lt:500}} ($lt = <) ($gt = >) ($lte = <=) ($gte = >=)()
        // const testFiltre2 = {$or: [{ temperature : { $gt: 240}, 'position.y': {$lt:500}}]};
        return Planet.find(filter); // SELECT * FROM planets
    }
    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); //Select * FROM planets WHERE idPlanet = [idPlanet]
    }
    create(planet){
        return Planet.create(planet); // INSERT () INTO planets VALUES()
    }
    delete(idPlanet){
        return Planet.findByIdAndDelete(idPlanet);
    }
    transform(planet, transformsOptions = {}){
        if (transformsOptions) {
            //changer les unités
            if (transformsOptions.unit === 'c') {
                planet.temperature += ZERO_KELVIN; 
            }
        }

        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');
        delete planet.createdAt;
        delete planet.updatedAt;
        delete planet.__v;
        return planet;
    }
    //TODO: TP - HexMatrix
    //this.calculateHexMatrix()
    //TODO: TP - wind Direction

    /*calculateHexMatrix(hexMatrix){

    }*/
}
export default new planetsRepository();