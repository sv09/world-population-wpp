<script>
	import WorldMap from "./components/WorldMap.svelte";
	import { width, height } from "./stores/dimensions";
	import { onMount } from "svelte";
	import loadMapData from "./utils/loadMapData";
	import loadData from "./utils/loadData";
	import { countries } from "./stores/map";
	import { population } from "./stores/population";

	let w;
	let h;
	$: updatedWidth = w;
	$: updatedHeight = h;
	$: width.update((currentVal) => updatedWidth);
	$: height.update((currentVal) => updatedHeight);

	let worldData;
	let popData;
	onMount(async () => {
		loadMapData();	
		loadData();
	});

	countries.subscribe(val => worldData = val);
	population.subscribe(val => popData = val);


</script>

{#if worldData }
	{#if popData }
		<div class="app-wrapper" bind:clientWidth={w} bind:clientHeight={h} >
			<h1>World Map</h1>
			{#key $width|$height}
				<WorldMap />
			{/key}
		</div>
	{/if}
{/if}

<style>
	.app-wrapper {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0.3rem 0;
  }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-weight: 30;
		text-align: center;
	}
</style>