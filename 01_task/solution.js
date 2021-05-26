// needed global variables
const utils = createUtils();
const margin = utils.chartMargins;

const chartWidth = utils.svgWidth - margin.left - margin.right;
const chartHeight = utils.svgHeight - margin.top - margin.bottom;

let dataset, svg, xScale, yScale, xAxis, yAxis = undefined;

function createChart() {
    // initial dataset for line chart
    // e.g. dataset = [0,1,2,3,4,5,6,7,8,9,10]
    dataset = utils.staticDataset.slice();

    // creating the svg element
    svg = d3.select('#main')
    .append('svg')
    .attr('width', utils.svgWidth)
    .attr('height', utils.svgHeight);

    /*
      ToDo: create linear xScale
    */
    xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, chartWidth]);

    /*
      ToDo: create linear yScale
    */
    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([chartHeight, 0]);

    svg.selectAll('path')
        .data([dataset])
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', utils.colors.pink)
        // add margin to x and y because of transforming the axes see lines 46 to 51
        .attr('d', d3.line()
            .x((d, i) => xScale(i) + margin.left)
            .y((d) => yScale(d) + margin.top)
        );

    // creating xAxis & yAxis
    xAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${chartHeight + margin.top})`)
        .call(d3.axisBottom(xScale));
    yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale));
}

function changeDataset() {
    dataset = utils.getRandomDataset();
    updateChart();
}

function addData() {
    const newValue = utils.getRandomValue();

    /*
      ToDo: add newValue to the existing dataset
    */
    dataset.push(newValue);

    updateChart();
}

function removeData() {
    // selectVal contains 'first' or 'last'
    const selectVal = document.getElementById('arr-remove-opt').value;

    /*
      ToDo: remove first or last element from dataset depending on value of selectVal
     */
    if (selectVal === 'last') {
        dataset.pop();
    } else {
        dataset.shift();
    }

    updateChart();
}

/*
  ToDo: implement updateChart function
 */
function updateChart() {
    // update the scales
    xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, chartWidth]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([chartHeight, 0]);

    // update the axes
    xAxis.call(d3.axisBottom(xScale));
    yAxis.call(d3.axisLeft(yScale));

    // update the svg path (redraw the line)
    svg.selectAll('path')
        .data([dataset])
        .attr('d', d3.line()
            .x((d, i) => xScale(i) + margin.left)
            .y((d) => yScale(d) + margin.top)
     );
}
