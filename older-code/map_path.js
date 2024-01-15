const map_data_NEW =[
    {country_id: "usa_main", 
     country_name: "United States",
     map_data: [
        {origin_x: "60", origin_y: "84", border_data: "3ES6ES6ES6ES6ES6ES6ES6ES3ESWSWS3EN2ESESESEES5WSSWSSWWSWSW3SESEENENE3NENENN4ESSWSWSE3SWSSEEN3ENENN6E3N9EENENEN3E3SWSSWSWWSWWSWSEES4WS3WSWWSSWSWS3WNNW5SW3NWSSWSSESSWSWS3WSSWWSSWWSWSWWSWSSW4SE7SWS3WNWNNENNWNNE4N2WN3WN6WSESSWNWWNWWS3WSWWS3WSWWSWSW4S2WNWNW4NW3N5W3NWNN5WN2WN2WN2WN6W4NWNW9NNE3NE2NENE2NE2NENE2NENE2NENENE2NE2NENE2N"},
        {origin_x: "30", origin_y: "56", border_data: "3EN3ENEN2ESE2NW3NEN6ES2ENEN2EN3WS2W2NE2N2EN5E2SENENENW3N2ES4EN3EN6ES2ENEN2ESES2ESES6E2SWSWS2WSWS2WSWS2WSWSWS2WSWSWS2WSWS2W5SE9S2W5NW2NW2NWN2WNWN2WN3WS2WS3WNEN2ENEN2WS2WS2WS9W2WS5W3N"}
     ]},
    {country_id: "canada_main",
     country_name: "Canada",
     map_data: [
        {origin_x: "86", origin_y: "41", border_data: "2ESES2ENENEN2ES2EN3ENE2S2ES4ESES3ESE2S7EN3ESE2SES2ES2EN3EN2ENENESESE4N2ENENEN2ENEN3EN2ESESWSWSWSW2SWSW2SE2SWSES2ENENENENESE2SWS2W2S3WS2WNWS3WS2WNW2S2E2S3WN3WS2WS2WS2W2SWS2WS2WS3W7S3ESES2ESES3ESW2SW2SE2SES2E3NENE2NEN2EN2ENENE5NENEN2ENE3N3ES3ENESESES2E2SW2SW2SES2EN2E2NE2NE6SW3SE3S3ESES2E4SW2S5WS9W6WS2WS2WSWSWSENEN3EN3ES2E2SWSWS2W2SES2ESES3WSWS4WNEN2EN2WS2WSW2NE3N3WSWSWS9WWS5W2SWS5WNENENENEN2ENWNEN5W2NE3NWNWN4WS2WSWN3WN6WN6WN6WN6WN6WN6WN6WN4W6NE2NE2NENE2NEN2E9NW5N2ENEN2ENENEN2ENENEN2ENEN2ENEN2ENENEN"},
        {origin_x: "114", origin_y: "43", border_data: "2ES3EN2W2NEN3ESES2ENEN2ESES2E2SES3ESWS4WN2W2SES2WNWNWNWN6WS3W3N"}
     ]},
    {country_id: "mexico_main",
     country_name: "Mexico",
     map_data: [
        {origin_x: "47", origin_y: "124", border_data: "6ES2ES2ES2ES5E2SE3S5E3SE4SESESE4SW2SW3SE2SW2SES2ESESEN2ES2ENENE3NEN3ESEN3ESWSW3SW2SWS4W3S4WSWS2WN6WS2WNWNWN2WNWN2WNWNWNWNWNW3NENE3N2W6NW3NW5NW3NW5NWNW9S3SE3SE8S2W2NW4NW2NW2NWNW2N2E2NW3NE6N"}
     ]}
]

function drawMap() {

    const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
    const svg = document.querySelector("svg"); // targeting the svg itself

    const usa_main = document.querySelector("path#usa_main"); // targeting the united states div
    const canada_main = document.querySelector("path#canada_main");
    const mexico_main = document.querySelector("path#mexico_main"); 
 
    const stroke_default = "black";
    const stroke_width = "1";
    const fill_default = "none";

    map_data_NEW.forEach((country, index) => {
        
        let country_svg = []; 
        let country_path = []; 
        let outline = "";

        country_path[index] = document.createElementNS(svgns, "path");

        outline = createOutline(country.map_data); 
        country_path[index].setAttributeNS(null, "d", outline);
        country_path[index].setAttributeNS(null, "stroke", stroke_default);
        country_path[index].setAttributeNS(null, "fill", fill_default);
        country_path[index].setAttributeNS(null, "stroke-width", stroke_width);
        
        country_svg[index] = country_path[index];
    
        switch (country.country_id) {
            case "usa_main":
                usa_main.appendChild(country_svg[index]);
                break;
            case "canada_main":
                canada_main.appendChild(country_svg[index]);
                break;
            case "mexico_main":
                mexico_main.appendChild(country_svg[index]);
                break;
            default:
        }
    });
}

function createOutline(map_data) {

    var points = "";

    map_data.forEach((dataset, index) => {
        
        var first_point = true;
        var current_x = parseInt(dataset.origin_x);
        var current_y = parseInt(dataset.origin_y);
        
        for (let i = 0; i <= dataset.border_data.length; i++) {
            if (first_point) {
                points = points + "M" + current_x.toString() + " " + current_y.toString() + " ";
                first_point = false;
            } else {
                points = points + "L" + current_x.toString() + " " + current_y.toString() + " ";
            }            

            k = dataset.border_data.substr(i, 1).charCodeAt(0) - 49;
            l = i + 1;

            if (k < 0 || k > 8) {
                k = 1;
                l = i;
            }

            direction = dataset.border_data[l];

            switch (direction) {
                case "N":
                    current_y = current_y - k;
                    break;
                case "S":
                    current_y = current_y + k;
                    break;
                case "E":
                    current_x = current_x + k;
                    break;
                case "W":
                    current_x = current_x - k;
                    break;
            }
        }
    });
    
    return points;
}

function main() {
    drawMap();
}
