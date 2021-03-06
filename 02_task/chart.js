// global variables
const utils = createUtils();
const margin = utils.chartMargins;

const chartWidth = utils.svgWidth - margin.left - margin.right;
const chartHeight = utils.svgHeight - margin.top - margin.bottom;

let dataset, svg, xScale, yScale, xAxis, yAxis = undefined;

function createChart() {
  dataset = utils.staticDataset.slice();

  svg = d3.select('#main')
    .append('svg')
    .attr('width', utils.svgWidth)
    .attr('height', utils.svgHeight);

  xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, chartWidth]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([chartHeight, 0]);

  svg.selectAll('path')
    .data([dataset])
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', utils.colors.red)
    .attr('d', d3.line()
      .x((d, i) => xScale(i) + margin.left)
      .y((d) => yScale(d) + margin.top)
    );

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
  dataset.push(newValue);
  updateChart();
}

function removeData() {
  // selectVal contains 'first' or 'last'
  const selectVal = document.getElementById('arr-remove-opt').value;

  if (selectVal === 'last') {
    dataset.pop();
  } else {
    dataset.shift();
  }

  updateChart();
}

function updateChart() {
  const transitionDuration = 750;
  const easeType = d3.easeLinear;

  xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, chartWidth]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([chartHeight, 0]);

  xAxis
    /*
      ToDo: add transition
    */
    .call(d3.axisBottom(xScale));
  yAxis
    /*
      ToDo: add transition
    */
    .call(d3.axisLeft(yScale));

  svg.selectAll('path')
    .data([dataset])
    /*
      ToDo: add two (chained) transitions
    */
    .attr('d', d3.line()
      .x((d, i) => xScale(i) + margin.left)
      .y((d) => yScale(d) + margin.top)
    );
}
