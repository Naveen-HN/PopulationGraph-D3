const csv = d3.csv;
const scaleLinear = d3.scaleLinear;
const max = d3.max;
const scaleBand = d3.scaleBand;
const axisLeft = d3.axisLeft;
const axisBottom = d3.axisBottom;
const format = d3.format;
const scalePoint = d3.scalePoint;
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');


const render = data => {

    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {
        top: 50,
        right: 30,
        bottom: 70,
        left: 200
    }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear().domain([0, max(data, d => xValue(d))]).range([0, innerWidth]).nice();

    const yScale = scaleBand().domain(data.map(d => yValue(d))).range([0, innerHeight]).padding(0.1);
    console.log(yScale.domain())

    const cyScale = scalePoint().domain(data.map(d => yValue(d))).range([0, innerHeight]).padding(0.5);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisTickFormat = number => format('.3s')(number).replace('G', 'B');
    const xAxis = axisBottom(xScale).tickFormat(xAxisTickFormat).tickSize(-innerHeight);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth)
    g.append('g').call(yAxis).select('.domain').remove();
    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text').attr('class', 'axis-label').attr('y', 60).attr('x', innerWidth / 2).attr('fill', 'black').text('Population')

    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'steelblue')
    g.append('text').attr('class', 'title').attr('y', -10).text('Top 14 most populous countries in the world')


    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', d => cyScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 10)
        .attr('fill', '#A93226')


}



csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    })
    console.log(data)
    render(data);
})