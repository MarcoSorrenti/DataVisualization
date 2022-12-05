import React from 'react'

import * as d3 from "d3"
import d3Cloud from "d3-cloud";

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

        const text = this.props.data.toString()

        console.log("text: ", text)

        const stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall,&,1,2,3,4,5,6,7,8,9,0,ki,ii,la,vs,two,one,two,el,im,del,hai,aur,oh,los,ka,go,mr,de,get,10,x,y,iii,fu".split(","))

        const words = text.split(/[\s.]+/g)
            .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
            .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
            .map(w => w.replace(/['’]s$/g, ""))
            .map(w => w.substring(0, 30))
            .map(w => w.toLowerCase())
            .filter(w => w && !stopwords.has(w))

        words.filter(w => /\W/.test(w))

        WordCloud(words, {
            fontFamily: "Impact",
            maxWords: this.props.max_words,
        })

        function WordCloud(text, {
            size = group => group.length, // Given a grouping of words, returns the size factor for that word
            word = d => d, // Given an item of the data array, returns the word
            marginTop = 0, // top margin, in pixels
            marginRight = 0, // right margin, in pixels
            marginBottom = 0, // bottom margin, in pixels
            marginLeft = 0, // left margin, in pixels
            width = 1080, // outer width, in pixels
            height = 700, // outer height, in pixels
            maxWords = 180, // maximum number of words to extract from the text
            fontFamily = "sans-serif", // font family
            fontScale = 2, // base font size
            padding = 0, // amount of padding between the words (in pixels)
            rotate = 0, // a constant or function to rotate the words
            invalidation, // when this promise resolves, stop the simulation
        } = {}) {

            const words = typeof text === "string" ? text.split(/\W+/g) : Array.from(text);

            const data = d3.rollups(words, size, w => w)
                .sort(([, a], [, b]) => d3.descending(a, b))
                .slice(0, maxWords)
                .map(([key, size, freq]) => ({ text: word(key), size, freq: word(freq) }));

            const svg = d3.select(node)
                .attr("viewBox", [0, 0, width, height])
                .attr("width", width)
                .attr("font-family", fontFamily)
                .attr("text-anchor", "middle")
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

            const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);

            const cloud = d3Cloud()
                .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
                .words(data)
                .padding(padding)
                .rotate(rotate)
                .font(fontFamily)
                .fontSize(d => Math.sqrt(d.size) * fontScale)
                .on("word", ({ size, x, y, rotate, text, freq }) => {
                    g.append("text")
                        .attr("font-size", size)
                        .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
                        .attr("opacity", 1.0)
                        .attr("fill", d3.schemeTableau10[d3.randomInt(0, d3.schemeTableau10.length)()])
                        .text(text)
                        .on("mouseover", function () {d3.select(this).attr("opacity", 0.6);})
                        .on("mouseout", function () {d3.select(this).attr("opacity", 1.0);})
                });

            cloud.start();
            invalidation && invalidation.then(() => cloud.stop());
        }

        function clean() {
            d3.select(node).selectAll("*").remove()
        }

    }

    render() {
        return (
            <svg ref={this.state.ref} />
        );
    }
}

export default WordcloudChart;