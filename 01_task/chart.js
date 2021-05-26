// --- needed global variables
const utils = createUtils();
const margin = utils.chartMargins;

const chartWidth = utils.svgWidth - margin.left - margin.right;
const chartHeight = utils.svgHeight - margin.top - margin.bottom;

let dataset, svg, xScale, yScale, xAxis, yAxis = undefined;

function createChart() {
  // initial dataset for line chart
  // e.g. dataset = [0,1,2,3,4,5,6,7,8,9,10]
  dataset = utils.staticDataset.slice();

  // creating svg element
  svg = d3.select('#main')
    .append('svg')
    .attr('width', utils.svgWidth)
    .attr('height', utils.svgHeight);

  /*
    ToDo: create linear xScale
   */


  /*
    ToDo: create linear yScale
   */


  svg.selectAll('path')
    .data([dataset])
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', utils.colors.pink);
    /*
      ToDo: add d3.line() info: add margin to x and y because of transforming the axes
     */

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

  updateChart();
}

function removeData() {
  // selectVal contains 'first' or 'last'
  const selectVal = document.getElementById('arr-remove-opt').value;

  /*
    ToDo: remove first or last element from dataset depending on value of selectVal
   */

  updateChart();
}

/*
  ToDo: implement updateChart function
 */
function updateChart() {
  // update the scales

  // update the axes

  // update the svg path (redraw the line)
}
