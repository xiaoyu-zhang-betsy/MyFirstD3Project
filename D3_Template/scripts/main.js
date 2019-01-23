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

// define a group for our visualization
// this is good practice (to keep things clustered into their relevant groups),
// and lets you manipulate the entire group
var g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// select which file you want to load in our CSV file
// d3.csv('SalaryData_100.csv').then(function(data) {
 d3.csv('Mobile_Food_Facility_Permit.csv').then(function(data) {
// d3.csv('Electronic_Police_Report_2015.csv').then(function(data) {
// d3.csv('1940-2010_Census_Basic_Census_Tract_Data.csv').then(function(data) {
    // we have our data in here now
    var dataSrc = {};
    count = 0
    //For each data entry
    //This is where you will modify the data before storing it
    data.forEach(function(datum) {
      dataSrc[count] = datum
      count += 1
    });

    console.log(dataSrc)

});

var p = body.selectAll("p");
p.text("Hello World");
