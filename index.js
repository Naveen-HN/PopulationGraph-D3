const csv = d3.csv;
const scaleLinear = d3.scaleLinear;
const max = d3.max;
const scaleBand = d3.scaleBand;
const axisLeft = d3.axisLeft;
const axisBottom = d3.axisBottom;
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');


const render = data => {

    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 120
    }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear().domain([0, max(data, d => xValue(d))]).range([0, innerWidth]);

    const yScale = scaleBand().domain(data.map(d => yValue(d))).range([0, innerHeight]).padding(0.1);
    console.log(yScale.domain())


    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(axisLeft(yScale));
    g.append('g').call(axisBottom(xScale)).attr('transform', `translate(0,${innerHeight})`);;

    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'steelblue')
}

csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    })
    console.log(data)
    render(data);
})