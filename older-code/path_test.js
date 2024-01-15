function drawPaths() {

    const svgns = "http://www.w3.org/2000/svg"; 
    var svg = document.querySelector("svg");

    var triangle_js = document.querySelector("path#triangle_js");
    svg.appendChild(triangle_js);
 
    let country_path = document.createElementNS(svgns, "path");

    country_path.setAttributeNS(null, "d", "M200 10 L75 200 L225 200 Z");
    country_path.setAttributeNS(null, "stroke", "red");
    country_path.setAttributeNS(null, "fill", "none");
    country_path.setAttributeNS(null, "opacity", 1);
    country_path.setAttributeNS(null, "stroke-width", 3);

    triangle_js.appendChild(country_path);
}

function main() {
    drawPaths();
}
