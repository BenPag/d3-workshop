// global variables
const utils = createUtils();
const margin = utils.chartMargins;

const chartWidth = utils.svgWidth - margin.left - margin.right;
const chartHeight = utils.svgHeight - margin.top - margin.bottom;
const circleRadius = 4;

let dataset, svg, xScale, yScale, xAxis, yAxis, circles = undefined;

function createChart() {
  // initial dataset for circle chart
  // e.g. dataset = [{key: 1, value, 2}, {key: 2, value, 5}, {key: 3, value, 8}, {key: 4, value, 4},]
  dataset = utils.staticDataset.map(utils.mapToObject);

  svg = d3.select('#main')
    .append('svg')
    .attr('width', utils.svgWidth)
    .attr('height', utils.svgHeight);

  xScale = d3.scaleLinear()
    /*
      ToDo: use object property 'key' as domain value
    */
    .domain([0, d3.max(dataset, (d) => d.key)])
    .range([0, chartWidth]);

  yScale = d3.scaleLinear()
    /*
      ToDo: use object property 'value' as domain value
    */
    .domain([0, d3.max(dataset, (d) => d.value)])
    .range([chartHeight, 0]);

  svg.append('g').selectAll('circle')
    .data(dataset, (d) => d.key)
    .enter()
    .append('circle')
    .attr('fill', utils.colors.pink)
    .attr('r', circleRadius)
    /*
      ToDo: use object properties here
    */
    .attr('cx', (d) => xScale(d.key) + margin.left)
    .attr('cy', (d) => yScale(d.value) + margin.top);

  xAxis = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${chartHeight + margin.top})`)
    .call(d3.axisBottom(xScale));
  yAxis = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale));
}

function changeDataset() {
  const minKeyValue = d3.min(dataset, (d) => d.key);
  const newValues = [...utils.getRandomDataset(), ...utils.getRandomDataset()];

  dataset = newValues.slice(0, (newValues.length / 2) + minKeyValue)
    .map(utils.mapToObject)
    .slice(minKeyValue);

  updateChart();
}

function addData() {
  const max = yScale.domain()[1];
  const newValue = utils.getRandomValue(max * 2);
  const lastKey = dataset[dataset.length - 1].key;
  dataset.push(utils.mapToObject(newValue, lastKey + 1));

  updateChart();
}

function removeData() {
  // contains 'first' or 'last'
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
    /*
      ToDo: use object property 'key' as domain value
    */
    .domain([0, d3.max(dataset, (d) => d.key)])
    .range([0, chartWidth]);

  yScale = d3.scaleLinear()
    /*
      ToDo: use object property 'value' as domain value
    */
    .domain([0, d3.max(dataset, (d) => d.value)])
    .range([chartHeight, 0]);

  xAxis
    .transition()
    .duration(transitionDuration)
    .ease(easeType)
    .call(d3.axisBottom(xScale));
  yAxis
    .transition()
    .duration(transitionDuration)
    .ease(easeType)
    .call(d3.axisLeft(yScale));

  svg.selectAll('circle')
    .data(dataset, (d) => d.key)
    .join(
      (enter) => enter.append('circle')
        .attr('cx', chartWidth / 2)
        .attr('cy', chartHeight / 2)
        .attr('r', circleRadius * 5)
        .attr('fill', 'green'),
      (update) => update,
      (exit) => exit
        .attr('fill', 'red')
        .attr('r', circleRadius * 2)
        .call(exit => exit.transition()
          .duration(transitionDuration)
          .attr('r', 1)
          .attr('fill', 'transparent')
          .on('end', function () {
            d3.select(this).remove();
          }))
    )
    .transition()
    .duration(transitionDuration)
    .attr('fill', utils.colors.pink)
    .attr('r', circleRadius)
    .attr('cx', (d) => xScale(d.key) + margin.left)
    .attr('cy', (d) => yScale(d.value) + margin.top);
// */
}
