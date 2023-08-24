//Area chart
const canvas = d3.select('.canva');

var data = [
    55,66,
    78,79,
    73,105,
    145,178,
    242,342,
    499,540,
];


var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


var parseMonths = d3.timeParse('%B');

const svg = canvas.append('svg')
                .attr('width', '900')
                .attr('height', '900')

const margin = {top: 30, right: 30, bottom: 80, left: 80}
const graphWidth = 650 - margin.left - margin.right;
const graphHeight = 650 -margin.top - margin.bottom;

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
                 

//define graph line
var valueLine = d3.line()
                    .x((d, i) => {return x(parseMonths(months[i]))})
                    .y((d, i) => y(d))
                    

//add the valueLine path
mainCanvas.append('path')
            .data([data])
            .attr('fill','none')
            .attr('class', 'mline')
            .attr('d', valueLine)

mainCanvas.append('path')
            .attr('fill' ,'green')
            .attr('class', 'area')
            .attr('d', areaChart(data))
            .style('opacity', 0.8)

//dots 
var circles = mainCanvas.selectAll('circle')
                        .data(data)
                        .enter().append('circle')
                        .attr('class','dot')
                        .attr('cx', (d, i) => {return x(parseMonths(months[i]))})
                        .attr('cy', (d, i) => y(d))
                        .attr('r', 3.5)

//add axis
var xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat('%b'))
                .tickPadding(12)
             
                
var yAxis = d3.axisLeft(y)
             .ticks(10)
             .tickPadding(10)
             .tickSize(11)
            

mainCanvas.append('g')
            //in order to be in bottom->
            .attr('transform', `translate(0, ${graphHeight})`)
            .call(xAxis)
mainCanvas.append('g')
            .call(yAxis)