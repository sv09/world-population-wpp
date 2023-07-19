import Tooltip from "../components/Tooltip.svelte";

export default function tooltip(element){
    let countryName;
    let population;
    let TooltipComponent;

    const mouseover = (e) => {
        countryName = element.getAttribute("name");
        population = element.getAttribute("population");

        element.removeAttribute('name');
        element.removeAttribute('population');

        TooltipComponent = new Tooltip({
            props: {
                name: countryName,
                population: population,
                x: e.pageX,
                y: e.pageY
            },
            target: document.body,
        });
    };

    const mousemove = (e) => {
        TooltipComponent.$set({
            x: e.pageX,
            y: e.pageY,
        });
    };

    const mouseleave = (e) => {
        TooltipComponent.$destroy();
        element.setAttribute('name', countryName);
        element.setAttribute('population', population);
    };

    element.addEventListener('mouseover', mouseover);
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseleave', mouseleave);

    return {
        detroy() {
            element.removeEventListener('mouseover', mouseover);
            element.removeEventListener('mousemove', mousemove);
            element.removeEventListener('mouseleave', mouseleave);
        }
    }
}
