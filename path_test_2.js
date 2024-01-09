function drawPaths() {

    const svgns = "http://www.w3.org/2000/svg"; 
    
    var svgElem = document.createElementNS(svgns, "svg");
    svgElem.setAttributeNS(null, "viewBox", "0 0 512 342");
    svgElem.setAttributeNS(null, "width", "512");
    svgElem.setAttributeNS(null, "height", "342");

    var g = document.createElementNS(svgns, "g");
    svgElem.appendChild(g);

    var path = document.createElementNS(svgns, "path");

    path.setAttributeNS(null, "d", "M200 10 L75 200 L225 200 Z");
    path.setAttributeNS(null, "stroke", "red");
    path.setAttributeNS(null, "fill", "none");
    path.setAttributeNS(null, "opacity", 1);
    path.setAttributeNS(null, "stroke-width", 3);

    g.appendChild(path);

    var svgContainer = document.getElementById("svgContainer");
    svgContainer.appendChild(svgElem); 
}

function main() {
    drawPaths();
}
