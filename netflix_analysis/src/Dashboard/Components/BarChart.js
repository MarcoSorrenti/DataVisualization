import React from 'react'

import * as d3 from "d3"

class BarChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef(),
            width: this.props.size,
            height: this.props.data * 3 / 2,
            margin: { top: 10, right: 0, bottom: 20, left: 30 }
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

        const margin = { top: 10, right: 10, bottom: 10, left: 10 }
        const width = this.state.width;
        const height = this.state.height;


        

        function clean() {
            d3.select(node)
                .selectAll("*")
                .remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} width="600" height="500" />
        );
    }
}

export default BarChart;