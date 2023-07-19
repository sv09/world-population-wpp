<script>
    export let name;
    export let population;
    export let x;
    export let y;
</script>

<div style=" top: {y+5}px; left: {x+5}px; ">Country: { name } <br>Population: { population } </div>

<style>
    div{
        background: rgba(0,0,0,0.5);
        color: rgb(255,255,255);
        padding: 15px;
        position: absolute;
        font-size: 12px;
    }
</style>
