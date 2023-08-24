//Area chart
const canvas = d3.select('.canva');

var data = [
    45,56,
    78,79,
    73,75,
    75,98,
    102,142,
    224,256,
];


var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


var parseMonths = d3.timeParse('%B');

const svg = canvas.append('svg')
                .attr('width', '900')
                .attr('height', '900')

const margin = {top: 20, right: 20, bottom: 70, left: 70}
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 -margin.top - margin.bottom;

const mainCanvas = svg.append('g')
                .attr('height', graphHeight)
                .attr('width', graphWidth)
                .attr('transform',`translate(${margin.left},${margin.top})`);

//set range and domain
var x = d3.scaleTime()
                .domain(d3.extent(months, d => parseMonths(d)))
                .range([0, graphWidth])

var y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d)])
            .range([graphHeight, 0])

var areaChart= d3.area()
                 .x((d, i) => {return x(parseMonths(months[i]))})
                 .y0(graphHeight)
                 .y1((d, i) => (graphHeight - d))   

mainCanvas.append('path')
            .attr('fill' ,'green')
            .attr('class', 'area')
            .attr('d', areaChart(data))

