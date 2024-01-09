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

function drawMap_NEWER() {

    const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
    const svg = document.querySelector("svg"); // targeting the svg itself

    const usa_main = document.querySelector("g#usa_main"); // targeting the united states div // changed from "path#usa_main" to "g#usa_main" (same for Canada and Mexico)
    const canada_main = document.querySelector("g#canada_main");
    const mexico_main = document.querySelector("g#mexico_main"); 
 
    const stroke_default = "black";
    const stroke_width = "1";
    const fill_default = "none";

    map_data_NEW.forEach((country, index) => { // was originally map_data_NEW
        
        let country_svg = []; //[map_data.length - 1];
        let country_path = []; //[map_data.length - 1]; 
        let outline = "";

        //outline = createOutline(country.origin_x, country.origin_y, country.border_data);

        outline = createOutline_NEWER(country.map_data); //.apply(null, country.map_data);
        country_path[index] = document.createElementNS(svgns, "path");

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

function createOutline_NEWER(map_data) {

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

function drawMap_NEW() {

    const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
    const svg = document.querySelector("svg"); // targeting the svg itself

    const usa_main = document.querySelector("g#usa_main"); // targeting the united states div
    const canada_main = document.querySelector("g#canada_main");
    const mexico_main = document.querySelector("g#mexico_main"); 
 
    const stroke_default = "black";
    const fill_default = "none";

    map_data_NEW.forEach((country, index) => {
        
        let country_svg = []; //[map_data.length - 1];
        let country_polygon = []; //[map_data.length - 1]; 
        let outline = "";

        //outline = createOutline(country.origin_x, country.origin_y, country.border_data);

        outline = createOutline_NEW(country.map_data); //.apply(null, country.map_data);
        country_polygon[index] = document.createElementNS(svgns, "polygon");
           
        country_polygon[index].setAttribute("points", outline);
        country_polygon[index].setAttribute("stroke", stroke_default);
        country_polygon[index].setAttribute("fill", fill_default);

        country_svg[index] = country_polygon[index];
    
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

function createOutline_NEW(map_data) {

    var points = "";

    map_data.forEach((dataset, index) => {

        var current_x = parseInt(dataset.origin_x);
        var current_y = parseInt(dataset.origin_y);
        
        for (let i = 0; i <= dataset.border_data.length; i++) {
            points = points + current_x.toString() + "," + current_y.toString() + " ";
            

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

        // 
    });
    
    return points;
}

const map_data = [
    {country:"United States",
     country_id:"usa_main",
     origin_x:"60",
     origin_y:"84",
     border_data:"3ES6ES6ES6ES6ES6ES6ES6ES3ESWSWS3EN2ESESESEES5WSSWSSWWSWSW3SESEENENE3NENENN4ESSWSWSE3SWSSEEN3ENENN6E3N9EENENEN3E3SWSSWSWWSWWSWSEES4WS3WSWWSSWSWS3WNNW5SW3NWSSWSSESSWSWS3WSSWWSSWWSWSWWSWSSW4SE7SWS3WNWNNENNWNNE4N2WN3WN6WSESSWNWWNWWS3WSWWS3WSWWSWSW4S2WNWNW4NW3N5W3NWNN5WN2WN2WN2WN6W4NWNW9NNE3NE2NENE2NE2NENE2NENE2NENENE2NE2NENE2N"},
    {country:"Alaska",
     country_id:"usa_alaska",
     origin_x:"30",
     origin_y:"56",
     border_data:"3EN3ENEN2ESE2NW3NEN6ES2ENEN2EN3WS2W2NE2N2EN5E2SENENENW3N2ES4EN3EN6ES2ENEN2ESES2ESES6E2SWSWS2WSWS2WSWS2WSWSWS2WSWSWS2WSWS2W5SE9S2W5NW2NW2NWN2WNWN2WN3WS2WS3WNEN2ENEN2WS2WS2WS9W2WS5W3N"},
    {country:"Canada",
     country_id:"canada_main",
     origin_x:"86",
     origin_y:"41",
     border_data:"2ESES2ENENEN2ES2EN3ENE2S2ES4ESES3ESE2S7EN3ESE2SES2ES2EN3EN2ENENESESE4N2ENENEN2ENEN3EN2ESESWSWSWSW2SWSW2SE2SWSES2ENENENENESE2SWS2W2S3WS2WNWS3WS2WNW2S2E2S3WN3WS2WS2WS2W2SWS2WS2WS3W7S3ESES2ESES3ESW2SW2SE2SES2E3NENE2NEN2EN2ENENE5NENEN2ENE3N3ES3ENESESES2E2SW2SW2SES2EN2E2NE2NE6SW3SE3S3ESES2E4SW2S5WS9W6WS2WS2WSWSWSENEN3EN3ES2E2SWSWS2W2SES2ESES3WSWS4WNEN2EN2WS2WSW2NE3N3WSWSWS9WWS5W2SWS5WNENENENEN2ENWNEN5W2NE3NWNWN4WS2WSWN3WN6WN6WN6WN6WN6WN6WN6WN4W6NE2NE2NENE2NEN2E9NW5N2ENEN2ENENEN2ENENEN2ENEN2ENEN2ENENEN"},
   {country:"Victoria Island",
    country_id:"canada_victoria",
    origin_x:"114",
    origin_y:"43",
    border_data:"2ES3EN2W2NEN3ESES2ENEN2ESES2E2SES3ESWS4WN2W2SES2WNWNWNWN6WS3W3N"},
   {country:"Mexico",
    country_id:"mexico_main",
    origin_x:"47",
    origin_y:"124",
    border_data:"6ES2ES2ES2ES5E2SE3S5E3SE4SESESE4SW2SW3SE2SW2SES2ESESEN2ES2ENENE3NEN3ESEN3ESWSW3SW2SWS4W3S4WSWS2WN6WS2WNWNWN2WNWN2WNWNWNWNWNW3NENE3N2W6NW3NW5NW3NW5NWNW9S3SE3SE8S2W2NW4NW2NW2NWNW2N2E2NW3NE6N"},
   {country:"Guatemala",
    country_id:"guatemala_main",
    origin_x:"83",
    origin_y:"160",
    border_data:"3E3SESWSWSW2S2WSWNWNWNW2NEN4E3N"},
   {country:"Guatemala",
    country_id:"guatemala_mini",
    origin_x:"14",
    origin_y:"170",
    border_data:"9E9SESES2ES2WSWS2W5S4WS2WS2WN3WN2WN2WNWNW3NENENENEN7E3NWNWNW2NE2N"},
   {country:"El Salvador",
    country_id:"el_salvador_main",
    origin_x:"82",
    origin_y:"168",
    border_data:"2ESE2SWN2W2N"},
   {country:"El Salvador",
    country_id:"el_salvador_mini",
    origin_x:"16",
    origin_y:"190",
    border_data:"2EN5ES3ES3E4S6WN4WN2WNW2N"},
   {country:"Honduras",
    country_id:"honduras_main",
    origin_x:"86",
    origin_y:"164",
    border_data:"7ESES3WSWSWSWS2WSW2NW3NENEN"},
   {country:"Honduras",
    country_id:"honduras_mini",
    origin_x:"27",
    origin_y:"181",
    border_data:"7ES6EN7ESES2ESESESES3WSWS2WNWN2WSWSWSWS4WS2W2SWSWS2WN2W4N3WN3WNW5N2ENEN2EN"},
   {country:"Nicaragua",
    country_id:"nicaragua_main",
    origin_x:"86",
    origin_y:"170",
    border_data:"2ENENENEN3ESW4SW4SWS3W3N2WNWNEN"},
   {country:"Nicaragua",
    country_id:"nicaragua_mini",
    origin_x:"30",
    origin_y:"196",
    border_data:"3ENENE2N2EN4ENENENEN2ESES2ENEN3E5SW2SW7SW8S5WN2WN2WS2WNWNWNWNW2NWNWNWNWNW2N"},
   {country:"Costa Rica",
    country_id:"costa_rica_main",
    origin_x:"88",
    origin_y:"176",
    border_data:"3ENESE3S4WNW2N"},
   {country:"Costa Rica",
    country_id:"costa_rica_mini",
    origin_x:"38",
    origin_y:"209",
    border_data:"EN2EN2ES2ES6E2SESESESESW6SWS2WNW2NWNWNWN2WNWN4WNWNW3N"},
   {country:"Panama",
    country_id:"panama_main",
    origin_x:"91",
    origin_y:"179",
    border_data:"2E2N3E2S2EN3ESE2SESE4SWNWNWNWN2W2S2W2N2WN2WNWN"},
   {country:"Panama",
    country_id:"panama_mini",
    origin_x:"54",
    origin_y:"215",
    border_data:"2ESESES2ES3ES2EN2ENEN2EN7ES3ESESESE4SWSW2S2W2NW2NWNW2NWN3WSWSWS2WSWSE4S4W2NWN3WN2WN5W2NE6N"},
   {country:"Cuba",
    country_id:"cuba_main",
    origin_x:"98",
    origin_y:"149",
    border_data:"3ES4ES3ES2ESES2ES2ES2ES3E4S9W3N2WN3WN2WN2WN3WN3W2NENEN"},
   {country:"Argentina",
    country_id:"argentina_main",
    origin_x:"128",
    origin_y:"248",
    border_data:"2ES3ENENE2N2EN3ESESE3S5E3S2E3SESE3SWSWSWSW2SESESESESESESES3E2SWSWSWS5WNWNWNWSE2SESESE2SE3SWS2WS3W2SW2SES4W3S2E3S2W3SE2SWSESESESESW3SW2SW2S3WN2W2NW2NWNW3NW4NW4NW6NW6NW5NW3NW4NW7N7N7NENE2N"},
   {country:"Colombia",
    country_id:"colombia_main",
    origin_x:"108",
    origin_y:"175",
    border_data:"2ESE6SESES3E2SES2ES2E8SWS4WS2W3SW3SE5S4WN3W3NWNWNWN2WN3W4NENENE4NE5NE7N3ENWNENEN"},
   {country:"Peru",
    country_id:"peru_main",
    origin_x:"97",
    origin_y:"200",
    border_data:"2ES3ES2ESESESE3S3ES3E5SWSW2SW4SE4SES3EN3E3S3E5SW6SE5S4W2NWNWNW2NWN2WN2WNW2NW3NW2NWNW2NWNW2NW2NW2NWNW2NW2NW2NE2NENE2NWSWNW4NE2N"},
   {country:"Venezuela",
    country_id:"venezuela_main",
    origin_x:"113",
    origin_y:"174",
    border_data:"2EN2ESWSWSW2SENEN3ES2ES8EN3ESWS2ESESES2W5SW4SWS5W3SE3S3WS4W3NE8N2WN2WNW2N3WNWNW7N2EN"},
   {country:"Brazil",
    country_id:"brazil_main",
    origin_x:"133",
    origin_y:"182",
    border_data:"3ES2E3SES3ESES3ES3ES2E3SE4SW2SWSW3SES5E2N3ES2ESESES2ES6ES3ESES2ES2ES2ESE8SW2SWSW2SWSWSWSW7SE2SW5SWSW3SW3S4WS2WS3WS2W3SE5SW4SW3SWSWS3WNWNWNWNWNWNWNW2NENENENE3NWNW3N2W3N5W3NWNW5NW2N3WNW3N3WN2WNW3NE4N3W2SWS5W3W3N3WS3WNW4NW4NE2NENE5NE5NW3NE3N2EN4E2S4EN3E3NW3N5ENE4NE5N"},
   {country:"Brazil",
    country_id:"brazil_llha_marajo",
    origin_x:"152",
    origin_y:"200",
    border_data:"ESE3S4W2NENEN"},
   {country:"Chile",
    country_id:"chile_main",
    origin_x:"117",
    origin_y:"244",
    border_data:"4ESE2SESESESE7S7S8SE4SE3SE5SE6SE6SE4SE4SE3SESE2SE2S2ES4E2SWS5WNWNWNWNWNWNWNW3NWNWNW4NE2NW4NW2NW2NW6NW7NW4NW8N7NW7NW2NW2NW3N"},
   {country:"Chile",
    country_id:"chile_tierra_fuego",
    origin_x:"143",
    origin_y:"316",
    border_data:"2ESES2ES2ESES2WS4WN2WNW3NEN"},
   {country:"Bolivia",
    country_id:"bolivia_main",
    origin_x:"121",
    origin_y:"228",
    border_data:"5ENE2N3E4SW3SES2ES3E3SES3E2SE4S3WS2W2SWSWS3WN2W2SWSWNWNWNWNW2NW6NW6NE5N"},
   {country:"Soviet Union",
    country_id:"soviet_union_main",
    origin_x:"287",
    origin_y:"57",
    border_data:"5E2N3EN2E2S5ES2ES2ESE4S6WN3WSES2E3SESESE2NW2N3ES2E2NEN3E2N4EN2EN2EN8E2ES2E2NW3N3ES2ES3ESES2E2NWNWNWNW3NW2N5E5S2ESESE6S2WS3E2NE2N2E3N3WNWNWNW4N3E2SESES3EN2WNW3N2ES3ENWNW2N5E3N3EN3EN4ENENEN9E2ES2ESE4S3ES7ES2ES4E2N7ESE2S4ES9E2ENW3N9E4E2S3ES9EE2S2EN2E2N4EN4ES4EN7EN4ES4ES6ES5ES4E4S3WN7W3S4ESES2WSW5SWS6W5SES2ESE2SE2SESE8S2W2NWN2WN2WN2WNWNWNWNWNWNW2NENE5N2ENWNW4N2W4S5W5SE2S7WN3WS4W2SE2SW2SWSWSW2S5ES4ES2ESESE2SE2SE3SESESE9SW5SWSWSWNWSWS2W3NW3NENE4NE4N5WS3W3N3WS4WNW2NWNWNW2NWN7W6SW3S2W3SE3S3EN3E4SWS3WSWSWS4WSW3S9WS5WN4WN6WS3WNW2NWN6W5NWN2WN7W3S3WSW2S3W3S2E3SW3SWS2W5SE3S4W2N3W2S8WS2W2SWS3W4N5WN9WWNWNW2NW3NES2E3N2WSW4NWN3W2NEN2E2NWN5WS2WS3W2SESESESE2SESESE2SE4S3W2N5WN4W2N3WNE2NWNWN2WN2WNWN2WS2WS3WNW2N4WN2W2S3W3NW2NWN9WNE2NENE2NE5NW3N3WNE4N2E3NEN2EN3E2N3WSWS3WNWNW3NENENE2NE4NW2NE3NE2N"},
   {country:"Britain",
    country_id:"britain_main",
    origin_x:"244",
    origin_y:"78",
    border_data:"2ESES2E2SW2SWSESESE2SE2S2E3SW2S7WS5WNEN3ENEN2WNENWN2E2NWNW3NW3NENE2N"},
   {country:"Britain",
    country_id:"britain_ireland",
    origin_x:"238",
    origin_y:"86",
    border_data:"2EN2E6SWS2WS2W2NW2NE2NEN"},
   {country:"France",
    country_id:"france_main",
    origin_x:"243",
    origin_y:"98",
    border_data:"2ESE2NESES2ENEN2EN2ESESES2ESE6SW5S3WS2WSWS2WN2WN2WNW2NE2NE3NW3N2WNWNWN"},
   {country:"Spain",
    country_id:"spain_main",
    origin_x:"234",
    origin_y:"109",
    border_data:"3ES5ES5ES2ES2E2SW2SWSW4SWSWS2WS5WSWN5W2NW3NE5NE6N"},
   {country:"Italy",
    country_id:"italy_main",
    origin_x:"260",
    origin_y:"105",
    border_data:"4EN7E3SW2SE2SESE2SES4ESWS2ESES3W3SWSWSWS2W2NENE2NWN2WNWN2WNWNW2NWNWNWN2WS2W5NEN"},
   {country:"West Germany",
    country_id:"west_germany_main",
    origin_x:"265",
    origin_y:"82",
    border_data:"ENESE4SW6SW4SESE3SESESE2S7WS4W5NWN2WNWNWNW2N2ENENENEN2EN3E6NEN"},
   {country:"East Germany",
    country_id:"east_germany_main",
    origin_x:"267",
    origin_y:"88",
    border_data:"4ES2E8S6WNW4NE4N"},
   {country:"Poland",
    country_id:"poland_main",
    origin_x:"273",
    origin_y:"90",
    border_data:"3ENEN4EN4E3SE5SW2SWS5WN6W7N"},
   {country:"Czechoslovakia",
    country_id:"czechoslovakia_main",
    origin_x:"268",
    origin_y:"97",
    border_data:"9E2ES4E3S2E2SW2S2WN7WN4WNWNWNW3N"},
   {country:"Yugoslavia",
    country_id:"yugoslavia_main",
    origin_x:"271",
    origin_y:"103",
    border_data:"4ES7ES2E3SE2SE2SE3S3WS2W2N2WNWN2WNWNWNWNWN2W4N"},
   {country:"Romania",
    country_id:"romania_main",
    origin_x:"285",
    origin_y:"101",
    border_data:"6ESE2SE3S2ESW4SES8WNW2NW2NW5NE2N"},
   {country:"Greece",
    country_id:"greece_main",
    origin_x:"287",
    origin_y:"113",
    border_data:"6E3S2WSWSW3SE3SW2SW2N2W2SW3NW3NWNW3N2EN3E2N"},
   {country:"Sweden",
    country_id:"sweden_main",
    origin_x:"265",
    origin_y:"68",
    border_data:"3EN2ENENENENEN2ENENENE2NENE2NEN2ENESENESENE2SE2NES2ESW3S5W2SW3SWSW2SWSWSWSWSWSW3SE2SE3S2W3SW3SWS4WNWNW4NWN3WSWSWS3W4NE2NW2NENENE2NEN"},
   {country:"South Africa",
    country_id:"south_africa_main",
    origin_x:"281",
    origin_y:"259",
    border_data:"4EN3EN2E2NENE2NENE3NENENE2N3E3SE3SE4SWSW3S5E3SW2SW2SWSWSWSWSWSWSWS2WS6WS7WSWS2WNWNW4NW4NWNW2NW2NW6NW6NWNW2NWNW2NWNW2N9E7ESES3E8S4W6SE3S"},
   {country:"Egypt",
    country_id:"egypt_main",
    origin_x:"291",
    origin_y:"136",
    border_data:"3ES2EN2ES9E2SE3SW2SW2NWNWNW2SESE2SE2SESE2SESE2SESE2S2W2S3WN9W7W9N9N3N"},
   {country:"Tunisia",
    country_id:"tunisia_main",
    origin_x:"261",
    origin_y:"125",
    border_data:"4ES2ESWSE3SW2SE3S2W3S3W4NW2NW3NE5N"},
   {country:"Morocco",
    country_id:"morocco_main",
    origin_x:"229",
    origin_y:"134",
    border_data:"EN2EN2EN2E2NENENES4E2SE3SW3SWS3WS2WSWSWSWSWSW5S6WSW5S3W3S3WS4W2NE2NENE2NENENENENENENE2NENENENE6N"},
   {country:"Algeria",
    country_id:"algeria_main",
    origin_x:"243",
    origin_y:"127",
    border_data:"9EEN8E4SW3SE2SE4SE2SE9S2SE4SWS2WS2WSWSWS3WS5W2NWNWNWNWNWNWN2WNWNWNWNWNWN2WNWNWNW2NENENENENEN2EN3ENE3NE3NW3N"},
   {country:"Libya",
    country_id:"libya_main",
    origin_x:"265",
    origin_y:"136",
    border_data:"2E2N5ES2E2SES3EN2ES2E4NEN4ES2ES2E9S9S8S3WS3WN2WN2WN3WN2WNWN9WW4NW8N3NW2N2E3N"},
   {country:"Mali",
    country_id:"mali_main",
    origin_x:"237",
    origin_y:"151",
    border_data:"ENESESESES2ESESESESESESE2S2E2SE5SWS2WS6WS2WSWS2WSWSW2S7W2NWN4WNW4N4EN9EE4NW7N7N"},
   {country:"Nigeria",
    country_id:"nigeria_main",
    origin_x:"252",
    origin_y:"177",
    border_data:"6ES2ESES2EN2EN5E3SWSW2SW2SW2SWSWSWS4W3S4WNW2NW2N3W3NE4NE5N"},
   {country:"Sudan",
    country_id:"sudan_main",
    origin_x:"288",
    origin_y:"161",
    border_data:"3E4N9E7ES3E2N3E2SE5SE2SW9SSW3SWSWSWSW3SW2S2ESESESE2S2WSWS4WN3WNWN6WNWNWNWNWNWN2WNWNWNW6NW4NEN2E9N"},
   {country:"Ethiopia",
    country_id:"ethiopia_main",
    origin_x:"314",
    origin_y:"165",
    border_data:"2ESESE2SESESESESESE4SE2S8EN2EN4ENE3SWSW2SW3SW3SW2SWSW2SWSW2SWSW2SWSWSWSW2NW2NW6N6WN3WNW2NWNWNWN2W2NE3NENENENE3NE9NN"},
   {country:"Kenya",
    country_id:"kenya_main",
    origin_x:"303",
    origin_y:"192",
    border_data:"3ES4ENEN3ES3ES6E6SE2SE2SE2SWSWS2WSWSWSWS2WNWNWNWN2WNWN2W3N4WSW2S3W5NENE7N"},
   {country:"Zaire",
    country_id:"zaire_main",
    origin_x:"279",
    origin_y:"193",
    border_data:"2ES3EN3EN2EN3EN9EESE8SWSW5SE9S5SWS3WSW4SESES2E3S5WNWN2W2N2WN4WNW5NWN4WS4W3NW2N8WS3W3N3EN2EN3ENEN2ENENE2NE2NE4NW5N"},
   {country:"Tanzania",
    country_id:"tanzania_main",
    origin_x:"302",
    origin_y:"205",
    border_data:"2E2NEN4E3S2ESES2ESESESESE4SW2SE5SE2S4WS8W3N2WNWNWNW9N5N"},
   {country:"Mozambique",
    country_id:"mozambique_main",
    origin_x:"307",
    origin_y:"225",
    border_data:"8EN4E2SE6SE3S2WSWS2WSWSWSWSWSWSWSW4SE4SW2SWS2WSWSWS4W3NENE4NW3NW3NENENE3NE2NWNW3NEN4E7N"},
   {country:"Zambia",
    country_id:"zambia_main",
    origin_x:"289",
    origin_y:"225",
    border_data:"2ES2E2S2ESES5E3N2WNWNW4NEN3EN2ESESES2E9SS4WSWS3WSWS2WS2WSWS4W2SWS2W9N4N2ENE3N"},
   {country:"Angola",
    country_id:"angola_main",
    origin_x:"266",
    origin_y:"215",
    border_data:"2EN8E2SE3S4EN4ESE5SES2E3SWS2W9S4S5WNWN7W9W4NE2NE3NE2NE5NW7NW2N"},
   {country:"Mauritania",
    country_id:"mauritania_main",
    origin_x:"216",
    origin_y:"158",
    border_data:"3EN3E3N3E5NEN6E3NESESES2ESE2SW7S7SE4S9WWS6WNWNWNWN3W8N"},
   {country:"Guinea",
    country_id:"guinea_main",
    origin_x:"215",
    origin_y:"166",
    border_data:"4ESESESES2E4SES4ESE3SW3SE3SW2S2WNWSWS2WNWNWNW2NW3NW2NWNW3NW8N"},
   {country:"Ivory Coast",
    country_id:"ivory_coast_main",
    origin_x:"230",
    origin_y:"178",
    border_data:"5ESESESES3E3SW3SW4S5W6WN2WNWNWNENENES2E2NE3NW3NEN"},
   {country:"Burkina Faso",
    country_id:"burkina_faso_main",
    origin_x:"237",
    origin_y:"176",
    border_data:"ENEN2ENEN2EN5E2SESE2SE2S3WS7W3S4WNWNWNWN2E2N"},
   {country:"Ghana",
    country_id:"ghana_main",
    origin_x:"242",
    origin_y:"179",
    border_data:"7EN3E4SW4SW4SWS4WS6W4NE3NE3NE3N"},
   {country:"Niger",
    country_id:"niger_main",
    origin_x:"252",
    origin_y:"162",
    border_data:"3EN3ENENEN2EN2EN8E3SE9SSWSW8S6WS2WS2WNWN2WN6WNW2NWNW2NEN2ENE5NW2N"},
   {country:"Chad",
    country_id:"chad_main",
    origin_x:"272",
    origin_y:"156",
    border_data:"3ESES2ES3ES2ES2ES3E8S2WSW4SE6S2WS2WSW2SWS2WS3WN3W2NW3NW3NE8NENE9NNW3N"},
   {country:"Cameroon",
    country_id:"cameroon_main",
    origin_x:"269",
    origin_y:"181",
    border_data:"2E3SE5SW3SESESE3SWS9WSW2S4W3NE3NW4N4ENENENE2NE2NE2NEN"},
   {country:"Central Africa",
    country_id:"central_africa_main",
    origin_x:"272",
    origin_y:"186",
    border_data:"3ES3EN2ENE2NEN2EN3ESESES2ESESESESESES4WS3WS2WS3WS3WN2W3S5W2NWNWNW3NE3N"},
   {country:"Congo",
    country_id:"congo_main",
    origin_x:"258",
    origin_y:"202",
    border_data:"EN4E2NEN9ENEN5E2SE4SW2SW2SWSWS2WSWS3WS2WS4WNWN2WNWNW2NW4N"},
   {country:"Zimbabwe",
    country_id:"zimbabwe_main",
    origin_x:"292",
    origin_y:"239",
    border_data:"ENEN2EN2ENEN3E2SESE2SW3SWSWS6WNWNWNW2N"},
   {country:"Botswana",
    country_id:"botswana_main",
    origin_x:"284",
    origin_y:"242",
    border_data:"4ENE2N3E2SESESES2E2SWSWSW3SWSW2SWSW2S2WS3WS4W3NW6N4E8N"},
   {country:"Japan",
    country_id:"japan_hokkaido",
    origin_x:"473",
    origin_y:"97",
    border_data:"3ESES4EN2E4SES2WSWSWSW2NWSWSWNW5NWNW2N"},
   {country:"Japan",
    country_id:"japan_main",
    origin_x:"478",
    origin_y:"107",
    border_data:"3E2S2ESESESE6SE4S5W4S4W2N5W2NEN2ENE3N2ESENE3NWNW2NW4N"},
   {country:"Japan",
    country_id:"japan_kyushu",
    origin_x:"471",
    origin_y:"123",
    border_data:"E2SES3E3S2W2SWS2W3NWS2W4NE2N2EN"},
   {country:"North Korea",
    country_id:"north_korea_main",
    origin_x:"458",
    origin_y:"108",
    border_data:"4E3SW2SESE2SWSWSWSWS3WNW8NEN2E2N"},
   {country:"South Korea",
    country_id:"south_korea_main",
    origin_x:"461",
    origin_y:"117",
    border_data:"EN2ESE2SE5SWSWSWS3WNWNW5NENENEN"},
   {country:"Australia",
    country_id:"australia_main",
    origin_x:"440",
    origin_y:"248",
    border_data:"2ENE2N2EN3EN2EN3ESE2NENENEN2E2NENESE2NENENEN2ENENE2SES2E2NE2NEN9EEN2ESE3S2WS2WS2ESESESES2ESES2E4NE2NE2NENE3NENENE9SSE3SE4SESE7SESESE5SE4SW3SWSW2SWSW2SWSW2SWSWSWSW2SW2SWSWSWSWS2WSWSWSWSWS5WN2WN4WN2WNW3NE3NE2NE3NWSW2SWS2WNW2NW2NW2NWN3WS4WS2WS6WSW2S7WN2WSWS3WNW3NEN2E3NE5NW7N2E3NW3NENWN"},
   {country:"China",
    country_id:"china_main",
    origin_x:"382",
    origin_y:"99",
    border_data:"7ES2ESE5S6ESE2SES3EN6ES4ES5EN9E3NEN4ENENEN3ENE4N3WS3W3NW3N2E3NE6N7ESE2SESESE2SES4EN3E3S3EN5E4SW4SWSW3SE3SW2S2WSW2SWSWSWSWSW3NW3NWNW3SWSW3SES2ES5E3S2W2SESESESESESESWSE2SESE3SWSE2SW8SW2S2WSWS3WS4WS2W2S2W2N4WNWN3WS3WN3W3SWS3WN4WNW3NE5N2W3N2WN4WS2WS5WS4WN2WN2WN2WNWN2WNWN3WNWNWNWNW5NWN2W2N2WN4WNWNW3NW5N2ENE3NE3N2W3N3E2NEN3E3N"},
   {country:"Taiwan",
    country_id:"taiwan_main",
    origin_x:"462",
    origin_y:"141",
    border_data:"3ES2E6S2W2SW2SW3NWNW6NEN"},
   {country:"Vietnam",
    country_id:"vietnam_main",
    origin_x:"429",
    origin_y:"152",
    border_data:"3ES3EN3ESESESWSWSW5SESESE2SE2SESESESESE4SW2SWSWSWSWS2WS2WNENWNWNWNWNWNWNW3NEN3E5NW2NWN3W2N2W6NE3N"},
   {country:"Pakistan",
    country_id:"pakistan_main",
    origin_x:"354",
    origin_y:"139",
    border_data:"8ENE2NEN2EN2E3NENE4N2ENEN3ESE3SW4SESE3SWSW2SW2SW2SWS4WSW2SESE2SWS3WNWN2WN5WS4W2NENE3NWNW3N"},
   {country:"India",
    country_id:"india_main",
    origin_x:"377",
    origin_y:"125",
    border_data:"3ES2E2S2ESE5SESESESES3ESES2ESES2ES2ES2ES4EN5EN2EN4ES2E3S2WS2WSWSW5SWSW2SWNWNWSWSWN2W2SWSWS2W2SWSWSWSWSWSWS2WSW3SE3SWSWSESESWSW2SW2S3WNWNW2NW2NW2NW3NW3NW3NW3NW2NW4NE3NW2SW2S4W3NWNWNW3NENE2NWNW2NEN4ENE2NE2NE2NENE3NWNW4NE3N"},
   {country:"Burma",
    country_id:"burma_main",
    origin_x:"417",
    origin_y:"146",
    border_data:"4E5SW3SES4ES3E4S3W2SW3SE4SWS2W3NWNW2SWS2W2NW3NW2NW2NWNWNW3NENE5NENEN2EN"},
   {country:"Thailand",
    country_id:"thailand_main",
    origin_x:"425",
    origin_y:"160",
    border_data:"3ES2E2S3ESE2SE5S3WSW2SWNWNW5SW4SESESE2SE2SES2ESESESE8SWNWNWNWNWNWNW3NWNWNW2NWNWNW9NE3NW3NE4NW3NE2N"},
   {country:"Indonesia",
    country_id:"indonesia_sumatra",
    origin_x:"420",
    origin_y:"189",
    border_data:"2ES3ESES2ESESESESESESESESE2SESE2SESESESE2SE2SE2SWS2WN2WNWNWNW2NW2NWNWNWNW2NW2NW2NWNWNWNWNWNWNWN2W2N"},
   {country:"Indonesia",
    country_id:"indonesia_borneo",
    origin_x:"448",
    origin_y:"198",
    border_data:"4ENENENENENENENENE2N6E3S2W2SW2SW9S2SW6S3WN5WNWS2WNW9NW3N"},
   {country:"Indonesia",
    country_id:"indonesia_celebes",
    origin_x:"468",
    origin_y:"199",
    border_data:"7EN2E2S8WSW2S4E2S2WSW2SE4SW2NWNW5S2W4NW4NE4NENENEN"},
   {country:"Indonesia",
    country_id:"indonesia_new_guinea",
    origin_x:"489",
    origin_y:"201",
    border_data:"ESESE2SE2SESESEN2ENENENESESES2ES2ES2ES2ESES2ESESE4SESESESE3S3WN2WN2WN2WN2WSWS2WNWN3WN2W4NWNWNWN2WN2WNWNWNW2NW6N"},
   {country:"Philipppines",
    country_id:"philippines_luzon",
    origin_x:"463",
    origin_y:"158",
    border_data:"ES2ENESE3SW2SE3SW2SES2EN2ES2ES2ES9WWN2WNWNWNENEN2W4NE4N"},
   {country:"Philippines",
    country_id:"philippines_palawan",
    origin_x:"464",
    origin_y:"175",
    border_data:"2E3SWSWSWS2WNWNENENENEN"},
   {country:"Philippines",
    country_id:"philippines_panay",
    origin_x:"469",
    origin_y:"174",
    border_data:"3E4S4WNWNENEN"},
   {country:"Philippines",
    country_id:"philippines_samar",
    origin_x:"476",
    origin_y:"173",
    border_data:"2ESE2SE2S3WNWNW2NEN"},
   {country:"Philippines",
    country_id:"philippines_mindaneo",
    origin_x:"468",
    origin_y:"181",
    border_data:"2EN2ES2ES2ENE2N2ESESE3SWSE2SWS2WSWS3W2NWNW2N2WS2WNW3NEN"},
   {country:"Israel",
    country_id:"israel_main",
    origin_x:"308",
    origin_y:"131",
    border_data:"3E7SWSWSWNW3NE5N"},
   {country:"Israel",
    country_id:"israel_mini",
    origin_x:"26",
    origin_y:"272",
    border_data:"ESENE2N5E2NEN3E5S2W8SWS3WS2WSW2SW2SW3SWSW3SW3S2E2SWS2W3S2WSES4ENENEN2E2SW3SW4SW4SE2SW3SW4SW3SW3SW2SW2SW3S2W2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2N2ENEN2ENENENENENENENE2NE2NE2NE2NE2NE2NE2NE2NE4NE6N"},
   {country:"Syria",
    country_id:"syria_main",
    origin_x:"308",
    origin_y:"125",
    border_data:"3EN3EN5E4SW3S2W2S5W4N3W3N"},
   {country:"Turkey",
    country_id:"turkey_main",
    origin_x:"293",
    origin_y:"116",
    border_data:"3E2N9EEN2ES2ES9E2S4E6S9WS3WS5WN7WS4WNWNWNW3NE3N"},
   {country:"Iraq",
    country_id:"iraq_main",
    origin_x:"319",
    origin_y:"123",
    border_data:"4ESE5SESE2SESESESE5S6WNW2NWNWN3WN2W4N2E3NE4N"},
   {country:"Saudi Arabia",
    country_id:"saudi_arabia_main",
    origin_x:"315",
    origin_y:"135",
    border_data:"EN2ES3ESESE2SES6E2SESESE2SE2SE2S2ES4EN2EN3ES2ESESES2ES2ESW2SW2SWSW2SWSWSWSWSWS2WSWSWSWSWS3WS4WS2WS4WNWNW2NW5NWNW2NW3NWN2W3NW2NW3NWNWNW2NWNWNW5N6E5N"},
   {country:"Iran",
    country_id:"iran_main",
    origin_x:"323",
    origin_y:"118",
    border_data:"5E2S3E4S4EN3EN9EES5E9SSE3SW3SE3SESE3SWSW2S2WN2WNWN2WN3WS4WNWNWNWNWNWNWN4W4NWNWNWNW2NWNW5NW6N"},
   {country:"Afghanistan",
    country_id:"afghanistan_main",
    origin_x:"353",
    origin_y:"127",
    border_data:"3ENE2N2EN8E2N3E2S5ES2WSWS2W4SWSW3S2WS2WSW2SWS9W3NE3NW6N"},
   {country:"Jordan",
    country_id:"jordan_main",
    origin_x:"311",
    origin_y:"132",
    border_data:"5E3SW5S6WNENE6N"},
   {country:"Jordan",
    country_id:"jordan_mini",
    origin_x:"35",
    origin_y:"277",
    border_data:"ES2ES2ESESESESESES2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN3E3SE3SE3SE3SE3SE3SE3S2WS4WS3WS4WS4WS4WS3WS3WS2WSE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2S3W2SW2SWS2WS2WS2W2SWSWSWSWS5WS9W9W2W3NE2NE2NE3NE3NE4NE3NE2NW4NE4NE3NE2N2WSWSWS4WNWN2E3N2ENE2N2W3NE3NENE3NE2NE2NEN2EN3ENE3N"},
   {country:"Lebanon",
    country_id:"lebanon_main",
    origin_x:"308",
    origin_y:"128",
    border_data:"3E3S3W3N"},
   {country:"Lebanon",
    country_id:"lebanon_mini",
    origin_x:"36",
    origin_y:"247",
    border_data:"3EN5ES2E5SWSWSW2SW5S2W3SWSWSWS2WSW2S5W4NE7NE3NE2NE2NE2NENE2N"}

]

/*
   {country:"",
    country_id:"",
    origin_x:"",
    origin_y:"",
    border_data:},
*/


function drawMap() {

    const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
    const svg = document.querySelector("svg"); // targeting the svg itself

    const usa_main = document.querySelector("g#usa_main"); // targeting the united states div
    const usa_alaska = document.querySelector("g#usa_alaska"); 
    const canada_main = document.querySelector("g#canada_main");
    const canada_victoria = document.querySelector("g#canada_victoria");
    const mexico_main = document.querySelector("g#mexico_main"); 
 
    const guatemala_main = document.querySelector("g#guatemala_main");
    const guatemala_mini = document.querySelector("g#guatemala_mini");
    const el_salvador_main = document.querySelector("g#el_salvador_main");
    const el_salvador_mini = document.querySelector("g#el_salvador_mini");
    const honduras_main = document.querySelector("g#honduras_main");
    const honduras_mini = document.querySelector("g#honduras_mini");
    const nicaragua_main = document.querySelector("g#nicaragua_main");
    const nicaragua_mini = document.querySelector("g#nicaragua_mini");
    const costa_rica_main = document.querySelector("g#costa_rica_main");
    const costa_rica_mini = document.querySelector("g#costa_rica_mini");
    const panama_main = document.querySelector("g#panama_main");
    const panama_mini = document.querySelector("g#panama_mini");

    const cuba_main = document.querySelector("g#cuba_main");

    const argentina_main = document.querySelector("g#argentina_main");
    const colombia_main = document.querySelector("g#colombia_main");
    const peru_main = document.querySelector("g#peru_main");
    const venezuela_main = document.querySelector("g#venezuela_main");
    const brazil_main = document.querySelector("g#brazil_main");
    const brazil_llha_marajo = document.querySelector("g#brazil_llha_marajo");
    const chile_main = document.querySelector("g#chile_main");
    const chile_tierra_fuego = document.querySelector("g#chile_tierra_fuego");
    const bolivia_main = document.querySelector("g#bolivia_main");

    const soviet_union_main = document.querySelector("g#soviet_union_main");

    const britain_main = document.querySelector("g#britain_main");
    const britain_ireland = document.querySelector("g#britain_ireland");
    const france_main = document.querySelector("g#france_main");
    const spain_main = document.querySelector("g#spain_main");
    const italy_main = document.querySelector("g#italy_main");
    const west_germany_main = document.querySelector("g#west_germany_main");
    const east_germany_main = document.querySelector("g#east_germany_main");
    const poland_main = document.querySelector("g#poland_main");
    const czechoslovakia_main = document.querySelector("g#czechoslovakia_main");
    const yugoslavia_main = document.querySelector("g#yugoslavia_main");
    const romania_main = document.querySelector("g#romania_main");
    const greece_main = document.querySelector("g#greece_main");
    const sweden_main = document.querySelector("g#sweden_main");

    const south_africa_main = document.querySelector("g#south_africa_main");
    const egypt_main = document.querySelector("g#egypt_main");
    const tunisia_main = document.querySelector("g#tunisia_main");
    const morocco_main = document.querySelector("g#morocco_main");
    const algeria_main = document.querySelector("g#algeria_main");
    const libya_main = document.querySelector("g#libya_main");
    const mali_main = document.querySelector("g#mali_main");
    const nigeria_main = document.querySelector("g#nigeria_main");
    const sudan_main = document.querySelector("g#sudan_main");
    const ethiopia_main = document.querySelector("g#ethiopia_main");
    const kenya_main = document.querySelector("g#kenya_main");
    const zaire_main = document.querySelector("g#zaire_main");
    const tanzania_main = document.querySelector("g#tanzania_main");
    const mozambique_main = document.querySelector("g#mozambique_main");
    const zambia_main = document.querySelector("g#zambia_main");
    const angola_main = document.querySelector("g#angola_main");
    const mauriania_main = document.querySelector("g#mauritania_main");
    const guinea_main = document.querySelector("g#guinea_main");
    const ivory_coast_main = document.querySelector("g#ivory_coast_main");
    const burkina_faso_main = document.querySelector("g#burkina_faso_main");
    const ghana_main = document.querySelector("g#ghana_main");
    const niger_main = document.querySelector("g#niger_main");
    const chad_main = document.querySelector("g#chad_main");
    const cameroon_main = document.querySelector("g#cameroon_main");
    const central_africa_main = document.querySelector("g#central_africa_main");
    const congo_main = document.querySelector("g#congo_main");
    const zimbabwe_main = document.querySelector("g#zimbabwe_main");
    const botswana_main = document.querySelector("g#botswana_main");

    const japan_hokkaido = document.querySelector("g#japan_hokkaido");
    const japan_main = document.querySelector("g#japan_main");
    const japan_kyushu = document.querySelector("g#japan_kyushu");
    const north_korea_main = document.querySelector("g#north_korea_main");
    const south_korea_main = document.querySelector("g#south_korea_main");
    const australia_main = document.querySelector("g#australia_main");
    const china_main = document.querySelector("g#china_main");
    const taiwan_main = document.querySelector("g#taiwan_main");
    const vietnam_main = document.querySelector("g#vietnam_main");
    const pakistan_main = document.querySelector("g#pakistan_main");
    const india_main = document.querySelector("g#india_main");
    const burma_main = document.querySelector("g#burma_main");
    const thailand_main = document.querySelector("g#thailand_main");
    const indonesia_sumatra = document.querySelector("g#indonesia_sumatra");
    const indonesia_borneo = document.querySelector("g#indonesia_borneo");
    const indonesia_celebes = document.querySelector("g#indonesia_celebes");
    const indonesia_new_guinea = document.querySelector("g#indonesia_new_guinea");
    const philippines_luzon = document.querySelector("g#philippines_luzon");
    const philippines_palawan = document.querySelector("g#philippines_palawan");
    const philippines_panay = document.querySelector("g#philippines_panay");
    const philippines_samar = document.querySelector("g#philippines_samar");
    const philippines_mindaneo = document.querySelector("g#philippines_mindaneo");

    const israel_main = document.querySelector("g#israel_main");
    const israel_mini = document.querySelector("g#israel_mini");
    const syria_main = document.querySelector("g#syria_main");
    const turkey_main = document.querySelector("g#turkey_main");
    const iraq_main = document.querySelector("g#iraq_main");
    const saudi_arabia_main = document.querySelector("g#saudi_arabia_main");
    const iran_main = document.querySelector("g#iran_main");
    const afghanistan_main = document.querySelector("g#afghanistan_main");
    const jordan_main = document.querySelector("g#jordan_main");
    const jordan_mini = document.querySelector("g#jordan_mini");
    const lebanon_main = document.querySelector("g#lebanon_main");
    const lebanon_mini = document.querySelector("g#lebanon_mini");

    //const _main = document.querySelector("g#_main");
    //const _main = document.querySelector("g#_main");
    //const _mini = document.querySelector("g#_mini");

    const stroke_default = "black";
    const fill_default = "none";

    let country_svg = [map_data.length - 1];
    let country_polygon = [map_data.length - 1]; 
    let outline = "";

    map_data.forEach((country, index) => {
    
        outline = createOutline(country.origin_x, country.origin_y, country.border_data);
        country_polygon[index] = document.createElementNS(svgns, "polygon");
    
        country_polygon[index].setAttribute("points", outline);
        country_polygon[index].setAttribute("stroke", stroke_default);
        country_polygon[index].setAttribute("fill", fill_default);
    
        country_svg[index] = country_polygon[index];
    
        switch (country.country_id) {
            case "usa_main":
                usa_main.appendChild(country_svg[index]);
                break;
            case "usa_alaska":
                usa_alaska.appendChild(country_svg[index]);
                break;
            case "canada_main":
                canada_main.appendChild(country_svg[index]);
                break;
            case "canada_victoria":
                canada_victoria.appendChild(country_svg[index]);
                break;
            case "mexico_main":
                mexico_main.appendChild(country_svg[index]);
                break;
            case "guatemala_main":
                guatemala_main.appendChild(country_svg[index]);
                break;
            case "guatemala_mini":
                guatemala_mini.appendChild(country_svg[index]);
                break;
            case "el_salvador_main":
                el_salvador_main.appendChild(country_svg[index]);
                break;
            case "el_salvador_mini":
                el_salvador_mini.appendChild(country_svg[index]);
                break;
            case "honduras_main":
                honduras_main.appendChild(country_svg[index]);
                break;
            case "honduras_mini":
                honduras_mini.appendChild(country_svg[index]);
                break;
            case "nicaragua_main":
                nicaragua_main.appendChild(country_svg[index]);
                break;
            case "nicaragua_mini":
                nicaragua_mini.appendChild(country_svg[index]);
                break;
            case "costa_rica_main":
                costa_rica_main.appendChild(country_svg[index]);
                break;
            case "costa_rica_mini":
                costa_rica_mini.appendChild(country_svg[index]);
                break;
            case "panama_main":
                panama_main.appendChild(country_svg[index]);
                break;
            case "panama_mini":
                panama_mini.appendChild(country_svg[index]);
                break;
            case "cuba_main":
                cuba_main.appendChild(country_svg[index]);
                break;
            case "argentina_main":
                argentina_main.appendChild(country_svg[index]);
                break;
            case "colombia_main":
                colombia_main.appendChild(country_svg[index]);
                break;
            case "peru_main":
                peru_main.appendChild(country_svg[index]);
                break;
            case "venezuela_main":
                venezuela_main.appendChild(country_svg[index]);
                break;
            case "brazil_main":
                brazil_main.appendChild(country_svg[index]);
                break;
            case "brazil_llha_marajo":
                brazil_llha_marajo.appendChild(country_svg[index]);
                break;
            case "chile_main":
                chile_main.appendChild(country_svg[index]);
                break;
            case "chile_tierra_fuego":
                chile_tierra_fuego.appendChild(country_svg[index]);
                break;
            case "bolivia_main":
                bolivia_main.appendChild(country_svg[index]);
                break;
            case "soviet_union_main":
                soviet_union_main.appendChild(country_svg[index]);
                break;
            case "britain_main":
                britain_main.appendChild(country_svg[index]);
                break;
            case "britain_ireland":
                britain_ireland.appendChild(country_svg[index]);
                break;
            case "france_main":
                france_main.appendChild(country_svg[index]);
                break;
            case "spain_main":
                spain_main.appendChild(country_svg[index]);
                break;
            case "italy_main":
                italy_main.appendChild(country_svg[index]);
                break;
            case "west_germany_main":
                west_germany_main.appendChild(country_svg[index]);
                break;
            case "east_germany_main":
                east_germany_main.appendChild(country_svg[index]);
                break;
            case "poland_main":
                poland_main.appendChild(country_svg[index]);
                break;
            case "czechoslovakia_main":
                czechoslovakia_main.appendChild(country_svg[index]);
                break;
            case "yugoslavia_main":
                yugoslavia_main.appendChild(country_svg[index]);
                break;
            case "romania_main":
                romania_main.appendChild(country_svg[index]);
                break;
            case "greece_main":
                greece_main.appendChild(country_svg[index]);
                break;
            case "sweden_main":
                sweden_main.appendChild(country_svg[index]);
                break;
            case "south_africa_main":
                south_africa_main.appendChild(country_svg[index]);
                break;
            case "egypt_main":
                egypt_main.appendChild(country_svg[index]);
                break;
            case "tunisia_main":
                tunisia_main.appendChild(country_svg[index]);
                break;
            case "morocco_main":
                morocco_main.appendChild(country_svg[index]);
                break;
            case "algeria_main":
                algeria_main.appendChild(country_svg[index]);
                break;
            case "libya_main":
                libya_main.appendChild(country_svg[index]);
                break;
            case "mali_main":
                mali_main.appendChild(country_svg[index]);
                break;
            case "nigeria_main":
                nigeria_main.appendChild(country_svg[index]);
                break;
            case "sudan_main":
                sudan_main.appendChild(country_svg[index]);
                break;
            case "ethiopia_main":
                ethiopia_main.appendChild(country_svg[index]);
                break;
            case "kenya_main":
                kenya_main.appendChild(country_svg[index]);
                break;
            case "zaire_main":
                zaire_main.appendChild(country_svg[index]);
                break;
            case "tanzania_main":
                tanzania_main.appendChild(country_svg[index]);
                break;
            case "mozambique_main":
                mozambique_main.appendChild(country_svg[index]);
                break;
            case "zambia_main":
                zambia_main.appendChild(country_svg[index]);
                break;
            case "angola_main":
                angola_main.appendChild(country_svg[index]);
                break;
            case "mauritania_main":
                mauritania_main.appendChild(country_svg[index]);
                break;
            case "guinea_main":
                guinea_main.appendChild(country_svg[index]);
                break;
            case "ivory_coast_main":
                ivory_coast_main.appendChild(country_svg[index]);
                break;
            case "burkina_faso_main":
                burkina_faso_main.appendChild(country_svg[index]);
                break;
            case "ghana_main":
                ghana_main.appendChild(country_svg[index]);
                break;
            case "niger_main":
                niger_main.appendChild(country_svg[index]);
                break;
            case "chad_main":
                chad_main.appendChild(country_svg[index]);
                break;
            case "cameroon_main":
                cameroon_main.appendChild(country_svg[index]);
                break;
            case "central_africa_main":
                central_africa_main.appendChild(country_svg[index]);
                break;
            case "congo_main":
                congo_main.appendChild(country_svg[index]);
                break;
            case "zimbabwe_main":
                zimbabwe_main.appendChild(country_svg[index]);
                break;
            case "botswana_main":
                botswana_main.appendChild(country_svg[index]);
                break;
            case "japan_hokkaido":
                japan_hokkaido.appendChild(country_svg[index]);
                break;
            case "japan_main":
               japan_main.appendChild(country_svg[index]);
               break;
            case "japan_kyushu":
               japan_kyushu.appendChild(country_svg[index]);
               break;
            case "north_korea_main":
               north_korea_main.appendChild(country_svg[index]);
               break;
            case "south_korea_main":
               south_korea_main.appendChild(country_svg[index]);
               break;
            case "australia_main":
               australia_main.appendChild(country_svg[index]);
               break;
            case "china_main":
               china_main.appendChild(country_svg[index]);
               break;
            case "taiwan_main":
               taiwan_main.appendChild(country_svg[index]);
               break;
            case "vietnam_main":
               vietnam_main.appendChild(country_svg[index]);
               break;
            case "pakistan_main":
               pakistan_main.appendChild(country_svg[index]);
               break;
            case "india_main":
               india_main.appendChild(country_svg[index]);
               break;
            case "burma_main":
               burma_main.appendChild(country_svg[index]);
               break;
            case "thailand_main":
               thailand_main.appendChild(country_svg[index]);
               break;
            case "indonesia_sumatra":
               indonesia_sumatra.appendChild(country_svg[index]);
               break;
            case "indonesia_borneo":
               indonesia_borneo.appendChild(country_svg[index]);
               break;
            case "indonesia_celebes":
               indonesia_celebes.appendChild(country_svg[index]);
               break;
            case "indonesia_new_guinea":
               indonesia_new_guinea.appendChild(country_svg[index]);
               break;
            case "philippines_luzon":
               philippines_luzon.appendChild(country_svg[index]);
               break;
            case "philippines_palawan":
               philippines_palawan.appendChild(country_svg[index]);
               break;
            case "philippines_panay":
               philippines_panay.appendChild(country_svg[index]);
               break;
            case "philippines_samar":
               philippines_samar.appendChild(country_svg[index]);
               break;
            case "philippines_mindaneo":
               philippines_mindaneo.appendChild(country_svg[index]);
               break;
            case "israel_main":
                israel_main.appendChild(country_svg[index]);
                break;
            case "israel_mini":
                israel_mini.appendChild(country_svg[index]);
                break;
            case "syria_main":
                syria_main.appendChild(country_svg[index]);
                break;
            case "turkey_main":
                turkey_main.appendChild(country_svg[index]);
                break;
            case "iraq_main":
                iraq_main.appendChild(country_svg[index]);
                break;
            case "saudi_arabia_main":
                saudi_arabia_main.appendChild(country_svg[index]);
                break;
            case "iran_main":
                iran_main.appendChild(country_svg[index]);
                break;
            case "afghanistan_main":
                afghanistan_main.appendChild(country_svg[index]);
                break;
            case "jordan_main":
                jordan_main.appendChild(country_svg[index]);
                break;
            case "jordan_mini":
                jordan_mini.appendChild(country_svg[index]);
                break;
            case "lebanon_main":
                lebanon_main.appendChild(country_svg[index]);
                break;
            case "lebanon_mini":
                lebanon_mini.appendChild(country_svg[index]);
                break;
            default:
        }
    });
}

/*
            case "":
                .appendChild(country_svg[index]);
                break;
*/
 
function createOutline(origin_x, origin_y, direction_string) {
    var points = "";
    var current_x = parseInt(origin_x);
    var current_y = parseInt(origin_y);
    
    for (let i = 0; i <= direction_string.length; i++) {
        points = points + current_x.toString() + "," + current_y.toString() + " ";
        

        k = direction_string.substr(i, 1).charCodeAt(0) - 49;
        l = i + 1;

        if (k < 0 || k > 8) {
            k = 1;
            l = i;
        }

        direction = direction_string[l];

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
    
    return points;
}

function drawMap_2024() {

    const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
    const svg = document.querySelector("svg"); // targeting the svg itself

    const usa_main = document.querySelector("g#usa_main"); // targeting the united states div // changed from "path#usa_main" to "g#usa_main" (same for Canada and Mexico)
    const canada_main = document.querySelector("g#canada_main");
    const mexico_main = document.querySelector("g#mexico_main");
    
    const guatemala_main = document.querySelector("g#guatemala_main");
    const guatemala_mini = document.querySelector("g#guatemala_mini");
    const el_salvador_main = document.querySelector("g#el_salvador_main");
    const el_salvador_mini = document.querySelector("g#el_salvador_mini");
    const honduras_main = document.querySelector("g#honduras_main");
    const honduras_mini = document.querySelector("g#honduras_mini");
    const nicaragua_main = document.querySelector("g#nicaragua_main");
    const nicaragua_mini = document.querySelector("g#nicaragua_mini");
    const costa_rica_main = document.querySelector("g#costa_rica_main");
    const costa_rica_mini = document.querySelector("g#costa_rica_mini");
    const panama_main = document.querySelector("g#panama_main");
    const panama_mini = document.querySelector("g#panama_mini");

    const cuba_main = document.querySelector("g#cuba_main");

    const argentina_main = document.querySelector("g#argentina_main");
    const colombia_main = document.querySelector("g#colombia_main");
    const peru_main = document.querySelector("g#peru_main");
    const venezuela_main = document.querySelector("g#venezuela_main");
    const brazil_main = document.querySelector("g#brazil_main");
    const brazil_llha_marajo = document.querySelector("g#brazil_llha_marajo");
    const chile_main = document.querySelector("g#chile_main");
    const chile_tierra_fuego = document.querySelector("g#chile_tierra_fuego");
    const bolivia_main = document.querySelector("g#bolivia_main");

    const soviet_union_main = document.querySelector("g#soviet_union_main");

    const britain_main = document.querySelector("g#britain_main");
    const britain_ireland = document.querySelector("g#britain_ireland");
    const france_main = document.querySelector("g#france_main");
    const spain_main = document.querySelector("g#spain_main");
    const italy_main = document.querySelector("g#italy_main");
    const west_germany_main = document.querySelector("g#west_germany_main");
    const east_germany_main = document.querySelector("g#east_germany_main");
    const poland_main = document.querySelector("g#poland_main");
    const czechoslovakia_main = document.querySelector("g#czechoslovakia_main");
    const yugoslavia_main = document.querySelector("g#yugoslavia_main");
    const romania_main = document.querySelector("g#romania_main");
    const greece_main = document.querySelector("g#greece_main");
    const sweden_main = document.querySelector("g#sweden_main");

    const south_africa_main = document.querySelector("g#south_africa_main");
    const egypt_main = document.querySelector("g#egypt_main");
    const tunisia_main = document.querySelector("g#tunisia_main");
    const morocco_main = document.querySelector("g#morocco_main");
    const algeria_main = document.querySelector("g#algeria_main");
    const libya_main = document.querySelector("g#libya_main");
    const mali_main = document.querySelector("g#mali_main");
    const nigeria_main = document.querySelector("g#nigeria_main");
    const sudan_main = document.querySelector("g#sudan_main");
    const ethiopia_main = document.querySelector("g#ethiopia_main");
    const kenya_main = document.querySelector("g#kenya_main");
    const zaire_main = document.querySelector("g#zaire_main");
    const tanzania_main = document.querySelector("g#tanzania_main");
    const mozambique_main = document.querySelector("g#mozambique_main");
    const zambia_main = document.querySelector("g#zambia_main");
    const angola_main = document.querySelector("g#angola_main");
    const mauriania_main = document.querySelector("g#mauritania_main");
    const guinea_main = document.querySelector("g#guinea_main");
    const ivory_coast_main = document.querySelector("g#ivory_coast_main");
    const burkina_faso_main = document.querySelector("g#burkina_faso_main");
    const ghana_main = document.querySelector("g#ghana_main");
    const niger_main = document.querySelector("g#niger_main");
    const chad_main = document.querySelector("g#chad_main");
    const cameroon_main = document.querySelector("g#cameroon_main");
    const central_africa_main = document.querySelector("g#central_africa_main");
    const congo_main = document.querySelector("g#congo_main");
    const zimbabwe_main = document.querySelector("g#zimbabwe_main");
    const botswana_main = document.querySelector("g#botswana_main");

    const japan_hokkaido = document.querySelector("g#japan_hokkaido");
    const japan_main = document.querySelector("g#japan_main");
    const japan_kyushu = document.querySelector("g#japan_kyushu");
    const north_korea_main = document.querySelector("g#north_korea_main");
    const south_korea_main = document.querySelector("g#south_korea_main");
    const australia_main = document.querySelector("g#australia_main");
    const china_main = document.querySelector("g#china_main");
    const taiwan_main = document.querySelector("g#taiwan_main");
    const vietnam_main = document.querySelector("g#vietnam_main");
    const pakistan_main = document.querySelector("g#pakistan_main");
    const india_main = document.querySelector("g#india_main");
    const burma_main = document.querySelector("g#burma_main");
    const thailand_main = document.querySelector("g#thailand_main");
    const indonesia_sumatra = document.querySelector("g#indonesia_sumatra");
    const indonesia_borneo = document.querySelector("g#indonesia_borneo");
    const indonesia_celebes = document.querySelector("g#indonesia_celebes");
    const indonesia_new_guinea = document.querySelector("g#indonesia_new_guinea");
    const philippines_luzon = document.querySelector("g#philippines_luzon");
    const philippines_palawan = document.querySelector("g#philippines_palawan");
    const philippines_panay = document.querySelector("g#philippines_panay");
    const philippines_samar = document.querySelector("g#philippines_samar");
    const philippines_mindaneo = document.querySelector("g#philippines_mindaneo");

    const israel_main = document.querySelector("g#israel_main");
    const israel_mini = document.querySelector("g#israel_mini");
    const syria_main = document.querySelector("g#syria_main");
    const turkey_main = document.querySelector("g#turkey_main");
    const iraq_main = document.querySelector("g#iraq_main");
    const saudi_arabia_main = document.querySelector("g#saudi_arabia_main");
    const iran_main = document.querySelector("g#iran_main");
    const afghanistan_main = document.querySelector("g#afghanistan_main");
    const jordan_main = document.querySelector("g#jordan_main");
    const jordan_mini = document.querySelector("g#jordan_mini");
    const lebanon_main = document.querySelector("g#lebanon_main");
    const lebanon_mini = document.querySelector("g#lebanon_mini");
 
    const stroke_default = "black";
    const stroke_width = "1";
    const fill_default = "none";

    map_data_2024.forEach((country, index) => { // was originally map_data_NEW
        
        let country_svg = []; //[map_data.length - 1];
        let country_path = []; //[map_data.length - 1]; 
        let outline = "";

        //outline = createOutline(country.origin_x, country.origin_y, country.border_data);

        outline = createOutline_NEWER(country.map_data); //.apply(null, country.map_data);
        country_path[index] = document.createElementNS(svgns, "path");

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
            case "guatemala_main":
                guatemala_main.appendChild(country_svg[index]);
                break;
            case "guatemala_mini":
                guatemala_mini.appendChild(country_svg[index]);
                break;
            case "el_salvador_main":
                el_salvador_main.appendChild(country_svg[index]);
                break;
            case "el_salvador_mini":
                el_salvador_mini.appendChild(country_svg[index]);
                break;
            case "honduras_main":
                honduras_main.appendChild(country_svg[index]);
                break;
            case "honduras_mini":
                honduras_mini.appendChild(country_svg[index]);
                break;
            case "nicaragua_main":
                nicaragua_main.appendChild(country_svg[index]);
                break;
            case "nicaragua_mini":
                nicaragua_mini.appendChild(country_svg[index]);
                break;
            case "costa_rica_main":
                costa_rica_main.appendChild(country_svg[index]);
                break;
            case "costa_rica_mini":
                costa_rica_mini.appendChild(country_svg[index]);
                break;
            case "panama_main":
                panama_main.appendChild(country_svg[index]);
                break;
            case "panama_mini":
                panama_mini.appendChild(country_svg[index]);
                break;
            case "cuba_main":
                cuba_main.appendChild(country_svg[index]);
                break;
            case "argentina_main":
                argentina_main.appendChild(country_svg[index]);
                break;
            case "colombia_main":
                colombia_main.appendChild(country_svg[index]);
                break;
            case "peru_main":
                peru_main.appendChild(country_svg[index]);
                break;
            case "venezuela_main":
                venezuela_main.appendChild(country_svg[index]);
                break;
            case "brazil_main":
                brazil_main.appendChild(country_svg[index]);
                break;
            case "brazil_llha_marajo":
                brazil_llha_marajo.appendChild(country_svg[index]);
                break;
            case "chile_main":
                chile_main.appendChild(country_svg[index]);
                break;
            case "chile_tierra_fuego":
                chile_tierra_fuego.appendChild(country_svg[index]);
                break;
            case "bolivia_main":
                bolivia_main.appendChild(country_svg[index]);
                break;
            case "soviet_union_main":
                soviet_union_main.appendChild(country_svg[index]);
                break;
            case "britain_main":
                britain_main.appendChild(country_svg[index]);
                break;
            case "britain_ireland":
                britain_ireland.appendChild(country_svg[index]);
                break;
            case "france_main":
                france_main.appendChild(country_svg[index]);
                break;
            case "spain_main":
                spain_main.appendChild(country_svg[index]);
                break;
            case "italy_main":
                italy_main.appendChild(country_svg[index]);
                break;
            case "west_germany_main":
                west_germany_main.appendChild(country_svg[index]);
                break;
            case "east_germany_main":
                east_germany_main.appendChild(country_svg[index]);
                break;
            case "poland_main":
                poland_main.appendChild(country_svg[index]);
                break;
            case "czechoslovakia_main":
                czechoslovakia_main.appendChild(country_svg[index]);
                break;
            case "yugoslavia_main":
                yugoslavia_main.appendChild(country_svg[index]);
                break;
            case "romania_main":
                romania_main.appendChild(country_svg[index]);
                break;
            case "greece_main":
                greece_main.appendChild(country_svg[index]);
                break;
            case "sweden_main":
                sweden_main.appendChild(country_svg[index]);
                break;
            case "south_africa_main":
                south_africa_main.appendChild(country_svg[index]);
                break;
            case "egypt_main":
                egypt_main.appendChild(country_svg[index]);
                break;
            case "tunisia_main":
                tunisia_main.appendChild(country_svg[index]);
                break;
            case "morocco_main":
                morocco_main.appendChild(country_svg[index]);
                break;
            case "algeria_main":
                algeria_main.appendChild(country_svg[index]);
                break;
            case "libya_main":
                libya_main.appendChild(country_svg[index]);
                break;
            case "mali_main":
                mali_main.appendChild(country_svg[index]);
                break;
            case "nigeria_main":
                nigeria_main.appendChild(country_svg[index]);
                break;
            case "sudan_main":
                sudan_main.appendChild(country_svg[index]);
                break;
            case "ethiopia_main":
                ethiopia_main.appendChild(country_svg[index]);
                break;
            case "kenya_main":
                kenya_main.appendChild(country_svg[index]);
                break;
            case "zaire_main":
                zaire_main.appendChild(country_svg[index]);
                break;
            case "tanzania_main":
                tanzania_main.appendChild(country_svg[index]);
                break;
            case "mozambique_main":
                mozambique_main.appendChild(country_svg[index]);
                break;
            case "zambia_main":
                zambia_main.appendChild(country_svg[index]);
                break;
            case "angola_main":
                angola_main.appendChild(country_svg[index]);
                break;
            case "mauritania_main":
                mauritania_main.appendChild(country_svg[index]);
                break;
            case "guinea_main":
                guinea_main.appendChild(country_svg[index]);
                break;
            case "ivory_coast_main":
                ivory_coast_main.appendChild(country_svg[index]);
                break;
            case "burkina_faso_main":
                burkina_faso_main.appendChild(country_svg[index]);
                break;
            case "ghana_main":
                ghana_main.appendChild(country_svg[index]);
                break;
            case "niger_main":
                niger_main.appendChild(country_svg[index]);
                break;
            case "chad_main":
                chad_main.appendChild(country_svg[index]);
                break;
            case "cameroon_main":
                cameroon_main.appendChild(country_svg[index]);
                break;
            case "central_africa_main":
                central_africa_main.appendChild(country_svg[index]);
                break;
            case "congo_main":
                congo_main.appendChild(country_svg[index]);
                break;
            case "zimbabwe_main":
                zimbabwe_main.appendChild(country_svg[index]);
                break;
            case "botswana_main":
                botswana_main.appendChild(country_svg[index]);
                break;
            case "japan_hokkaido":
                japan_hokkaido.appendChild(country_svg[index]);
                break;
            case "japan_main":
               japan_main.appendChild(country_svg[index]);
               break;
            case "japan_kyushu":
               japan_kyushu.appendChild(country_svg[index]);
               break;
            case "north_korea_main":
               north_korea_main.appendChild(country_svg[index]);
               break;
            case "south_korea_main":
               south_korea_main.appendChild(country_svg[index]);
               break;
            case "australia_main":
               australia_main.appendChild(country_svg[index]);
               break;
            case "china_main":
               china_main.appendChild(country_svg[index]);
               break;
            case "taiwan_main":
               taiwan_main.appendChild(country_svg[index]);
               break;
            case "vietnam_main":
               vietnam_main.appendChild(country_svg[index]);
               break;
            case "pakistan_main":
               pakistan_main.appendChild(country_svg[index]);
               break;
            case "india_main":
               india_main.appendChild(country_svg[index]);
               break;
            case "burma_main":
               burma_main.appendChild(country_svg[index]);
               break;
            case "thailand_main":
               thailand_main.appendChild(country_svg[index]);
               break;
            case "indonesia_sumatra":
               indonesia_sumatra.appendChild(country_svg[index]);
               break;
            case "indonesia_borneo":
               indonesia_borneo.appendChild(country_svg[index]);
               break;
            case "indonesia_celebes":
               indonesia_celebes.appendChild(country_svg[index]);
               break;
            case "indonesia_new_guinea":
               indonesia_new_guinea.appendChild(country_svg[index]);
               break;
            case "philippines_luzon":
               philippines_luzon.appendChild(country_svg[index]);
               break;
            case "philippines_palawan":
               philippines_palawan.appendChild(country_svg[index]);
               break;
            case "philippines_panay":
               philippines_panay.appendChild(country_svg[index]);
               break;
            case "philippines_samar":
               philippines_samar.appendChild(country_svg[index]);
               break;
            case "philippines_mindaneo":
               philippines_mindaneo.appendChild(country_svg[index]);
               break;
            case "israel_main":
                israel_main.appendChild(country_svg[index]);
                break;
            case "israel_mini":
                israel_mini.appendChild(country_svg[index]);
                break;
            case "syria_main":
                syria_main.appendChild(country_svg[index]);
                break;
            case "turkey_main":
                turkey_main.appendChild(country_svg[index]);
                break;
            case "iraq_main":
                iraq_main.appendChild(country_svg[index]);
                break;
            case "saudi_arabia_main":
                saudi_arabia_main.appendChild(country_svg[index]);
                break;
            case "iran_main":
                iran_main.appendChild(country_svg[index]);
                break;
            case "afghanistan_main":
                afghanistan_main.appendChild(country_svg[index]);
                break;
            case "jordan_main":
                jordan_main.appendChild(country_svg[index]);
                break;
            case "jordan_mini":
                jordan_mini.appendChild(country_svg[index]);
                break;
            case "lebanon_main":
                lebanon_main.appendChild(country_svg[index]);
                break;
            case "lebanon_mini":
                lebanon_mini.appendChild(country_svg[index]);
                break;
            default:
        }
    });
  
}

function main() {
    var which_one = 4;

    switch (which_one) {
        case 1:
            drawMap();
            break;
        case 2:
            drawMap_NEW();
            break;
        case 3:
            drawMap_NEWER();
            break;
        case 4:
            drawMap_2024();
            break;
    }
}

const map_data_2024 =[
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
     ]},
    {country_id:"guatemala_main",
     country_name:"Guatemala",
     map_data: [
        {origin_x:"83", origin_y:"159", border_data:"3E3SESWSWSW2S2WSWNWNWNW2NEN4E3N"},
        {origin_x:"14", origin_y:"170", border_data:"9E9SESES2ES2WSWS2W5S4WS2WS2WN3WN2WN2WNWNW3NENENENEN7E3NWNWNW2NE2N"}
     ]},
    {country_id: "el_salvador_main",
     country_name: "El Salvador",
     map_data: [
        {origin_x:"82", origin_y:"168", border_data:"2ESE2SWN2W2N"},
        {origin_x:"16", origin_y:"190", border_data:"2EN5ES3ES3E4S6WN4WN2WNW2N"}
     ]},
     {country_id:"honduras_main",
      country_name:"Honduras",
      map_data: [
        {origin_x:"86", origin_y:"164", border_data:"7ESES3WSWSWSWS2WSW2NW3NENEN"},
        {origin_x:"27", origin_y:"181",border_data:"7ES6EN7ESES2ESESESES3WSWS2WNWN2WSWSWSWS4WS2W2SWSWS2WN2W4N3WN3WNW5N2ENEN2EN"}
      ]},
    {country_id: "nicaragua_main",
     country_name: "Nicaragua",
     map_data: [
        {origin_x:"86", origin_y:"170", border_data:"2ENENENEN3ESW4SW4SWS3W3N2WNWNEN"},
        {origin_x:"30", origin_y:"196", border_data:"3ENENE2N2EN4ENENENEN2ESES2ENEN3E5SW2SW7SW8S5WN2WN2WS2WNWNWNWNW2NWNWNWNWNW2N"}
     ]},
    {country_id: "costa_rica_main",
     country_name: "Costa Rica",
     map_data: [
        {origin_x:"88", origin_y:"176", border_data:"3ENESE3S4WNW2N"},
        {origin_x:"38", origin_y:"209", border_data:"EN2EN2ES2ES6E2SESESESESW6SWS2WNW2NWNWNWN2WNWN4WNWNW3N"}
     ]},
    {country_id: "panama_main",
     country_name: "Panama",
     map_data: [
        {origin_x:"91", origin_y:"179", border_data:"2E2N3E2S2EN3ESE2SESE4SWNWNWNWN2W2S2W2N2WN2WNWN"},
        {origin_x:"54", origin_y:"215", border_data:"2ESESES2ES3ES2EN2ENEN2EN7ES3ESESESE4SWSW2S2W2NW2NWNW2NWN3WSWSWS2WSWSE4S4W2NWN3WN2WN5W2NE6N"}
     ]},
    {country_id: "cuba_main",
     country_name: "Cuba",
     map_data: [
        {origin_x:"98", origin_y:"149", border_data:"3ES4ES3ES2ESES2ES2ES2ES3E4S9W3N2WN3WN2WN2WN3WN3W2NENEN"}
     ]},
    {country_id: "argentina_main",
     country_name: "Argentina",
     map_data: [
        {origin_x:"128", origin_y:"248", border_data:"2ES3ENENE2N2EN3ESESE3S5E3S2E3SESE3SWSWSWSW2SESESESESESESES3E2SWSWSWS5WNWNWNWSE2SESESE2SE3SWS2WS3W2SW2SES4W3S2E3S2W3SE2SWSESESESESW3SW2SW2S3WN2W2NW2NWNW3NW4NW4NW6NW6NW5NW3NW4NW7N7N7NENE2N"}
     ]},
    {country_id: "colombia_main",
     country_name: "Colombia",
     map_data: [
        {origin_x:"108", origin_y:"175", border_data:"2ESE6SESES3E2SES2ES2E8SWS4WS2W3SW3SE5S4WN3W3NWNWNWN2WN3W4NENENE4NE5NE7N3ENWNENEN"}
     ]},
    {country_id: "peru_main",
     country_name: "Peru",
     map_data: [
        {origin_x:"97", origin_y:"200", border_data:"2ES3ES2ESESESE3S3ES3E5SWSW2SW4SE4SES3EN3E3S3E5SW6SE5S4W2NWNWNW2NWN2WN2WNW2NW3NW2NWNW2NWNW2NW2NW2NWNW2NW2NW2NE2NENE2NWSWNW4NE2N"}
     ]},
    {country_id: "venezuela_main",
     country_name: "Venezuela",
     map_data: [
        {origin_x:"113", origin_y:"174", border_data:"2EN2ESWSWSW2SENEN3ES2ES8EN3ESWS2ESESES2W5SW4SWS5W3SE3S3WS4W3NE8N2WN2WNW2N3WNWNW7N2EN"}
     ]},
    {country_id: "brazil_main",
     country_name: "Brazil",
     map_data: [
        {origin_x:"133", origin_y:"182", border_data:"3ES2E3SES3ESES3ES3ES2E3SE4SW2SWSW3SES5E2N3ES2ESESES2ES6ES3ESES2ES2ES2ESE8SW2SWSW2SWSWSWSW7SE2SW5SWSW3SW3S4WS2WS3WS2W3SE5SW4SW3SWSWS3WNWNWNWNWNWNWNW2NENENENE3NWNW3N2W3N5W3NWNW5NW2N3WNW3N3WN2WNW3NE4N3W2SWS5W3W3N3WS3WNW4NW4NE2NENE5NE5NW3NE3N2EN4E2S4EN3E3NW3N5ENE4NE5N"},
        {origin_x:"152", origin_y:"200", border_data:"ESE3S4W2NENEN"}
     ]},
    {country_id: "chile_main",
     country_name: "Chile",
     map_data: [
        {origin_x:"117", origin_y:"244", border_data:"4ESE2SESESESE7S7S8SE4SE3SE5SE6SE6SE4SE4SE3SESE2SE2S2ES4E2SWS5WNWNWNWNWNWNWNW3NWNWNW4NE2NW4NW2NW2NW6NW7NW4NW8N7NW7NW2NW2NW3N"},
        {origin_x:"143", origin_y:"316", border_data:"2ESES2ES2ESES2WS4WN2WNW3NEN"}
     ]},
    {country_id: "bolivia_main",
     country_name: "Bolivia",
     map_data: [
        {origin_x:"121", origin_y:"228", border_data:"5ENE2N3E4SW3SES2ES3E3SES3E2SE4S3WS2W2SWSWS3WN2W2SWSWNWNWNWNW2NW6NW6NE5N"}
     ]},
    {country_id: "soviet_union_main",
     country_name: "Soviet Union",
     map_data: [
        {origin_x:"287", origin_y:"57", border_data:"5E2N3EN2E2S5ES2ES2ESE4S6WN3WSES2E3SESESE2NW2N3ES2E2NEN3E2N4EN2EN2EN8E2ES2E2NW3N3ES2ES3ESES2E2NWNWNWNW3NW2N5E5S2ESESE6S2WS3E2NE2N2E3N3WNWNWNW4N3E2SESES3EN2WNW3N2ES3ENWNW2N5E3N3EN3EN4ENENEN9E2ES2ESE4S3ES7ES2ES4E2N7ESE2S4ES9E2ENW3N9E4E2S3ES9EE2S2EN2E2N4EN4ES4EN7EN4ES4ES6ES5ES4E4S3WN7W3S4ESES2WSW5SWS6W5SES2ESE2SE2SESE8S2W2NWN2WN2WN2WNWNWNWNWNWNW2NENE5N2ENWNW4N2W4S5W5SE2S7WN3WS4W2SE2SW2SWSWSW2S5ES4ES2ESESE2SE2SE3SESESE9SW5SWSWSWNWSWS2W3NW3NENE4NE4N5WS3W3N3WS4WNW2NWNWNW2NWN7W6SW3S2W3SE3S3EN3E4SWS3WSWSWS4WSW3S9WS5WN4WN6WS3WNW2NWN6W5NWN2WN7W3S3WSW2S3W3S2E3SW3SWS2W5SE3S4W2N3W2S8WS2W2SWS3W4N5WN9WWNWNW2NW3NES2E3N2WSW4NWN3W2NEN2E2NWN5WS2WS3W2SESESESE2SESESE2SE4S3W2N5WN4W2N3WNE2NWNWN2WN2WNWN2WS2WS3WNW2N4WN2W2S3W3NW2NWN9WNE2NENE2NE5NW3N3WNE4N2E3NEN2EN3E2N3WSWS3WNWNW3NENENE2NE4NW2NE3NE2N"}
     ]},
    {country_id: "britain_main",
     country_name: "Britain",
     map_data: [
        {origin_x:"244", origin_y:"78", border_data:"2ESES2E2SW2SWSESESE2SE2S2E3SW2S7WS5WNEN3ENEN2WNENWN2E2NWNW3NW3NENE2N"},
        {origin_x:"238", origin_y:"86", border_data:"2EN2E6SWS2WS2W2NW2NE2NEN"} // britain_ireland
     ]},
    {country_id: "france_main",
     country_name: "France",
     map_data: [
        {origin_x:"243", origin_y:"98", border_data:"2ESE2NESES2ENEN2EN2ESESES2ESE6SW5S3WS2WSWS2WN2WN2WNW2NE2NE3NW3N2WNWNWN"}
     ]},
    {country_id: "spain_main",
    country_name: "Spain",
    map_data: [
        {origin_x:"234", origin_y:"109", border_data:"3ES5ES5ES2ES2E2SW2SWSW4SWSWS2WS5WSWN5W2NW3NE5NE6N"}
    ]},
    {country_id: "italy_main",
    country_name: "Italy",
    map_data: [
        {origin_x:"260", origin_y:"105", border_data:"4EN7E3SW2SE2SESE2SES4ESWS2ESES3W3SWSWSWS2W2NENE2NWN2WNWN2WNWNW2NWNWNWN2WS2W5NEN"}
    ]},
    {country_id: "west_germany_main",
     country_name: "West Germany",
     map_data: [
        {origin_x:"265", origin_y:"82", border_data:"ENESE4SW6SW4SESE3SESESE2S7WS4W5NWN2WNWNWNW2N2ENENENEN2EN3E6NEN"}
     ]},
    {country_id: "east_germany_main",
     country_name: "East Germany",
     map_data: [
        {origin_x:"267", origin_y:"88", border_data:"4ES2E8S6WNW4NE4N"}
     ]},
     {country_id: "poland_main", country_name: "Poland", map_data: [{origin_x:"273", origin_y:"90", border_data:"3ENEN4EN4E3SE5SW2SWS5WN6W7N"}]},
     {country_id: "czechoslovakia_main", country_name: "Czechoslovakia", map_data: [{origin_x:"268", origin_y:"97", border_data:"9E2ES4E3S2E2SW2S2WN7WN4WNWNWNW3N"}]},
     {country_id: "yugoslavia_main", country_name: "Yugoslavia", map_data: [{origin_x:"271", origin_y:"103", border_data:"4ES7ES2E3SE2SE2SE3S3WS2W2N2WNWN2WNWNWNWNWN2W4N"}]},
     {country_id: "romania_main", country_name: "Romania", map_data: [{origin_x:"285", origin_y:"101", border_data:"6ESE2SE3S2ESW4SES8WNW2NW2NW5NE2N"}]},
     {country_id: "greece_main", country_name: "Greece", map_data: [{origin_x:"287", origin_y:"113", border_data:"6E3S2WSWSW3SE3SW2SW2N2W2SW3NW3NWNW3N2EN3E2N"}]},
     {country_id: "sweden_main", country_name: "Sweden", map_data: [{origin_x:"265", origin_y:"68", border_data:"3EN2ENENENENEN2ENENENE2NENE2NEN2ENESENESENE2SE2NES2ESW3S5W2SW3SWSW2SWSWSWSWSWSW3SE2SE3S2W3SW3SWS4WNWNW4NWN3WSWSWS3W4NE2NW2NENENE2NEN"}]},
     {country_id: "south_africa_main", country_name: "South Africa", map_data: [{origin_x:"281", origin_y:"259", border_data:"4EN3EN2E2NENE2NENE3NENENE2N3E3SE3SE4SWSW3S5E3SW2SW2SWSWSWSWSWSWSWS2WS6WS7WSWS2WNWNW4NW4NWNW2NW2NW6NW6NWNW2NWNW2NWNW2N9E7ESES3E8S4W6SE3S"}]},
     {country_id: "egypt_main", country_name: "Egypt", map_data: [{origin_x:"291", origin_y:"136", border_data:"3ES2EN2ES9E2SE3SW2SW2NWNWNW2SESE2SE2SESE2SESE2SESE2S2W2S3WN9W7W9N9N3N"}]},
     {country_id: "tunisia_main", country_name: "Tunisia", map_data: [{origin_x:"261", origin_y:"125", border_data:"4ES2ESWSE3SW2SE3S2W3S3W4NW2NW3NE5N"}]},
     {country_id: "morocco_main", country_name: "Morocco", map_data: [{origin_x:"229", origin_y:"134", border_data:"EN2EN2EN2E2NENENES4E2SE3SW3SWS3WS2WSWSWSWSWSW5S6WSW5S3W3S3WS4W2NE2NENE2NENENENENENENE2NENENENE6N"}]},
     {country_id: "algeria_main", country_name: "Algeria", map_data: [{origin_x:"243", origin_y:"127", border_data:"9EEN8E4SW3SE2SE4SE2SE9S2SE4SWS2WS2WSWSWS3WS5W2NWNWNWNWNWNWN2WNWNWNWNWNWN2WNWNWNW2NENENENENEN2EN3ENE3NE3NW3N"}]},
     {country_id: "libya_main", country_name: "Libya", map_data: [{origin_x:"265", origin_y:"136", border_data:"2E2N5ES2E2SES3EN2ES2E4NEN4ES2ES2E9S9S8S3WS3WN2WN2WN3WN2WNWN9WW4NW8N3NW2N2E3N"}]},
     {country_id: "mali_main", country_name: "Mali", map_data: [{origin_x:"237", origin_y:"151", border_data:"ENESESESES2ESESESESESESE2S2E2SE5SWS2WS6WS2WSWS2WSWSW2S7W2NWN4WNW4N4EN9EE4NW7N7N"}]},
     {country_id: "nigeria_main", country_name: "Nigeria", map_data: [{origin_x:"252", origin_y:"177", border_data:"6ES2ESES2EN2EN5E3SWSW2SW2SW2SWSWSWS4W3S4WNW2NW2N3W3NE4NE5N"}]},
     {country_id: "sudan_main", country_name: "Sudan", map_data: [{origin_x:"288", origin_y:"161", border_data:"3E4N9E7ES3E2N3E2SE5SE2SW9SSW3SWSWSWSW3SW2S2ESESESE2S2WSWS4WN3WNWN6WNWNWNWNWNWN2WNWNWNW6NW4NEN2E9N"}]},
     {country_id: "ethiopia_main", country_name: "Ethiopia", map_data: [{origin_x:"314", origin_y:"165", border_data:"2ESESE2SESESESESESE4SE2S8EN2EN4ENE3SWSW2SW3SW3SW2SWSW2SWSW2SWSW2SWSWSWSW2NW2NW6N6WN3WNW2NWNWNWN2W2NE3NENENENE3NE9NN"}]},
     {country_id: "kenya_main", country_name: "Kenya", map_data: [{origin_x:"303", origin_y:"192", border_data:"3ES4ENEN3ES3ES6E6SE2SE2SE2SWSWS2WSWSWSWS2WNWNWNWN2WNWN2W3N4WSW2S3W5NENE7N"}]},
     {country_id: "zaire_main", country_name: "Zaire", map_data: [{origin_x:"279", origin_y:"193", border_data:"2ES3EN3EN2EN3EN9EESE8SWSW5SE9S5SWS3WSW4SESES2E3S5WNWN2W2N2WN4WNW5NWN4WS4W3NW2N8WS3W3N3EN2EN3ENEN2ENENE2NE2NE4NW5N"}]},
     {country_id: "tanzania_main", country_name: "Tanzania", map_data: [{origin_x:"302", origin_y:"205", border_data:"2E2NEN4E3S2ESES2ESESESESE4SW2SE5SE2S4WS8W3N2WNWNWNW9N5N"}]},
     {country_id: "mozambique_main", country_name: "Mozambique", map_data: [{origin_x:"307", origin_y:"225", border_data:"8EN4E2SE6SE3S2WSWS2WSWSWSWSWSWSWSW4SE4SW2SWS2WSWSWS4W3NENE4NW3NW3NENENE3NE2NWNW3NEN4E7N"}]},
     {country_id: "zambia_main", country_name: "Zambia", map_data: [{origin_x:"289", origin_y:"225", border_data:"2ES2E2S2ESES5E3N2WNWNW4NEN3EN2ESESES2E9SS4WSWS3WSWS2WS2WSWS4W2SWS2W9N4N2ENE3N"}]},
     {country_id: "angola_main", country_name: "Angola", map_data: [{origin_x:"266", origin_y:"215", border_data:"2EN8E2SE3S4EN4ESE5SES2E3SWS2W9S4S5WNWN7W9W4NE2NE3NE2NE5NW7NW2N"}]},
     {country_id: "mauritania_main", country_name: "Mauritania", map_data: [{origin_x:"216", origin_y:"158", border_data:"3EN3E3N3E5NEN6E3NESESES2ESE2SW7S7SE4S9WWS6WNWNWNWN3W8N"}]},
     {country_id: "guinea_main", country_name: "Guinea", map_data: [{origin_x:"215", origin_y:"166", border_data:"4ESESESES2E4SES4ESE3SW3SE3SW2S2WNWSWS2WNWNWNW2NW3NW2NWNW3NW8N"}]},
     {country_id: "ivory_coast_main", country_name: "Ivory Coast", map_data: [{origin_x:"230", origin_y:"178", border_data:"5ESESESES3E3SW3SW4S5W6WN2WNWNWNENENES2E2NE3NW3NEN"}]},
     {country_id: "burkina_faso_main", country_name: "Burkina Faso", map_data: [{origin_x:"237", origin_y:"176", border_data:"ENEN2ENEN2EN5E2SESE2SE2S3WS7W3S4WNWNWNWN2E2N"}]},
     {country_id: "ghana_main", country_name: "Ghana", map_data: [{origin_x:"242", origin_y:"179", border_data:"7EN3E4SW4SW4SWS4WS6W4NE3NE3NE3N"}]},
     {country_id: "niger_main", country_name: "Niger", map_data: [{origin_x:"252", origin_y:"162", border_data:"3EN3ENENEN2EN2EN8E3SE9SSWSW8S6WS2WS2WNWN2WN6WNW2NWNW2NEN2ENE5NW2N"}]},
     {country_id: "chad_main", country_name: "Chad", map_data: [{origin_x:"272", origin_y:"156", border_data:"3ESES2ES3ES2ES2ES3E8S2WSW4SE6S2WS2WSW2SWS2WS3WN3W2NW3NW3NE8NENE9NNW3N"}]},
     {country_id: "cameroon_main", country_name: "Cameroon", map_data: [{origin_x:"269", origin_y:"181", border_data:"2E3SE5SW3SESESE3SWS9WSW2S4W3NE3NW4N4ENENENE2NE2NE2NEN"}]},
     {country_id: "central_africa_main", country_name: "Central Africa", map_data: [{origin_x:"272", origin_y:"186", border_data:"3ES3EN2ENE2NEN2EN3ESESES2ESESESESESES4WS3WS2WS3WS3WN2W3S5W2NWNWNW3NE3N"}]},
     {country_id: "congo_main", country_name: "Congo", map_data: [{origin_x:"258", origin_y:"202", border_data:"EN4E2NEN9ENEN5E2SE4SW2SW2SWSWS2WSWS3WS2WS4WNWN2WNWNW2NW4N"}]},
     {country_id: "zimbabwe_main", country_name: "Zimbabwe", map_data: [{origin_x:"292", origin_y:"239", border_data:"ENEN2EN2ENEN3E2SESE2SW3SWSWS6WNWNWNW2N"}]},
     {country_id: "botswana_main", country_name: "Botswana", map_data: [{origin_x:"284", origin_y:"242", border_data:"4ENE2N3E2SESESES2E2SWSWSW3SWSW2SWSW2S2WS3WS4W3NW6N4E8N"}]},
     {country_id: "japan_hokkaido", country_name: "Japan", map_data: [{origin_x:"473", origin_y:"97", border_data:"3ESES4EN2E4SES2WSWSWSW2NWSWSWNW5NWNW2N"}]},
     {country_id: "japan_main", country_name: "Japan", map_data: [{origin_x:"478", origin_y:"107", border_data:"3E2S2ESESESE6SE4S5W4S4W2N5W2NEN2ENE3N2ESENE3NWNW2NW4N"}]},
     {country_id: "japan_kyushu", country_name: "Japan", map_data: [{origin_x:"471", origin_y:"123", border_data:"E2SES3E3S2W2SWS2W3NWS2W4NE2N2EN"}]},
     {country_id: "north_korea_main", country_name: "North Korea", map_data: [{origin_x:"458", origin_y:"108", border_data:"4E3SW2SESE2SWSWSWSWS3WNW8NEN2E2N"}]},
     {country_id: "south_korea_main", country_name: "South Korea", map_data: [{origin_x:"461", origin_y:"117", border_data:"EN2ESE2SE5SWSWSWS3WNWNW5NENENEN"}]},
     {country_id: "australia_main", country_name: "Australia", map_data: [{origin_x:"440", origin_y:"248", border_data:"2ENE2N2EN3EN2EN3ESE2NENENEN2E2NENESE2NENENEN2ENENE2SES2E2NE2NEN9EEN2ESE3S2WS2WS2ESESESES2ESES2E4NE2NE2NENE3NENENE9SSE3SE4SESE7SESESE5SE4SW3SWSW2SWSW2SWSW2SWSWSWSW2SW2SWSWSWSWS2WSWSWSWSWS5WN2WN4WN2WNW3NE3NE2NE3NWSW2SWS2WNW2NW2NW2NWN3WS4WS2WS6WSW2S7WN2WSWS3WNW3NEN2E3NE5NW7N2E3NW3NENWN"}]},
     {country_id: "china_main", country_name: "China", map_data: [{origin_x:"382", origin_y:"99", border_data:"7ES2ESE5S6ESE2SES3EN6ES4ES5EN9E3NEN4ENENEN3ENE4N3WS3W3NW3N2E3NE6N7ESE2SESESE2SES4EN3E3S3EN5E4SW4SWSW3SE3SW2S2WSW2SWSWSWSWSW3NW3NWNW3SWSW3SES2ES5E3S2W2SESESESESESESWSE2SESE3SWSE2SW8SW2S2WSWS3WS4WS2W2S2W2N4WNWN3WS3WN3W3SWS3WN4WNW3NE5N2W3N2WN4WS2WS5WS4WN2WN2WN2WNWN2WNWN3WNWNWNWNW5NWN2W2N2WN4WNWNW3NW5N2ENE3NE3N2W3N3E2NEN3E3N"}]},
     {country_id: "taiwan_main", country_name: "Taiwan", map_data: [{origin_x:"462", origin_y:"141", border_data:"3ES2E6S2W2SW2SW3NWNW6NEN"}]},
     {country_id: "vietnam_main", country_name: "Vietnam", map_data: [{origin_x:"429", origin_y:"152", border_data:"3ES3EN3ESESESWSWSW5SESESE2SE2SESESESESE4SW2SWSWSWSWS2WS2WNENWNWNWNWNWNWNW3NEN3E5NW2NWN3W2N2W6NE3N"}]},
     {country_id: "pakistan_main", country_name: "Pakistan", map_data: [{origin_x:"354", origin_y:"139", border_data:"8ENE2NEN2EN2E3NENE4N2ENEN3ESE3SW4SESE3SWSW2SW2SW2SWS4WSW2SESE2SWS3WNWN2WN5WS4W2NENE3NWNW3N"}]},
     {country_id: "india_main", country_name: "India", map_data: [{origin_x:"377", origin_y:"125", border_data:"3ES2E2S2ESE5SESESESES3ESES2ESES2ES2ES2ES4EN5EN2EN4ES2E3S2WS2WSWSW5SWSW2SWNWNWSWSWN2W2SWSWS2W2SWSWSWSWSWSWS2WSW3SE3SWSWSESESWSW2SW2S3WNWNW2NW2NW2NW3NW3NW3NW3NW2NW4NE3NW2SW2S4W3NWNWNW3NENE2NWNW2NEN4ENE2NE2NE2NENE3NWNW4NE3N"}]},
     {country_id: "burma_main", country_name: "Burma", map_data: [{origin_x:"417", origin_y:"146", border_data:"4E5SW3SES4ES3E4S3W2SW3SE4SWS2W3NWNW2SWS2W2NW3NW2NW2NWNWNW3NENE5NENEN2EN"}]},
     {country_id: "thailand_main", country_name: "Thailand", map_data: [{origin_x:"425", origin_y:"160", border_data:"3ES2E2S3ESE2SE5S3WSW2SWNWNW5SW4SESESE2SE2SES2ESESESE8SWNWNWNWNWNWNW3NWNWNW2NWNWNW9NE3NW3NE4NW3NE2N"}]},
     {country_id: "indonesia_sumatra", country_name: "Indonesia", map_data: [{origin_x:"420", origin_y:"189", border_data:"2ES3ESES2ESESESESESESESESE2SESE2SESESESE2SE2SE2SWS2WN2WNWNWNW2NW2NWNWNWNW2NW2NW2NWNWNWNWNWNWNWN2W2N"}]},
     {country_id: "indonesia_borneo", country_name: "Indonesia", map_data: [{origin_x:"448", origin_y:"198", border_data:"4ENENENENENENENENE2N6E3S2W2SW2SW9S2SW6S3WN5WNWS2WNW9NW3N"}]},
     {country_id: "indonesia_celebes", country_name: "Indonesia", map_data: [{origin_x:"468", origin_y:"199", border_data:"7EN2E2S8WSW2S4E2S2WSW2SE4SW2NWNW5S2W4NW4NE4NENENEN"}]},
     {country_id: "indonesia_new_guinea", country_name: "Indonesia", map_data: [{origin_x:"489", origin_y:"201", border_data:"ESESE2SE2SESESEN2ENENENESESES2ES2ES2ES2ESES2ESESE4SESESESE3S3WN2WN2WN2WN2WSWS2WNWN3WN2W4NWNWNWN2WN2WNWNWNW2NW6N"}]},
     {country_id: "philippines_luzon", country_name: "Philipppines", map_data: [{origin_x:"463", origin_y:"158", border_data:"ES2ENESE3SW2SE3SW2SES2EN2ES2ES2ES9WWN2WNWNWNENEN2W4NE4N"}]},
     {country_id: "philippines_palawan", country_name: "Philippines", map_data: [{origin_x:"464", origin_y:"175", border_data:"2E3SWSWSWS2WNWNENENENEN"}]},
     {country_id: "philippines_panay", country_name: "Philippines", map_data: [{origin_x:"469", origin_y:"174", border_data:"3E4S4WNWNENEN"}]},
     {country_id: "philippines_samar", country_name: "Philippines", map_data: [{origin_x:"476", origin_y:"173", border_data:"2ESE2SE2S3WNWNW2NEN"}]},
     {country_id: "philippines_mindaneo", country_name: "Philippines", map_data: [{origin_x:"468", origin_y:"181", border_data:"2EN2ES2ES2ENE2N2ESESE3SWSE2SWS2WSWS3W2NWNW2N2WS2WNW3NEN"}]},
     {country_id: "israel_main", country_name: "Israel", map_data: [{origin_x:"308", origin_y:"131", border_data:"3E7SWSWSWNW3NE5N"}]},
     {country_id: "israel_mini", country_name: "Israel", map_data: [{origin_x:"26", origin_y:"272", border_data:"ESENE2N5E2NEN3E5S2W8SWS3WS2WSW2SW2SW3SWSW3SW3S2E2SWS2W3S2WSES4ENENEN2E2SW3SW4SW4SE2SW3SW4SW3SW3SW2SW2SW3S2W2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2N2ENEN2ENENENENENENENE2NE2NE2NE2NE2NE2NE2NE2NE4NE6N"}]},
     {country_id: "syria_main", country_name: "Syria", map_data: [{origin_x:"308", origin_y:"125", border_data:"3EN3EN5E4SW3S2W2S5W4N3W3N"}]},
     {country_id: "turkey_main", country_name: "Turkey", map_data: [{origin_x:"293", origin_y:"116", border_data:"3E2N9EEN2ES2ES9E2S4E6S9WS3WS5WN7WS4WNWNWNW3NE3N"}]},
     {country_id: "iraq_main", country_name: "Iraq", map_data: [{origin_x:"319", origin_y:"123", border_data:"4ESE5SESE2SESESESE5S6WNW2NWNWN3WN2W4N2E3NE4N"}]},
     {country_id: "saudi_arabia_main", country_name: "Saudi Arabia", map_data: [{origin_x:"315", origin_y:"135", border_data:"EN2ES3ESESE2SES6E2SESESE2SE2SE2S2ES4EN2EN3ES2ESESES2ES2ESW2SW2SWSW2SWSWSWSWSWS2WSWSWSWSWS3WS4WS2WS4WNWNW2NW5NWNW2NW3NWN2W3NW2NW3NWNWNW2NWNWNW5N6E5N"}]},
     {country_id: "iran_main", country_name: "Iran", map_data: [{origin_x:"323", origin_y:"118", border_data:"5E2S3E4S4EN3EN9EES5E9SSE3SW3SE3SESE3SWSW2S2WN2WNWN2WN3WS4WNWNWNWNWNWNWN4W4NWNWNWNW2NWNW5NW6N"}]},
     {country_id: "afghanistan_main", country_name: "Afghanistan", map_data: [{origin_x:"353", origin_y:"127", border_data:"3ENE2N2EN8E2N3E2S5ES2WSWS2W4SWSW3S2WS2WSW2SWS9W3NE3NW6N"}]},
     {country_id: "jordan_main", country_name: "Jordan", map_data: [{origin_x:"311", origin_y:"132", border_data:"5E3SW5S6WNENE6N"}]},
     {country_id: "jordan_mini", country_name: "Jordan", map_data: [{origin_x:"35", origin_y:"277", border_data:"ES2ES2ESESESESESES2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN3E3SE3SE3SE3SE3SE3SE3S2WS4WS3WS4WS4WS4WS3WS3WS2WSE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2S3W2SW2SWS2WS2WS2W2SWSWSWSWS5WS9W9W2W3NE2NE2NE3NE3NE4NE3NE2NW4NE4NE3NE2N2WSWSWS4WNWN2E3N2ENE2N2W3NE3NENE3NE2NE2NEN2EN3ENE3N"}]},
     {country_id: "lebanon_main", country_name: "Lebanon", map_data: [{origin_x:"308", origin_y:"128", border_data:"3E3S3W3N"}]},
     {country_id: "lebanon_mini", country_name: "Lebanon", map_data: [{origin_x:"36", origin_y:"247", border_data:"3EN5ES2E5SWSWSW2SW5S2W3SWSWSWS2WSW2S5W4NE7NE3NE2NE2NE2NENE2N"}]},
     
]


