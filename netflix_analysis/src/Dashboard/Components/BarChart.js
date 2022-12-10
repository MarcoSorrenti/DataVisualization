import React from 'react'

import * as d3 from "d3"

class BarChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef(),
            width: this.props.size,
            height: this.props.size * 2 / 3 + 60,
            color: this.props.color,
            legend: this.props.legend
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

        const margin = { top: 20, right: 0, bottom: 30, left: 40 }
        const width = this.state.width
        const height = this.state.height
        const color = this.state.color

        clean();

        const data = this.props.data.sort((a, b) => b.frequency - a.frequency);

        const x = d3.scaleBand()
            .domain(data.map(d => d.letter))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.frequency)]).nice()
            .range([height - margin.bottom, margin.top])

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())

        const svg = d3.select(node)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .attr("class", "bars")
            .attr("fill", color)
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.letter))
            .attr("y", d => y(d.frequency))
            .attr("height", d => y(0) - y(d.frequency))
            .attr("width", x.bandwidth());

        svg.append("g")
            .attr("class", "x-axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        if(this.state.legend){
            const ratings = ['TV-PG: Older Kids', 'TV-MA: Adults', 'TV-Y7-FV: Older Kids', 'TV-Y7: Older Kids', 'TV-14: Teens', 'R: Adults', 'TV-Y: Kids', 'NR: Adults', 'PG-13: Teens', 'TV-G: Kids', 'PG: Older Kids', 'G: Kids', 'UR: Adults', 'NC-17: Adults']

            ratings.forEach(function (r, i) {
                svg.append("text")
                    .text(r)
                    .attr("x", 350)
                    .attr("y", 22 + 18 * i);
            });
        }

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

export default BarChart;