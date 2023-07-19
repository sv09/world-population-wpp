<script>
    import Map from './Map.svelte';
    import { width, height, margin } from "../stores/dimensions";

    //send "year" to Map component at an interval of 1 second
    let years = ["1950","1955", "1960","1965", "1970","1975", "1980","1985", "1990","1995", "2000","2005", "2010","2015", "2020", "2025", "2030", "2035", "2040", "2045", "2050", "2055", "2060", "2065", "2070", "2075", "2080", "2085", "2090", "2095", "2100"];
    let year;
    let i = 0;                  //  set your counter to 1
    function myLoop() {         //  create a loop function
      setTimeout(function() {   //  call a 1s setTimeout when the loop is called
        year = years[i];               //  your code here
        i++;                    //  increment the counter
        if (i < years.length) {  //  if the counter < length of years list, call the loop function
          myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
      }, 1000)
    }
    myLoop();  
  </script>
  
  {#key $width|$height|year}
    {#if $width|$height}
      {#if year}
        <p>Year: {year}</p>
        <svg width={ $width-$margin.left-$margin.right } height={ $height-$margin.top-$margin.bottom }>
          <Map {year}/>
        </svg>
      {/if}
    {/if}
  {/key}
  
  <style>
    svg{
      align-items: center;
      background: #eee;
    }
  </style>