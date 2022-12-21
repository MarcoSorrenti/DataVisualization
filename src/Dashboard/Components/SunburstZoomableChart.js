import React from 'react'

import * as d3 from "d3"

class SunburstZoomableChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef(),
            radius: this.props.size / 6
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
        const radius = this.state.radius

        clean()

        const partition = data => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);
        }
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateSinebow, this.props.data.children.length + 1));
        const format = d3.format(",d");

        const arc = d3.arc()
            .startAngle((d) => d.x0)
            .endAngle((d) => d.x1)
            .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius(d => d.y0 * radius)
            .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

        const root = partition(this.props.data);

        root.each(d => d.current = d);

        const svg = d3.select(node)
            .attr("viewBox", [0, 0, this.props.size, this.props.size])
            .style("font", "10px sans-serif");

        const g = svg.append("g")
            .attr("transform", `translate(${this.props.size / 2},${this.props.size / 2})`);

        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

            .attr("d", d => arc(d.current));

        path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

        path.append("title").text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .text(d => d.data.name);

        const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        const ratings = ['TV-PG: Older Kids', 'TV-MA: Adults', 'TV-Y7-FV: Older Kids', 'TV-Y7: Older Kids', 'TV-14: Teens', 'R: Adults', 'TV-Y: Kids', 'NR: Adults', 'PG-13: Teens', 'TV-G: Kids', 'PG: Older Kids', 'G: Kids', 'UR: Adults', 'NC-17: Adults']

        ratings.forEach(function (r, i) {
            svg.append("text")
                .text(r)
                .attr("x", -70)
                .attr("y", 22 + 18 * i);
        });

        function clicked(event, p) {
            parent.datum(p.parent || root);

            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function (d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

                .attrTween("d", d => () => arc(d.current));

            label.filter(function (d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
        }

        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        function clean() {
            d3.select(node)
                .selectAll("*")
                .remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} width={this.props.size + 250} height={this.props.size} />
        );
    }
}

export default SunburstZoomableChart;