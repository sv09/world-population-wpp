import { writable, derived } from "svelte/store";

export const width = writable();
export const height = writable();

export const mapHeight = derived((height), ($height) => ($height/1.5));

export const margin = writable({
    top: 30,
    right: 30,
    bottom: 10,
    left: 30
});


