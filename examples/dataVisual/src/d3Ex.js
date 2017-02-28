/*
* @Author: qianlu
* @Date:   2017-02-28 11:28:11
* @Last Modified by:   qianlu
* @Last Modified time: 2017-02-28 15:04:06
*/

'use strict';

require('d3');
var d3_hexbin = require('d3-hexbin');

var margin = {top: 50, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80),
    points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

console.log(points);

var color = d3.scale.linear()
    .domain([0, 80])
    .range(["rgb(237, 242, 247)", "rgb(0, 92, 155)"])
    .interpolate(d3.interpolateLab);

var hexbin = d3_hexbin.hexbin().radius(24);

/*var x = d3.scale.identity()
    .domain([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);*/

/*var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(6, -height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(6, -width);*/

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("class", "mesh")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("class", "grp grpHex")
    .attr("clip-path", "url(#clip)")
  .selectAll(".hexagon")
    .data(hexbin(points))
  .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", hexbin.hexagon())
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .style("fill", function(d) {
        return color(d.length); 
    });

svg.append("g")
    .attr("class", "grp gIcon")

/*svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);*/