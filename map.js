var previous_selector = "";

function createOutline(map_data) {
  var points = "";

  map_data.forEach((dataset, index) => {
    var first_point = true;
    var current_x = parseInt(dataset.origin_x);
    var current_y = parseInt(dataset.origin_y);

    for (let i = 0; i <= dataset.border_data.length; i++) {
      if (first_point) {
        points =
          points +
          "M" +
          current_x.toString() +
          " " +
          current_y.toString() +
          " ";
        first_point = false;
      } else {
        points =
          points +
          "L" +
          current_x.toString() +
          " " +
          current_y.toString() +
          " ";
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

function drawMap() {
  const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
  const svg = document.querySelector("svg"); // targeting the svg itself

  const stroke_default = "black";
  const stroke_width = "0.5";
  const fill_default = "none";

  map_data_complete.forEach((country, index) => {
    
    let country_svg = [];
    let country_path = [];
    let outline = "";
    
    outline = createOutline(country.map_data);
    country_path[index] = document.createElementNS(svgns, "path");
    country_path[index].setAttributeNS(null, "d", outline);
    country_path[index].setAttributeNS(null, "stroke", stroke_default);
    country_path[index].setAttributeNS(null, "fill", fill_default);
    country_path[index].setAttributeNS(null, "stroke-width", stroke_width);
    country_path[index].setAttributeNS(null, "id", country.country_id);
    country_path[index].setAttributeNS(null, "onclick", "highlightCountry('" + country.country_id + "')");
    
    country_svg[index] = country_path[index];
    console.log(country_svg[index])

    svg.appendChild(country_svg[index]);
  });
}

function highlightCountry(country_id) {

    clicked_country = "";
    previous_clicked_country = "";

    selector = "path#" + country_id;
    //alert(selector + " | " + previous_selector);

    clicked_country = document.querySelector(selector);

    if (previous_selector === "") {
	clicked_country.setAttribute('fill', 'black');
	previous_selector = selector;
    } else {
        previously_clicked_country = document.querySelector(previous_selector);

	if (previous_selector !== selector) {
	    previously_clicked_country.setAttribute('fill', 'none');
	    clicked_country.setAttribute('fill', 'black');

	    previous_selector = selector;
	} else {
	    clicked_country.setAttribute('fill', 'none');
		
	    previous_selector = "";
	}
    }
        
}

function drawBorder() {
  const svgns = "http://www.w3.org/2000/svg"; // variable for the namespace
  const svg = document.querySelector("svg"); // targeting the svg itself

  const stroke_default = "black";
  const stroke_width = "0.5";
  const fill_default = "none";

  border_data.forEach((border, index) => {

    let border_svg = [];
    let border_path = [];

    border_path[index] = document.createElementNS(svgns, "path");
    border_path[index].setAttributeNS(null, "d", border.border_data)
    border_path[index].setAttributeNS(null, "stroke", stroke_default);
    border_path[index].setAttributeNS(null, "fill", fill_default);
    border_path[index].setAttributeNS(null, "stroke-width", stroke_width);
    border_path[index].setAttributeNS(null, "id", border.border_id);
    
    border_svg[index] = border_path[index];
    console.log(border_svg[index])

    svg.appendChild(border_svg[index]);
  });
}

function main() {
  drawMap();
  drawBorder();
}

const map_data_north_america = [
  {
    country_id: "country_usa",
    country_name: "United States",
    map_data: [
      {
        origin_x: "60",
        origin_y: "84",
        border_data:
          "3ES6ES6ES6ES6ES6ES6ES6ES3ESWSWS3EN2ESESESEES5WSSWSSWWSWSW3SESEENENE3NENENN4ESSWSWSE3SWSSEEN3ENENN6E3N9EENENEN3E3SWSSWSWWSWWSWSEES4WS3WSWWSSWSWS3WNNW5SW3NWSSWSSESSWSWS3WSSWWSSWWSWSWWSWSSW4SE7SWS3WNWNNENNWNNE4N2WN3WN6WSESSWNWWNWWS3WSWWS3WSWWSWSW4S2WNWNW4NW3N5W3NWNN5WN2WN2WN2WN6W4NWNW9NNE3NE2NENE2NE2NENE2NENE2NENENE2NE2NENE2N"
      },
      {
        origin_x: "30",
        origin_y: "56",
        border_data:
          "3EN3ENEN2ESE2NW3NEN6ES2ENEN2EN3WS2W2NE2N2EN5E2SENENENW3N2ES4EN3EN6ES2ENEN2ESES2ESES6E2SWSWS2WSWS2WSWS2WSWSWS2WSWSWS2WSWS2W5SE9S2W5NW2NW2NWN2WNWN2WN3WS2WS3WNEN2ENEN2WS2WS2WS9W2WS5W3N"
      }
    ]
  },
  {
    country_id: "country_canada",
    country_name: "Canada",
    map_data: [
      {
        origin_x: "86",
        origin_y: "41",
        border_data:
          "2ESES2ENENEN2ES2EN3ENE2S2ES4ESES3ESE2S7EN3ESE2SES2ES2EN3EN2ENENESESE4N2ENENEN2ENEN3EN2ESESWSWSWSW2SWSW2SE2SWSES2ENENENENESE2SWS2W2S3WS2WNWS3WS2WNW2S2E2S3WN3WS2WS2WS2W2SWS2WS2WS3W7S3ESES2ESES3ESW2SW2SE2SES2E3NENE2NEN2EN2ENENE5NENEN2ENE3N3ES3ENESESES2E2SW2SW2SES2EN2E2NE2NE6SW3SE3S3ESES2E4SW2S5WS9W6WS2WS2WSWSWSENEN3EN3ES2E2SWSWS2W2SES2ESES3WSWS4WNEN2EN2WS2WSW2NE3N3WSWSWS9WWS5W2SWS5WNENENENEN2ENWNEN5W2NE3NWNWN4WS2WSWN3WN6WN6WN6WN6WN6WN6WN6WN4W6NE2NE2NENE2NEN2E9NW5N2ENEN2ENENEN2ENENEN2ENEN2ENEN2ENENEN"
      },
      {
        origin_x: "114",
        origin_y: "43",
        border_data:
          "2ES3EN2W2NEN3ESES2ENEN2ESES2E2SES3ESWS4WN2W2SES2WNWNWNWN6WS3W3N"
      }
    ]
  },
  {
    country_id: "country_mexico",
    country_name: "Mexico",
    map_data: [
      {
        origin_x: "47",
        origin_y: "124",
        border_data:
          "6ES2ES2ES2ES5E2SE3S5E3SE4SESESE4SW2SW3SE2SW2SES2ESESEN2ES2ENENE3NEN3ESEN3ESWSW3SW2SWS4W3S4WSWS2WN6WS2WNWNWN2WNWN2WNWNWNWNWNW3NENE3N2W6NW3NW5NW3NW5NWNW9S3SE3SE8S2W2NW4NW2NW2NWNW2N2E2NW3NE6N"
      }
    ]
  }
];

const map_data_complete =[
  {country_id: "country_usa", 
   country_name: "United States",
   map_data: [
      {origin_x: "60", origin_y: "84", border_data: "3ES6ES6ES6ES6ES6ES6ES6ES3ESWSWS3EN2ESESESEES5WSSWSSWWSWSW3SESEENENE3NENENN4ESSWSWSE3SWSSEEN3ENENN6E3N9EENENEN3E3SWSSWSWWSWWSWSEES4WS3WSWWSSWSWS3WNNW5SW3NWSSWSSESSWSWS3WSSWWSSWWSWSWWSWSSW4SE7SWS3WNWNNENNWNNE4N2WN3WN6WSESSWNWWNWWS3WSWWS3WSWWSWSW4S2WNWNW4NW3N5W3NWNN5WN2WN2WN2WN6W4NWNW9NNE3NE2NENE2NE2NENE2NENE2NENENE2NE2NENE2N"},
      {origin_x: "30", origin_y: "56", border_data: "3EN3ENEN2ESE2NW3NEN6ES2ENEN2EN3WS2W2NE2N2EN5E2SENENENW3N2ES4EN3EN6ES2ENEN2ESES2ESES6E2SWSWS2WSWS2WSWS2WSWSWS2WSWSWS2WSWS2W5SE9S2W5NW2NW2NWN2WNWN2WN3WS2WS3WNEN2ENEN2WS2WS2WS9W2WS5W3N"}
   ]},
  {country_id: "country_canada",
   country_name: "Canada",
   map_data: [
      {origin_x: "86", origin_y: "41", border_data: "2ESES2ENENEN2ES2EN3ENE2S2ES4ESES3ESE2S7EN3ESE2SES2ES2EN3EN2ENENESESE4N2ENENEN2ENEN3EN2ESESWSWSWSW2SWSW2SE2SWSES2ENENENENESE2SWS2W2S3WS2WNWS3WS2WNW2S2E2S3WN3WS2WS2WS2W2SWS2WS2WS3W7S3ESES2ESES3ESW2SW2SE2SES2E3NENE2NEN2EN2ENENE5NENEN2ENE3N3ES3ENESESES2E2SW2SW2SES2EN2E2NE2NE6SW3SE3S3ESES2E4SW2S5WS9W6WS2WS2WSWSWSENEN3EN3ES2E2SWSWS2W2SES2ESES3WSWS4WNEN2EN2WS2WSW2NE3N3WSWSWS9WWS5W2SWS5WNENENENEN2ENWNEN5W2NE3NWNWN4WS2WSWN3WN6WN6WN6WN6WN6WN6WN6WN4W6NE2NE2NENE2NEN2E9NW5N2ENEN2ENENEN2ENENEN2ENEN2ENEN2ENENEN"},
      {origin_x: "114", origin_y: "43", border_data: "2ES3EN2W2NEN3ESES2ENEN2ESES2E2SES3ESWS4WN2W2SES2WNWNWNWN6WS3W3N"}
   ]},
  {country_id: "country_mexico",
   country_name: "Mexico",
   map_data: [
      {origin_x: "47", origin_y: "124", border_data: "6ES2ES2ES2ES5E2SE3S5E3SE4SESESE4SW2SW3SE2SW2SES2ESESEN2ES2ENENE3NEN3ESEN3ESWSW3SW2SWS4W3S4WSWS2WN6WS2WNWNWN2WNWN2WNWNWNWNWNW3NENE3N2W6NW3NW5NW3NW5NWNW9S3SE3SE8S2W2NW4NW2NW2NWNW2N2E2NW3NE6N"}
   ]},
  {country_id:"country_guatemala",
   country_name:"Guatemala",
   map_data: [
      {origin_x:"83", origin_y:"159", border_data:"3E3SESWSWSW2S2WSWNWNWNW2NEN4E3N"},
      {origin_x:"14", origin_y:"170", border_data:"9E9SESES2ES2WSWS2W5S4WS2WS2WN3WN2WN2WNWNW3NENENENEN7E3NWNWNW2NE2N"}
   ]},
  {country_id: "country_el_salvador",
   country_name: "El Salvador",
   map_data: [
      {origin_x:"82", origin_y:"168", border_data:"2ESE2SWN2W2N"},
      {origin_x:"16", origin_y:"190", border_data:"2EN5ES3ES3E4S6WN4WN2WNW2N"}
   ]},
   {country_id:"country_honduras",
    country_name:"Honduras",
    map_data: [
      {origin_x:"86", origin_y:"164", border_data:"7ESES3WSWSWSWS2WSW2NW3NENEN"},
      {origin_x:"27", origin_y:"181",border_data:"7ES6EN7ESES2ESESESES3WSWS2WNWN2WSWSWSWS4WS2W2SWSWS2WN2W4N3WN3WNW5N2ENEN2EN"}
    ]},
  {country_id: "country_nicaragua",
   country_name: "Nicaragua",
   map_data: [
      {origin_x:"86", origin_y:"170", border_data:"2ENENENEN3ESW4SW4SWS3W3N2WNWNEN"},
      {origin_x:"30", origin_y:"196", border_data:"3ENENE2N2EN4ENENENEN2ESES2ENEN3E5SW2SW7SW8S5WN2WN2WS2WNWNWNWNW2NWNWNWNWNW2N"}
   ]},
  {country_id: "country_costa_rica",
   country_name: "Costa Rica",
   map_data: [
      {origin_x:"88", origin_y:"176", border_data:"3ENESE3S4WNW2N"},
      {origin_x:"38", origin_y:"209", border_data:"EN2EN2ES2ES6E2SESESESESW6SWS2WNW2NWNWNWN2WNWN4WNWNW3N"}
   ]},
  {country_id: "country_panama",
   country_name: "Panama",
   map_data: [
      {origin_x:"91", origin_y:"179", border_data:"2E2N3E2S2EN3ESE2SESE4SWNWNWNWN2W2S2W2N2WN2WNWN"},
      {origin_x:"54", origin_y:"215", border_data:"2ESESES2ES3ES2EN2ENEN2EN7ES3ESESESE4SWSW2S2W2NW2NWNW2NWN3WSWSWS2WSWSE4S4W2NWN3WN2WN5W2NE6N"}
   ]},
  {country_id: "country_cuba",
   country_name: "Cuba",
   map_data: [
      {origin_x:"98", origin_y:"149", border_data:"3ES4ES3ES2ESES2ES2ES2ES3E4S9W3N2WN3WN2WN2WN3WN3W2NENEN"}
   ]},
  {country_id: "country_argentina",
   country_name: "Argentina",
   map_data: [
      {origin_x:"128", origin_y:"248", border_data:"2ES3ENENE2N2EN3ESESE3S5E3S2E3SESE3SWSWSWSW2SESESESESESESES3E2SWSWSWS5WNWNWNWSE2SESESE2SE3SWS2WS3W2SW2SES4W3S2E3S2W3SE2SWSESESESESW3SW2SW2S3WN2W2NW2NWNW3NW4NW4NW6NW6NW5NW3NW4NW7N7N7NENE2N"}
   ]},
  {country_id: "country_colombia",
   country_name: "Colombia",
   map_data: [
      {origin_x:"108", origin_y:"175", border_data:"2ESE6SESES3E2SES2ES2E8SWS4WS2W3SW3SE5S4WN3W3NWNWNWN2WN3W4NENENE4NE5NE7N3ENWNENEN"}
   ]},
  {country_id: "country_peru",
   country_name: "Peru",
   map_data: [
      {origin_x:"97", origin_y:"200", border_data:"2ES3ES2ESESESE3S3ES3E5SWSW2SW4SE4SES3EN3E3S3E5SW6SE5S4W2NWNWNW2NWN2WN2WNW2NW3NW2NWNW2NWNW2NW2NW2NWNW2NW2NW2NE2NENE2NWSWNW4NE2N"}
   ]},
  {country_id: "country_venezuela",
   country_name: "Venezuela",
   map_data: [
      {origin_x:"113", origin_y:"174", border_data:"2EN2ESWSWSW2SENEN3ES2ES8EN3ESWS2ESESES2W5SW4SWS5W3SE3S3WS4W3NE8N2WN2WNW2N3WNWNW7N2EN"}
   ]},
  {country_id: "country_brazil",
   country_name: "Brazil",
   map_data: [
      {origin_x:"133", origin_y:"182", border_data:"3ES2E3SES3ESES3ES3ES2E3SE4SW2SWSW3SES5E2N3ES2ESESES2ES6ES3ESES2ES2ES2ESE8SW2SWSW2SWSWSWSW7SE2SW5SWSW3SW3S4WS2WS3WS2W3SE5SW4SW3SWSWS3WNWNWNWNWNWNWNW2NENENENE3NWNW3N2W3N5W3NWNW5NW2N3WNW3N3WN2WNW3NE4N3W2SWS5W3W3N3WS3WNW4NW4NE2NENE5NE5NW3NE3N2EN4E2S4EN3E3NW3N5ENE4NE5N"},
      {origin_x:"152", origin_y:"200", border_data:"ESE3S4W2NENEN"}
   ]},
  {country_id: "country_chile",
   country_name: "Chile",
   map_data: [
      {origin_x:"117", origin_y:"244", border_data:"4ESE2SESESESE7S7S8SE4SE3SE5SE6SE6SE4SE4SE3SESE2SE2S2ES4E2SWS5WNWNWNWNWNWNWNW3NWNWNW4NE2NW4NW2NW2NW6NW7NW4NW8N7NW7NW2NW2NW3N"},
      {origin_x:"143", origin_y:"316", border_data:"2ESES2ES2ESES2WS4WN2WNW3NEN"}
   ]},
  {country_id: "country_bolivia",
   country_name: "Bolivia",
   map_data: [
      {origin_x:"121", origin_y:"228", border_data:"5ENE2N3E4SW3SES2ES3E3SES3E2SE4S3WS2W2SWSWS3WN2W2SWSWNWNWNWNW2NW6NW6NE5N"}
   ]},
  {country_id: "country_soviet_union",
   country_name: "Soviet Union",
   map_data: [
      {origin_x:"287", origin_y:"57", border_data:"5E2N3EN2E2S5ES2ES2ESE4S6WN3WSES2E3SESESE2NW2N3ES2E2NEN3E2N4EN2EN2EN8E2ES2E2NW3N3ES2ES3ESES2E2NWNWNWNW3NW2N5E5S2ESESE6S2WS3E2NE2N2E3N3WNWNWNW4N3E2SESES3EN2WNW3N2ES3ENWNW2N5E3N3EN3EN4ENENEN9E2ES2ESE4S3ES7ES2ES4E2N7ESE2S4ES9E2ENW3N9E4E2S3ES9EE2S2EN2E2N4EN4ES4EN7EN4ES4ES6ES5ES4E4S3WN7W3S4ESES2WSW5SWS6W5SES2ESE2SE2SESE8S2W2NWN2WN2WN2WNWNWNWNWNWNW2NENE5N2ENWNW4N2W4S5W5SE2S7WN3WS4W2SE2SW2SWSWSW2S5ES4ES2ESESE2SE2SE3SESESE9SW5SWSWSWNWSWS2W3NW3NENE4NE4N5WS3W3N3WS4WNW2NWNWNW2NWN7W6SW3S2W3SE3S3EN3E4SWS3WSWSWS4WSW3S9WS5WN4WN6WS3WNW2NWN6W5NWN2WN7W3S3WSW2S3W3S2E3SW3SWS2W5SE3S4W2N3W2S8WS2W2SWS3W4N5WN9WWNWNW2NW3NES2E3N2WSW4NWN3W2NEN2E2NWN5WS2WS3W2SESESESE2SESESE2SE4S3W2N5WN4W2N3WNE2NWNWN2WN2WNWN2WS2WS3WNW2N4WN2W2S3W3NW2NWN9WNE2NENE2NE5NW3N3WNE4N2E3NEN2EN3E2N3WSWS3WNWNW3NENENE2NE4NW2NE3NE2N"}
   ]},
  {country_id: "country_britain",
   country_name: "Britain",
   map_data: [
      {origin_x:"244", origin_y:"78", border_data:"2ESES2E2SW2SWSESESE2SE2S2E3SW2S7WS5WNEN3ENEN2WNENWN2E2NWNW3NW3NENE2N"},
      {origin_x:"238", origin_y:"86", border_data:"2EN2E6SWS2WS2W2NW2NE2NEN"} // britain_ireland
   ]},
  {country_id: "country_france",
   country_name: "France",
   map_data: [
      {origin_x:"243", origin_y:"98", border_data:"2ESE2NESES2ENEN2EN2ESESES2ESE6SW5S3WS2WSWS2WN2WN2WNW2NE2NE3NW3N2WNWNWN"}
   ]},
  {country_id: "country_spain",
  country_name: "Spain",
  map_data: [
      {origin_x:"234", origin_y:"109", border_data:"3ES5ES5ES2ES2E2SW2SWSW4SWSWS2WS5WSWN5W2NW3NE5NE6N"}
  ]},
  {country_id: "country_italy",
  country_name: "Italy",
  map_data: [
      {origin_x:"260", origin_y:"105", border_data:"4EN7E3SW2SE2SESE2SES4ESWS2ESES3W3SWSWSWS2W2NENE2NWN2WNWN2WNWNW2NWNWNWN2WS2W5NEN"}
  ]},
  {country_id: "country_west_germany",
   country_name: "West Germany",
   map_data: [
      {origin_x:"265", origin_y:"82", border_data:"ENESE4SW6SW4SESE3SESESE2S7WS4W5NWN2WNWNWNW2N2ENENENEN2EN3E6NEN"}
   ]},
  {country_id: "country_east_germany",
   country_name: "East Germany",
   map_data: [
      {origin_x:"267", origin_y:"88", border_data:"4ES2E8S6WNW4NE4N"}
   ]},
   {country_id: "country_poland", country_name: "Poland", map_data: [{origin_x:"273", origin_y:"90", border_data:"3ENEN4EN4E3SE5SW2SWS5WN6W7N"}]},
   {country_id: "country_czechoslovakia", country_name: "Czechoslovakia", map_data: [{origin_x:"268", origin_y:"97", border_data:"9E2ES4E3S2E2SW2S2WN7WN4WNWNWNW3N"}]},
   {country_id: "country_yugoslavia", country_name: "Yugoslavia", map_data: [{origin_x:"271", origin_y:"103", border_data:"4ES7ES2E3SE2SE2SE3S3WS2W2N2WNWN2WNWNWNWNWN2W4N"}]},
   {country_id: "country_romania", country_name: "Romania", map_data: [{origin_x:"285", origin_y:"101", border_data:"6ESE2SE3S2ESW4SES8WNW2NW2NW5NE2N"}]},
   {country_id: "country_greece", country_name: "Greece", map_data: [{origin_x:"287", origin_y:"113", border_data:"6E3S2WSWSW3SE3SW2SW2N2W2SW3NW3NWNW3N2EN3E2N"}]},
   {country_id: "country_sweden", country_name: "Sweden", map_data: [{origin_x:"265", origin_y:"68", border_data:"3EN2ENENENENEN2ENENENE2NENE2NEN2ENESENESENE2SE2NES2ESW3S5W2SW3SWSW2SWSWSWSWSWSW3SE2SE3S2W3SW3SWS4WNWNW4NWN3WSWSWS3W4NE2NW2NENENE2NEN"}]},
   {country_id: "country_south_africa", country_name: "South Africa", map_data: [{origin_x:"281", origin_y:"259", border_data:"4EN3EN2E2NENE2NENE3NENENE2N3E3SE3SE4SWSW3S5E3SW2SW2SWSWSWSWSWSWSWS2WS6WS7WSWS2WNWNW4NW4NWNW2NW2NW6NW6NWNW2NWNW2NWNW2N9E7ESES3E8S4W6SE3S"}]},
   {country_id: "country_egypt", country_name: "Egypt", map_data: [{origin_x:"291", origin_y:"136", border_data:"3ES2EN2ES9E2SE3SW2SW2NWNWNW2SESE2SE2SESE2SESE2SESE2S2W2S3WN9W7W9N9N3N"}]},
   {country_id: "country_tunisia", country_name: "Tunisia", map_data: [{origin_x:"261", origin_y:"125", border_data:"4ES2ESWSE3SW2SE3S2W3S3W4NW2NW3NE5N"}]},
   {country_id: "country_morocco", country_name: "Morocco", map_data: [{origin_x:"229", origin_y:"134", border_data:"EN2EN2EN2E2NENENES4E2SE3SW3SWS3WS2WSWSWSWSWSW5S6WSW5S3W3S3WS4W2NE2NENE2NENENENENENENE2NENENENE6N"}]},
   {country_id: "country_algeria", country_name: "Algeria", map_data: [{origin_x:"243", origin_y:"127", border_data:"9EEN8E4SW3SE2SE4SE2SE9S2SE4SWS2WS2WSWSWS3WS5W2NWNWNWNWNWNWN2WNWNWNWNWNWN2WNWNWNW2NENENENENEN2EN3ENE3NE3NW3N"}]},
   {country_id: "country_libya", country_name: "Libya", map_data: [{origin_x:"265", origin_y:"136", border_data:"2E2N5ES2E2SES3EN2ES2E4NEN4ES2ES2E9S9S8S3WS3WN2WN2WN3WN2WNWN9WW4NW8N3NW2N2E3N"}]},
   {country_id: "country_mali", country_name: "Mali", map_data: [{origin_x:"237", origin_y:"151", border_data:"ENESESESES2ESESESESESESE2S2E2SE5SWS2WS6WS2WSWS2WSWSW2S7W2NWN4WNW4N4EN9EE4NW7N7N"}]},
   {country_id: "country_nigeria", country_name: "Nigeria", map_data: [{origin_x:"252", origin_y:"177", border_data:"6ES2ESES2EN2EN5E3SWSW2SW2SW2SWSWSWS4W3S4WNW2NW2N3W3NE4NE5N"}]},
   {country_id: "country_sudan", country_name: "Sudan", map_data: [{origin_x:"288", origin_y:"161", border_data:"3E4N9E7ES3E2N3E2SE5SE2SW9SSW3SWSWSWSW3SW2S2ESESESE2S2WSWS4WN3WNWN6WNWNWNWNWNWN2WNWNWNW6NW4NEN2E9N"}]},
   {country_id: "country_ethiopia", country_name: "Ethiopia", map_data: [{origin_x:"314", origin_y:"165", border_data:"2ESESE2SESESESESESE4SE2S8EN2EN4ENE3SWSW2SW3SW3SW2SWSW2SWSW2SWSW2SWSWSWSW2NW2NW6N6WN3WNW2NWNWNWN2W2NE3NENENENE3NE9NN"}]},
   {country_id: "country_kenya", country_name: "Kenya", map_data: [{origin_x:"303", origin_y:"192", border_data:"3ES4ENEN3ES3ES6E6SE2SE2SE2SWSWS2WSWSWSWS2WNWNWNWN2WNWN2W3N4WSW2S3W5NENE7N"}]},
   {country_id: "country_zaire", country_name: "Zaire", map_data: [{origin_x:"279", origin_y:"193", border_data:"2ES3EN3EN2EN3EN9EESE8SWSW5SE9S5SWS3WSW4SESES2E3S5WNWN2W2N2WN4WNW5NWN4WS4W3NW2N8WS3W3N3EN2EN3ENEN2ENENE2NE2NE4NW5N"}]},
   {country_id: "country_tanzania", country_name: "Tanzania", map_data: [{origin_x:"302", origin_y:"205", border_data:"2E2NEN4E3S2ESES2ESESESESE4SW2SE5SE2S4WS8W3N2WNWNWNW9N5N"}]},
   {country_id: "country_mozambique", country_name: "Mozambique", map_data: [{origin_x:"307", origin_y:"225", border_data:"8EN4E2SE6SE3S2WSWS2WSWSWSWSWSWSWSW4SE4SW2SWS2WSWSWS4W3NENE4NW3NW3NENENE3NE2NWNW3NEN4E7N"}]},
   {country_id: "country_zambia", country_name: "Zambia", map_data: [{origin_x:"289", origin_y:"225", border_data:"2ES2E2S2ESES5E3N2WNWNW4NEN3EN2ESESES2E9SS4WSWS3WSWS2WS2WSWS4W2SWS2W9N4N2ENE3N"}]},
   {country_id: "country_angola", country_name: "Angola", map_data: [{origin_x:"266", origin_y:"215", border_data:"2EN8E2SE3S4EN4ESE5SES2E3SWS2W9S4S5WNWN7W9W4NE2NE3NE2NE5NW7NW2N"}]},
   {country_id: "country_mauritania", country_name: "Mauritania", map_data: [{origin_x:"216", origin_y:"158", border_data:"3EN3E3N3E5NEN6E3NESESES2ESE2SW7S7SE4S9WWS6WNWNWNWN3W8N"}]},
   {country_id: "country_guinea", country_name: "Guinea", map_data: [{origin_x:"215", origin_y:"166", border_data:"4ESESESES2E4SES4ESE3SW3SE3SW2S2WNWSWS2WNWNWNW2NW3NW2NWNW3NW8N"}]},
   {country_id: "country_ivory_coast", country_name: "Ivory Coast", map_data: [{origin_x:"230", origin_y:"178", border_data:"5ESESESES3E3SW3SW4S5W6WN2WNWNWNENENES2E2NE3NW3NEN"}]},
   {country_id: "country_burkina_faso", country_name: "Burkina Faso", map_data: [{origin_x:"237", origin_y:"176", border_data:"ENEN2ENEN2EN5E2SESE2SE2S3WS7W3S4WNWNWNWN2E2N"}]},
   {country_id: "country_ghana", country_name: "Ghana", map_data: [{origin_x:"242", origin_y:"179", border_data:"7EN3E4SW4SW4SWS4WS6W4NE3NE3NE3N"}]},
   {country_id: "country_niger", country_name: "Niger", map_data: [{origin_x:"252", origin_y:"162", border_data:"3EN3ENENEN2EN2EN8E3SE9SSWSW8S6WS2WS2WNWN2WN6WNW2NWNW2NEN2ENE5NW2N"}]},
   {country_id: "country_chad", country_name: "Chad", map_data: [{origin_x:"272", origin_y:"156", border_data:"3ESES2ES3ES2ES2ES3E8S2WSW4SE6S2WS2WSW2SWS2WS3WN3W2NW3NW3NE8NENE9NNW3N"}]},
   {country_id: "country_cameroon", country_name: "Cameroon", map_data: [{origin_x:"269", origin_y:"181", border_data:"2E3SE5SW3SESESE3SWS9WSW2S4W3NE3NW4N4ENENENE2NE2NE2NEN"}]},
   {country_id: "country_central_africa", country_name: "Central Africa", map_data: [{origin_x:"272", origin_y:"186", border_data:"3ES3EN2ENE2NEN2EN3ESESES2ESESESESESES4WS3WS2WS3WS3WN2W3S5W2NWNWNW3NE3N"}]},
   {country_id: "country_congo", country_name: "Congo", map_data: [{origin_x:"258", origin_y:"202", border_data:"EN4E2NEN9ENEN5E2SE4SW2SW2SWSWS2WSWS3WS2WS4WNWN2WNWNW2NW4N"}]},
   {country_id: "country_zimbabwe", country_name: "Zimbabwe", map_data: [{origin_x:"292", origin_y:"239", border_data:"ENEN2EN2ENEN3E2SESE2SW3SWSWS6WNWNWNW2N"}]},
   {country_id: "country_botswana", country_name: "Botswana", map_data: [{origin_x:"284", origin_y:"242", border_data:"4ENE2N3E2SESESES2E2SWSWSW3SWSW2SWSW2S2WS3WS4W3NW6N4E8N"}]},
   
   {country_id: "country_japan", country_name: "Japan", map_data: [{origin_x:"473", origin_y:"97", border_data:"3ESES4EN2E4SES2WSWSWSW2NWSWSWNW5NWNW2N"},{origin_x:"478", origin_y:"107", border_data:"3E2S2ESESESE6SE4S5W4S4W2N5W2NEN2ENE3N2ESENE3NWNW2NW4N"},{origin_x:"471", origin_y:"123", border_data:"E2SES3E3S2W2SWS2W3NWS2W4NE2N2EN"}]},
   
   {country_id: "country_north_korea", country_name: "North Korea", map_data: [{origin_x:"458", origin_y:"108", border_data:"4E3SW2SESE2SWSWSWSWS3WNW8NEN2E2N"}]},
   {country_id: "country_south_korea", country_name: "South Korea", map_data: [{origin_x:"461", origin_y:"117", border_data:"EN2ESE2SE5SWSWSWS3WNWNW5NENENEN"}]},
   {country_id: "country_australia", country_name: "Australia", map_data: [{origin_x:"440", origin_y:"248", border_data:"2ENE2N2EN3EN2EN3ESE2NENENEN2E2NENESE2NENENEN2ENENE2SES2E2NE2NEN9EEN2ESE3S2WS2WS2ESESESES2ESES2E4NE2NE2NENE3NENENE9SSE3SE4SESE7SESESE5SE4SW3SWSW2SWSW2SWSW2SWSWSWSW2SW2SWSWSWSWS2WSWSWSWSWS5WN2WN4WN2WNW3NE3NE2NE3NWSW2SWS2WNW2NW2NW2NWN3WS4WS2WS6WSW2S7WN2WSWS3WNW3NEN2E3NE5NW7N2E3NW3NENWN"}]},
   {country_id: "country_china", country_name: "China", map_data: [{origin_x:"382", origin_y:"99", border_data:"7ES2ESE5S6ESE2SES3EN6ES4ES5EN9E3NEN4ENENEN3ENE4N3WS3W3NW3N2E3NE6N7ESE2SESESE2SES4EN3E3S3EN5E4SW4SWSW3SE3SW2S2WSW2SWSWSWSWSW3NW3NWNW3SWSW3SES2ES5E3S2W2SESESESESESESWSE2SESE3SWSE2SW8SW2S2WSWS3WS4WS2W2S2W2N4WNWN3WS3WN3W3SWS3WN4WNW3NE5N2W3N2WN4WS2WS5WS4WN2WN2WN2WNWN2WNWN3WNWNWNWNW5NWN2W2N2WN4WNWNW3NW5N2ENE3NE3N2W3N3E2NEN3E3N"}]},
   {country_id: "country_taiwan", country_name: "Taiwan", map_data: [{origin_x:"462", origin_y:"141", border_data:"3ES2E6S2W2SW2SW3NWNW6NEN"}]},
   {country_id: "country_vietnam", country_name: "Vietnam", map_data: [{origin_x:"429", origin_y:"152", border_data:"3ES3EN3ESESESWSWSW5SESESE2SE2SESESESESE4SW2SWSWSWSWS2WS2WNENWNWNWNWNWNWNW3NEN3E5NW2NWN3W2N2W6NE3N"}]},
   {country_id: "country_pakistan", country_name: "Pakistan", map_data: [{origin_x:"354", origin_y:"139", border_data:"8ENE2NEN2EN2E3NENE4N2ENEN3ESE3SW4SESE3SWSW2SW2SW2SWS4WSW2SESE2SWS3WNWN2WN5WS4W2NENE3NWNW3N"}]},
   {country_id: "country_india", country_name: "India", map_data: [{origin_x:"377", origin_y:"125", border_data:"3ES2E2S2ESE5SESESESES3ESES2ESES2ES2ES2ES4EN5EN2EN4ES2E3S2WS2WSWSW5SWSW2SWNWNWSWSWN2W2SWSWS2W2SWSWSWSWSWSWS2WSW3SE3SWSWSESESWSW2SW2S3WNWNW2NW2NW2NW3NW3NW3NW3NW2NW4NE3NW2SW2S4W3NWNWNW3NENE2NWNW2NEN4ENE2NE2NE2NENE3NWNW4NE3N"}]},
   {country_id: "country_burma", country_name: "Burma", map_data: [{origin_x:"417", origin_y:"146", border_data:"4E5SW3SES4ES3E4S3W2SW3SE4SWS2W3NWNW2SWS2W2NW3NW2NW2NWNWNW3NENE5NENEN2EN"}]},
   {country_id: "country_thailand", country_name: "Thailand", map_data: [{origin_x:"425", origin_y:"160", border_data:"3ES2E2S3ESE2SE5S3WSW2SWNWNW5SW4SESESE2SE2SES2ESESESE8SWNWNWNWNWNWNW3NWNWNW2NWNWNW9NE3NW3NE4NW3NE2N"}]},
  
   {country_id: "country_indonesia", country_name: "Indonesia", map_data: [{origin_x:"420", origin_y:"189", border_data:"2ES3ESES2ESESESESESESESESE2SESE2SESESESE2SE2SE2SWS2WN2WNWNWNW2NW2NWNWNWNW2NW2NW2NWNWNWNWNWNWNWN2W2N"},{origin_x:"448", origin_y:"198", border_data:"4ENENENENENENENENE2N6E3S2W2SW2SW9S2SW6S3WN5WNWS2WNW9NW3N"},{origin_x:"468", origin_y:"199", border_data:"7EN2E2S8WSW2S4E2S2WSW2SE4SW2NWNW5S2W4NW4NE4NENENEN"},{origin_x:"489", origin_y:"201", border_data:"ESESE2SE2SESESEN2ENENENESESES2ES2ES2ES2ESES2ESESE4SESESESE3S3WN2WN2WN2WN2WSWS2WNWN3WN2W4NWNWNWN2WN2WNWNWNW2NW6N"}]},
   
   {country_id: "country_philippines", country_name: "Philipppines", map_data: [{origin_x:"463", origin_y:"158", border_data:"ES2ENESE3SW2SE3SW2SES2EN2ES2ES2ES9WWN2WNWNWNENEN2W4NE4N"},{origin_x:"464", origin_y:"175", border_data:"2E3SWSWSWS2WNWNENENENEN"},{origin_x:"469", origin_y:"174", border_data:"3E4S4WNWNENEN"},{origin_x:"476", origin_y:"173", border_data:"2ESE2SE2S3WNWNW2NEN"},{origin_x:"468", origin_y:"181", border_data:"2EN2ES2ES2ENE2N2ESESE3SWSE2SWS2WSWS3W2NWNW2N2WS2WNW3NEN"}]},
  
   {country_id: "country_israel", country_name: "Israel", map_data: [{origin_x:"308", origin_y:"131", border_data:"3E7SWSWSWNW3NE5N"},{origin_x:"26", origin_y:"272", border_data:"ESENE2N5E2NEN3E5S2W8SWS3WS2WSW2SW2SW3SWSW3SW3S2E2SWS2W3S2WSES4ENENEN2E2SW3SW4SW4SE2SW3SW4SW3SW3SW2SW2SW3S2W2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2NW2N2ENEN2ENENENENENENENE2NE2NE2NE2NE2NE2NE2NE2NE4NE6N"}]},
   {country_id: "country_syria", country_name: "Syria", map_data: [{origin_x:"308", origin_y:"125", border_data:"3EN3EN5E4SW3S2W2S5W4N3W3N"}]},
   {country_id: "country_turkey", country_name: "Turkey", map_data: [{origin_x:"293", origin_y:"116", border_data:"3E2N9EEN2ES2ES9E2S4E6S9WS3WS5WN7WS4WNWNWNW3NE3N"}]},
   {country_id: "country_iraq", country_name: "Iraq", map_data: [{origin_x:"319", origin_y:"123", border_data:"4ESE5SESE2SESESESE5S6WNW2NWNWN3WN2W4N2E3NE4N"}]},
   {country_id: "country_saudi_arabia", country_name: "Saudi Arabia", map_data: [{origin_x:"315", origin_y:"135", border_data:"EN2ES3ESESE2SES6E2SESESE2SE2SE2S2ES4EN2EN3ES2ESESES2ES2ESW2SW2SWSW2SWSWSWSWSWS2WSWSWSWSWS3WS4WS2WS4WNWNW2NW5NWNW2NW3NWN2W3NW2NW3NWNWNW2NWNWNW5N6E5N"}]},
   {country_id: "country_iran", country_name: "Iran", map_data: [{origin_x:"323", origin_y:"118", border_data:"5E2S3E4S4EN3EN9EES5E9SSE3SW3SE3SESE3SWSW2S2WN2WNWN2WN3WS4WNWNWNWNWNWNWN4W4NWNWNWNW2NWNW5NW6N"}]},
   {country_id: "country_afghanistan", country_name: "Afghanistan", map_data: [{origin_x:"353", origin_y:"127", border_data:"3ENE2N2EN8E2N3E2S5ES2WSWS2W4SWSW3S2WS2WSW2SWS9W3NE3NW6N"}]},
   {country_id: "country_jordan", country_name: "Jordan", map_data: [{origin_x:"311", origin_y:"132", border_data:"5E3SW5S6WNENE6N"},{origin_x:"35", origin_y:"277", border_data:"ES2ES2ESESESESESES2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN2ENEN3E3SE3SE3SE3SE3SE3SE3S2WS4WS3WS4WS4WS4WS3WS3WS2WSE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2SE2S3W2SW2SWS2WS2WS2W2SWSWSWSWS5WS9W9W2W3NE2NE2NE3NE3NE4NE3NE2NW4NE4NE3NE2N2WSWSWS4WNWN2E3N2ENE2N2W3NE3NENE3NE2NE2NEN2EN3ENE3N"}]},
   {country_id: "country_lebanon", country_name: "Lebanon", map_data: [{origin_x:"308", origin_y:"128", border_data:"3E3S3W3N"},{origin_x:"36", origin_y:"247", border_data:"3EN5ES2E5SWSWSW2SW5S2W3SWSWSWS2WSW2S5W4NE7NE3NE2NE2NE2NENE2N"}]},
   
]

const border_data = [
  {
    border_id: "border_mini_map_central_america",
    border_name: "Central America",
    border_data: "M2 167 L2 239 L86 239 L86 187 L66, 167 L2 167"
  },
  {
    border_id: "border_mini_map_middle_east",
    border_name: "Middle East",
    border_data: "M2 243 L88 243 L88 340 L2 340 L2 243"
  },
  {
    border_id: "border_main_map",
    border_name: "Main Map",
    border_data: "M0 0 L512 0 L512 342 L0 342 L0 0"
  }
];