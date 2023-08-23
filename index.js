//Area chart
const canvas = d3.select('.canva');

var data = [
    45.00,78.25,89.26,75.26,42.75,62.69,54.59,36.03,82.01,25.00,41.00,65.00,76.00,98.26,105.00,12.98,25.65,36.00,42.65,25.33,88.63,145.00,355.00,122.15,547.00,54.25,488.22
];


var months = ['January','February','March','April','May','June','July','August','September','October','November ','December'];


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

var areaChart= d3.area()
                 .x((d, i) => i*40)
                 .y0(graphHeight)
                 .y1((d, i) => (graphHeight - d))      
                 
mainCanvas.append('path')
            .attr('fill' ,'orange')
            .attr('class', 'area')
            .attr('d', areaChart(data))

