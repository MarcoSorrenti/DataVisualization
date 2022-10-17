import React from 'react'

import * as d3 from "d3"

class BarChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef(),
            width: this.props.size,
            height: this.props.size * 2 / 3,
            margin: { top: 20, right: 0, bottom: 30, left: 40 }
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

        clean();

        const data = this.props.data.sort((a, b) => b.frequency - a.frequency);

        const x = d3.scaleBand()
            .domain(data.map(d => d.letter))
            .range([this.state.margin.left, this.state.width - this.state.margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.frequency)]).nice()
            .range([this.state.height - this.state.margin.bottom, this.state.margin.top])

        const xAxis = g => g
            .attr("transform", `translate(0,${this.state.height - this.state.margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))

        const yAxis = g => g
            .attr("transform", `translate(${this.state.margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())

        const svg = d3.select(node)
            .attr("viewBox", [0, 0, this.state.width, this.state.height])

        svg.append("g")
            .attr("class", "bars")
            .attr("fill", "steelblue")
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