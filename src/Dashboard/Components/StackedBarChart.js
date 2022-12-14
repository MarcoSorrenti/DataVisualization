import React from 'react'

import * as d3 from "d3"

class StackedBarChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef()
        }
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.props.data ? this.createBarChart() : console.log('no data')
    }

    componentDidUpdate() {
        this.props.data ? this.createBarChart() : console.log('no data')
    }

    createBarChart() {
        // refrence to svg
        const node = this.state.ref.current;

        const margin = { top: 10, right: 0, bottom: 10, left: 15 }
        const width = 450 - margin.left - margin.right
        const height = width / 4 - margin.top - margin.bottom

        clean();

        const data = d3.csvParse(this.props.data.toString(), (d, i, columns) => (d3.autoType(d), d.total = d3.sum(columns, c => d[c]), d)).sort((a, b) => b["<10"] / b.total - a["<10"] / a.total)
        const series = d3.stack().keys(data.columns.slice(1)).offset(d3.stackOffsetExpand)(data).map(d => (d.forEach(v => v.key = d.key), d))
        const svg = d3.select(node)
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible");

        const x = d3.scaleLinear().range([margin.left, width - margin.right])

        const y = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.08)

        const color = d3.scaleOrdinal()
            .domain(["F", "M"])
            .range(["#b20710","#221f1f"])

        const xAxis = g => g
            .attr("transform", `translate(0,${margin.top})`)
            .call(g => g.selectAll(".domain").remove())

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(g => g.selectAll(".domain").remove())

        const formatPercent = d3.format(".1%")

        const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

        svg.append("g")
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => x(d[0]))
            .attr("y", (d, i) => y(d.data.name))
            .attr("width", d => x(d[1]) - x(d[0]))
            .attr("height", y.bandwidth())
            .append("title")
            .text(d => `${d.data.name} ${d.key}${formatPercent(d[1] - d[0])} (${formatValue(d.data[d.key])})`);

        svg.append("g")
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("font-family", "Impact")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(d => d)
            .join("text")
            .attr("transform", (d, i) => `translate(${x((d[0] + d[1]) / 2)},${y(d.data.name) + y.bandwidth()})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.55em")
                .attr("font-weight", "bolder")
                .attr("font-size", 30)
                .attr("fill", "#f5f5f1")
                .text(d => d.data[d.key] !== 0 ? Math.round(d.data[d.key]*100/d.data['total']) +" %" : null))

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        const legend_svg = d3.select("#legend")
        // Handmade legend
        legend_svg.append("circle").attr("cx",width/2-10).attr("cy",15).attr("r", 6).style("fill", "#b20710")
        legend_svg.append("circle").attr("cx",width/2-10).attr("cy",30).attr("r", 6).style("fill", "#221f1f")
        legend_svg.append("text").attr("x", width/2).attr("y", 15).text("Movies").style("font-size", "15px").attr("alignment-baseline","middle")
        legend_svg.append("text").attr("x", width/2).attr("y", 30).text("Tv Series").style("font-size", "15px").attr("alignment-baseline","middle")

        function clean() {
            d3.select(node).selectAll("*").remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} width={this.state.width} height={this.state.height} />
        );
    }
}

export default StackedBarChart;