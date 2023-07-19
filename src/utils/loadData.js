import { csv } from "d3";
import { population } from "../stores/population";

let populationData = "https://raw.githubusercontent.com/sv09/WPPPopulationData/main/WPP_filtered_data.csv";

const loadData = async () => {
    const data = await csv(populationData);
    
    data.map(d => {
        d.PopMale = + d.PopMale,
        d.PopFemale = + d.PopFemale,
        d.PopTotal = + d.PopTotal
    });

    population.set(data);

};

export default loadData;