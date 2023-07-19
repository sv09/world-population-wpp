<script>
    import { geoMercator, geoPath, scaleSqrt, scaleLinear } from "d3";
    import { width, height } from "../stores/dimensions";
    import { countries } from "../stores/map";
    import { population } from "../stores/population";
    import tooltip from "../utils/tooltip";
    
    export let year;

    let countryData;
    countries.subscribe(val => countryData=val);

    let populationData;
    population.subscribe(val => populationData=val);
    let populationYear = populationData.filter(d => d.Time === year);

    
    // combine population data with "properties" of geo data

    //clean country names to match geo data
    let consistentCountryNames= {"United States of America": "USA", 
    "Türkiye": "Turkey", 
    "Syrian Arab Republic": "Syria", 
    "Serbia": "Republic of Serbia", 
    "Iran (Islamic Republic of)": "Iran",
    "Viet Nam": "Vietnam",
    "Congo": "Republic of the Congo",
    "Guinea-Bissau": "Guinea Bissau",
    "Kosovo (under UNSC res. 1244)": "Kosovo",
    "North Macedonia": "Macedonia",
    "Czechia": "Czech Republic",
    "United Kingdom": "England",
    "Bolivia (Plurinational State of)": "Bolivia",
    "Venezuela (Bolivarian Republic of)": "Venezuela",
    "Falkland Islands (Malvinas)": "Falkland Islands",
    "Bahamas": "The Bahamas",
    "Russian Federation": "Russia",
    "Lao People's Democratic Republic": "Laos",
    "Republic of Korea": "South Korea",
    "Republic of Moldova": "Moldova"
  };


    let countryPop = {};  
    populationYear.map(d => {
      let name = d.Location;
      if(Object.keys(consistentCountryNames).includes(name)){
        name = consistentCountryNames[name];
      }
      countryPop[name] = d.PopTotal;
    });

    countryData.map(d => {
      let country = d.properties.name;
      d.properties.population = countryPop[country];
    });
    
    let colorBounds = populationData.reduce((acc, d) => {
       return {
          min: Math.min(acc.min, d.PopTotal),
          max: Math.max(acc.max, d.PopTotal)
       }
    },
    { min: Infinity, max: -Infinity }
    );
    // console.log(colorBounds)
    const colorScale = scaleLinear()
                    .domain([colorBounds.min, colorBounds.max])
                    .range(["#fae8ac", "#df2d09"]);
    
    const populationScale = (d) => {
      return colorScale(d);
    }
    
    $: scale = ($width/$height)*75;
    $: projection  =  geoMercator()
                            .scale(scale)
                            .translate([$width/2, $height/1.5])
    $: path  =  geoPath(projection);
</script>

{#key $width|$height|year}
  {#each countryData as d}
    <path d={path(d)} fill={ populationScale(d.properties.population) } name={ d.properties.name } population={ d.properties.population } use:tooltip/>
  {/each}
{/key}

<style>
  path{
    stroke: #2e2e2e;
    stroke-width: 0.5;
  }
</style>