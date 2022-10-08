import React from 'react'

import * as d3 from "d3"

class WordcloudChart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ref: React.createRef()
        }
        this.createWordcloudChart = this.createWordcloudChart.bind(this)
    }

    componentDidMount() {
        this.props.data ? this.createWordcloudChart() : console.log('no data')
    }

    componentDidUpdate() {
        this.props.data ? this.createWordcloudChart() : console.log('no data')
    }

    createWordcloudChart() {
        // refrence to svg
        const node = this.state.ref.current

        clean()

        function clean() {
            d3.select(node)
                .selectAll("*")
                .remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} />
        );
    }
}

export default WordcloudChart;