import React from 'react'

import * as d3 from "d3"

class SunburstChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef(),
            radius: this.props.size / 2,
            viewbox: `-5 -20 ${this.props.width + 30} ${this.props.height + 20}`,
            font_size: this.props.size * 10 / 975 
        }
        this.createSunburstChart = this.createSunburstChart.bind(this)
    }

    componentDidMount() {
        this.props.data ? this.createSunburstChart() : console.log('no data')
    }

    componentDidUpdate() {
        this.props.data ? this.createSunburstChart() : console.log('no data')
    }

    createSunburstChart() {
        // refrence to svg
        const node = this.state.ref.current

        clean()

        const partition = (data) => d3.partition().size([2 * Math.PI, this.state.radius])(d3.hierarchy(data).sum((d) => d.value).sort((a, b) => b.value - a.value));

        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.props.data.children.length + 1));

        const format = d3.format(",d");

        const arc = d3.arc()
            .startAngle((d) => d.x0)
            .endAngle((d) => d.x1)
            .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(this.state.radius / 2)
            .innerRadius((d) => d.y0)
            .outerRadius((d) => d.y1 - 1);


        const { x, y, width, height } = node.getBBox();


        const root = partition(this.props.data);

        const svg = d3.select(node);

        svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("path")
            .data(root.descendants().filter((d) => d.depth))
            .join("path")
            .attr("fill", (d) => {
                while (d.depth > 1) d = d.parent;
                return color(d.data.name);
            })
            .attr("d", arc)
            .append("title")
            .text((d) => `${d.ancestors().map((d) => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        svg.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .attr("font-size", this.state.font_size)
            .attr("font-family", "sans-serif")
            .selectAll("text")
            .data(root.descendants().filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10))
            .join("text")
            .attr("transform", function (d) {
                const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
                const y = (d.y0 + d.y1) / 2;
                return `rotate(${x - 90
                    }) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            })
            .attr("dy", "0.35em")
            .text((d) => d.data.name);

        svg.attr("viewBox", getAutoBox);

        this.state.viewbox = getAutoBox()

        function getAutoBox() {
            if (!node)
                return this.state.viewbox;

            const { x, y, width, height } = node.getBBox();

            return [x, y, width, height].toString();
        };

        function clean() {
            d3.select(node)
                .selectAll("*")
                .remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} width={this.props.size} height={this.props.size} viewBox={this.state.viewbox} />
        );
    }
}

export default SunburstChart;