import { json } from 'd3';
import { countries } from '../stores/map';

// const data = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const data = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';


const loadMapData = async () => {
    const world = await json(data);
    countries.set(world.features.filter(d => d.properties.name !== "Antarctica"));

    let worldData;
    countries.subscribe(val => worldData=val);    

};





export default loadMapData;

