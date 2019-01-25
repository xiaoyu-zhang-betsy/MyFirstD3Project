// Example adapted from Mike Bostock: https://bl.ocks.org/mbostock/3885304
// Modified to work with d3.v5
// https://blog.csdn.net/qq_34414916/article/details/80026029
console.log('Hello from main.js');

// some margins for our graph (so it fits our SVG viewport nicely)
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 80
};

// create our SVG canvas and give it the height and width we want
var body = d3.select("body");
var svg = body.append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

// height and width of our chart
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

// x and y scales, the input domain is our data and the output range
// is a position value within the visualization's viewport
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().rangeRound([height, 0]);
/*
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);*/

// define a group for our visualization
// this is good practice (to keep things clustered into their relevant groups),
// and lets you manipulate the entire group
var g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// select which file you want to load in our CSV file
var dataSrc = {};
var facility = [];
// d3.csv('SalaryData_100.csv').then(function(data) {
d3.csv('Mobile_Food_Facility_Permit.csv').then(function(data) {
// d3.csv('Electronic_Police_Report_2015.csv').then(function(data) {
// d3.csv('1940-2010_Census_Basic_Census_Tract_Data.csv').then(function(data) {
    // we have our data in here now
    count = 0
    //For each data entry
    //This is where you will modify the data before storing it
    data.forEach(function(datum) {
      dataSrc[count] = datum
      facility.push(datum)
      count += 1
    });
});

//var p = body.selectAll("p");
//p.text("Hello World");

/*       
var width = 960;
var height = 500;

var svg = d3.select("svg")

var projection = d3.geoMercator()
  .translate([427200 + width / 2, 142600 + height / 2])
  //.scale(width / 2 / Math.PI)
  .scale(200000)
  
var path = d3.geoPath()
  .projection(projection);

console.log(projection)

var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
// console.log(url)

//d3.json(url).then(function(geojson) {
d3.json("SanFrancisco.json").then(function(geojson) {
  console.log(geojson.features);
  svg.append("path")
    .attr("d", path(geojson))
  console.log(svg)
  });
*/

var width = 500,
height = 400;
var color = d3.scaleOrdinal()
.domain([1,2,3,4,5,6,7,8,9])
.range( colorbrewer.Oranges[9]);

//var projection = d3.geoMercator()
//.scale(800)
//.translate([-500,600]);

//var projection = d3.geoMercator().scale(1100).translate([-1000,800]);
var projection = d3.geoMercator()
  //.scale(width / 2 / Math.PI)
  .scale(150000)
  .translate([320550 + width / 2, 106880 + height / 2])

var path = d3.geoPath()
.projection(projection);

var svg = d3.select("#map").append("svg")

.attr("viewBox", "0 0 500 400")
.attr("preserveAspectRatio", "xMidYMid meet");
var data;

var infoText = "";
//d3.json("test.json").then(function(sf) {
  //var cantons = topojson.feature(sf, sf.objects.india);
d3.json("SanFrancisco.topojson").then(function(sf) {
  var cantons = topojson.feature(sf, sf.objects.SanFrancisco);

  //svg.call(tip);
  var group=svg.selectAll("g")
  .data(cantons.features)
  .enter()
  .append("g");
  //.on('mouseover', tip.show)
  //.on('mouseout', tip.hide)

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .style("left", "300px")
    .style("top", "400px")
    .html(function(d) {
      return (d.Applicant);
    })
    
  svg.call(tip);

  var dotSize = 4;
  var link = null;;
  svg.selectAll(".pin")
    .data(facility)
    .attr("xlink:href", function(d) {
      console.log(p.Schedule);
      return p.Schedule;
    })
    .enter().append("circle", ".pin")
    .attr("r", dotSize)
    .attr("fill", function(d){
      if(d.Status == "EXPIRED")
        return "red"
      else if(d.Status == "SUSPEND" || d.Status == "REQUESTED") 
        return "#fff00b"
      return "#009C21"
    })
    .attr("stroke", "gray")
    .attr("transform", function(d) {
    return "translate(" + projection([
      parseFloat(d.Longitude),
      parseFloat(d.Latitude),
    ]) + ")";
    })
    .on('mouseover', function(d){
      tip.show(d);
      var info = body.select("#info");
      info.text("\n\n\n" 
      + "\nID: " + d.locationid 
      + "\nApplicant: " + d.Applicant
      + "\nFacilityType: " + d.FacilityType 
      + "\nAddress: " + d.Address
      + "\nFoodItems: " + d.FoodItems
      + "\nStatus: " + d.Status
      );
    })
    .on('click', function(p, i){
      window.open(p.Schedule);
    });

    console.log(svg)

  //var projection = d3.geo.mercator().scale(900).translate([-600,700]);
  

  var areas= group.append("path")
  .attr("d", path)
  .attr("class", "area")
  .attr("fill","#f5f8f8")
  .attr("stroke", "#0063b0")
  .attr("stroke-width", "2");
});

var centered = null;

function clicked(d) {
  var x, y, k;

  console.log(d)
  
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    console.log(centered)
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}