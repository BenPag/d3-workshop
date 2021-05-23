// --- needed gloabl variables 
const utils = createUtlis();
const margin = utils.chartMargins;

const chartWidth = utils.svgWidth - margin.left - margin.right;
const chartHeight = utils.svgHeight - margin.top - margin.bottom;

let dataset, svg, xScale, yScale, xAxis, yAxis = undefined;

function createChart() {
    // initial dataset for line chart
    dataset = utils.staticDataset.slice();

    // create svg element
    svg = d3.select('#main')
    .append('svg')
    .attr('width', utils.svgWidth)
    .attr('height', utils.svgHeight);

    // ToDo: create xScale


    // ToDo: create yScale


    // ToDo: create svg path (draw the line)
    // ---> tip: add margin.left to x value and margin.top to y value


    // create xAxis & yAxis
    xAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${chartHeight + margin.top})`)
        .call(d3.axisBottom(xScale));
    yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale));
}

function changeDataset() {
    dataset = utils.getRandomDataset();

    // ToDo: implment updateChart function
    updateChart();
}

function addData() {
    const newValue = utils.getRandomValue();

    // ToDo: add value dataset

    updateChart();
}

function removeData() {
    // conatins 'first' or 'last'
    const selectVal = document.getElementById('arr-remove-opt').value;

    // ToDo: remove first or last element from dataset depending

    updateChart();
}

function updateChart() {
    // ToDo: update scales

    // ToDo: update axes

    // ToDo: update svg path (redraw the line)
}