import React from 'react';
import { csv } from 'd3-fetch';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Slider from '@mui/material/Slider';

import Image from 'mui-image'

import ScrollTop from './Components/ScrollTop';
import DatasetInfo from './Components/DatasetInfo';
import DatasetInfoDialog from './Components/DatasetInfoDialog';

import WordcloudChart from './Components/WordcloudChart';
import SunburstZoomableChart from './Components/SunburstZoomableChart';
import BarChart from './Components/BarChart';
import GroupedBarChart from './Components/GroupedBarChart';
import StackedBarChart from './Components/StackedBarChart';
import NormalizedStackedBarChart from './Components/NormalizedStackedBarChart';

import netflix_data from '../data/Netflix_cleaned.csv';

//DATA
import netflix_title from './Components/data/netflix_title.png';
import netflix_content_added_over_years from './Components/data/netflix_content_added_over_years.png';
import netflix_country_target from './Components/data/netflix_country_target.png';

import netflix_content_info from "./Components/data/netflix_content_info.csv";
import netflix_year_info from "./Components/data/netflix_year_info.csv";
import netflix_ratings_info from "./Components/data/netflix_ratings_info.csv";
import netflix_countries_info from "./Components/data/netflix_countries_info.csv";
import netflix_grouped_countries_info from "./Components/data/netflix_countries_grouped_info.csv";
import netflix_countries_genre_info from "./Components/data/netflix_countries_genre_info.csv";
import netflix_categories_data from "./Components/data/netflix_sunburst_data";

import netflix_text_all from "./Components/data/text_title.txt";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            netflix_data: null,
            type: null,
            target: null,

            title: "",
            text: "",

            openStatsInfo: false,
            openCategInfo: false,
            openRatingInfo: false,
            openReleaseInfo: false,
            openCountInfo: false,
            openContentInfo: false,
            openCumContentInfo: false,
            openContentCountryInfo: false,
            openTargetCountryInfo: false,
            openWCTitleInfo: false,
            openWCDescInfo: false,

            netflix_content_info: false,
            netflix_year_info: false,
            netflix_ratings_info: false,
            netflix_countries_info: false,
            netflix_countries_genre_info: false,
            netflix_grouped_countries_info: false,
            netflix_text_all_txt: fetch(netflix_text_all).then(r => r.text()).then(text => { this.state.netflix_text_all_txt = text }),
            max_words: 100,
            netflix_sunburst_data: netflix_categories_data
        };

        this.handleOpenStatsInfo = this.handleOpenStatsInfo.bind(this);
        this.handleCloseStatsInfo = this.handleCloseStatsInfo.bind(this);

        this.handleOpenCategInfo = this.handleOpenCategInfo.bind(this);
        this.handleCloseCategInfo = this.handleCloseCategInfo.bind(this);

        this.handleOpenRatingInfo = this.handleOpenRatingInfo.bind(this);
        this.handleCloseRatingInfo = this.handleCloseRatingInfo.bind(this);

        this.handleOpenReleaseInfo = this.handleOpenReleaseInfo.bind(this);
        this.handleCloseReleaseInfo = this.handleCloseReleaseInfo.bind(this);

        this.handleOpenCountInfo = this.handleOpenCountInfo.bind(this);
        this.handleCloseCountInfo = this.handleCloseCountInfo.bind(this);

        this.handleOpenContentInfo = this.handleOpenContentInfo.bind(this);
        this.handleCloseContentInfo = this.handleCloseContentInfo.bind(this);

        this.handleOpenCumContentInfo = this.handleOpenCumContentInfo.bind(this);
        this.handleCloseCumContentInfo = this.handleCloseCumContentInfo.bind(this);

        this.handleOpenContentCountryInfo = this.handleOpenContentCountryInfo.bind(this);
        this.handleCloseContentCountryInfo = this.handleCloseContentCountryInfo.bind(this);

        this.handleOpenTargetCountryInfo = this.handleOpenTargetCountryInfo.bind(this);
        this.handleCloseTargetCountryInfo = this.handleCloseTargetCountryInfo.bind(this);

        this.handleOpenWCTitleInfo = this.handleOpenWCTitleInfo.bind(this);
        this.handleCloseWCTitleInfo = this.handleCloseWCTitleInfo.bind(this);

        this.handleOpenWCDescInfo = this.handleOpenWCDescInfo.bind(this);
        this.handleCloseWCDescInfo = this.handleCloseWCDescInfo.bind(this);

    }

    loadCSV = async () => {
        const d = await csv(netflix_data, function (d) {
            return {
                type: d.type,
                title: d.title,
                director: d.director,
                cast: d.cast ? (d.cast).replace(/\[|\]|'/g, '').split(', ') : [],
                country: d.country,
                release: d.date_added,
                release_year: d.release_year,
                month_added: d.month_added,
                month_name_added: d.month_name_added,
                year_added: d.year_added,
                rating: d.rating,
                duration: d.duration,
                description: d.description,
                listed_in: d.listed_in ? (d.listed_in).replace(/\[|\]|'/g, '').split(', ') : []
            };
        })

        this.setState({ netflix_data: d });
    }

    loadCSV2 = async () => {
        const d = await fetch(netflix_content_info).then(r => r.text())
        this.setState({ netflix_content_info: d });
    }

    loadCSV3 = async () => {
        const d = await csv(netflix_year_info, function (d) {
            return {
                letter: d.year,
                frequency: parseInt(d.count)
            };
        })
        this.setState({ netflix_year_info: d });
    }

    loadCSV4 = async () => {
        const d = await csv(netflix_ratings_info, function (d) {
            return {
                letter: d.rating,
                frequency: parseInt(d.count)
            };
        })
        this.setState({ netflix_ratings_info: d });
    }

    loadCSV5 = async () => {
        const d = await csv(netflix_countries_info, function (d) {
            return {
                letter: d.country,
                frequency: parseInt(d.count)
            };
        })
        this.setState({ netflix_countries_info: d });
    }

    loadCSV6 = async () => {
        const d = await fetch(netflix_countries_genre_info).then(r => r.text())
        this.setState({ netflix_countries_genre_info: d });
    }

    loadCSV7 = async () => {
        const d = await fetch(netflix_grouped_countries_info).then(r => r.text())
        this.setState({ netflix_grouped_countries_info: d });
    }

    handleOpenStatsInfo() {
        this.setState({
            openStatsInfo: true,
            title: "Netflix Dataset Information",
            text: "Netflix is one of the most popular media and video streaming platforms, with over 8000 movies or tv shows available. \
                This dataset consists of listings of all media available on Netflix, along with details such as ratings, release year, duration, country, etc.\
                Total records is the total number of Movies/TV Shows contents. \
                This chart shows what percentage of Netflix movies and TV shows are in the dataset.\
                There are 6126 Movies and 2664 TV Shows.\
                "
        });
    }

    handleCloseStatsInfo() {
        this.setState({ openStatsInfo: false });
    }

    handleOpenCategInfo() {
        this.setState({
            openCategInfo: true,
            title: "Netflix Contents Hierarchy",
            text: "This chart allows you to select a TV Show / Movie based on the type of content, category and rating.\
                Targets and categories with few records have been merged in \"Other\" label.\
                With this graph it is possible to have an idea on the hierarchy of the media available on the Netflix platform."
        });
    }

    handleCloseCategInfo() {
        this.setState({ openCategInfo: false });
    }

    handleOpenRatingInfo() {
        this.setState({
            openRatingInfo: true,
            title: "Netflix Ratings",
            text: "This chart shows the amount of TV Shows / Movies divided by their rating (sorted by total number of released contents per rating)."
        });
    }

    handleCloseRatingInfo() {
        this.setState({ openRatingInfo: false });
    }

    handleOpenReleaseInfo() {
        this.setState({
            openReleaseInfo: true,
            title: "Netflix Contents Release over years",
            text: "This chart shows the amount of TV Shows / Movies released every years since Netflix start publishing contents (years sorted by total number of released contents). "
        });
    }

    handleCloseReleaseInfo() {
        this.setState({ openReleaseInfo: false });
    }

    handleOpenCountInfo() {
        this.setState({
            openCountInfo: true,
            title: "Netflix Contents produced in countries",
            text: "This chart shows the countries with the highest number of TV Shows / Movies produced.\
            The most prolific producers of content for Netflix are, primarily, the USA, with India and the UK a significant distance behind."
        });
    }

    handleCloseCountInfo() {
        this.setState({ openCountInfo: false });
    }

    handleOpenContentInfo() {
        this.setState({
            openContentInfo: true,
            title: "Netflix TV Show/ Movies Release over years",
            text: "This chart shows the amount of TV Shows and Movies release over years. \
            This allows to better understands how Netflix is growing over the years, in fact can be seen that they published more and more contents over the years.\
            There's a negative trend during the COVID pandemy.\
            In 2021 there is a change: Netflix starts for the first time publishing more TV Shows than Movies."
        });
    }

    handleCloseContentInfo() {
        this.setState({ openContentInfo: false });
    }

    handleOpenCumContentInfo() {
        this.setState({
            openStatsInfo: true,
            title: "Netflix TV Show/ Movies Release over years (cumulative)",
            text: "This shows the cumulative amount of TV Shows and Movies release over years."
        });
    }

    handleCloseCumContentInfo() {
        this.setState({ openCumContentInfo: false });
    }

    handleOpenContentCountryInfo() {
        this.setState({
            openContentCountryInfo: true,
            title: "Netflix TV Show / Movies split produced in top 8 countries",
            text: "This chart shows the amount of TV Shows / Movies splitted in the top countries (sum of Movies and TV Shows bigger or equal than 150 per country). This plot is interesting because we can check how the split TV Show/Movie varies by country."
        });
    }

    handleCloseContentCountryInfo() {
        this.setState({ openContentCountryInfo: false });
    }

    handleOpenTargetCountryInfo() {
        this.setState({
            openTargetCountryInfo: true,
            title: "Netflix correlation between Country and Target",
            text: "This graph shows the difference of contents in relation to countries. It's interesting to note similarities between USA and UK, or Spain and Mexico (based on target), but at the same time we can have a look to the differencies between countries with different cultures (USA/UK and India )."
        });
    }

    handleCloseTargetCountryInfo() {
        this.setState({ openTargetCountryInfo: false });
    }

    handleOpenWCTitleInfo() {
        this.setState({
            openWCTitleInfo: true,
            title: "Netflix Wordcloud with contents Title",
            text: "This wordcloud shows the main key words used in Netflix TV Shows and Movies titles."
        });
    }

    handleCloseWCTitleInfo() {
        this.setState({ openWCTitleInfo: false });
    }

    handleOpenWCDescInfo() {
        this.setState({
            openWCDescInfo: true,
            title: "Netflix Target Wordcloud",
            text: "This wordcloud is interesting because shows the main key words used in Netflix TV Shows and Movies titles, but giving the opportunity to understand the difference between targets.\
                By moving the Max Words cursor, we can set the maximum amount of words inside the Wordcloud."
        });
    }

    handleCloseWCDescInfo() {
        this.setState({ openWCDescInfo: false });
    }

    componentDidMount() {
        this.loadCSV();
        this.loadCSV2();
        this.loadCSV3();
        this.loadCSV4();
        this.loadCSV5();
        this.loadCSV6();
        this.loadCSV7();
    }

    render() {
        return (

            <body>
                <Container display='flex' maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh' }}>
                    <ScrollTop />
                    <Grid container spacing={5} flexDirection='row'>
                        {/* Dataset Info */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenStatsInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openStatsInfo} handleClose={this.handleCloseStatsInfo} />
                                    <Typography variant="h5"> Netflix Dataset Information </Typography>
                                </Stack>
                                <DatasetInfo data={this.state.netflix_data} type={this.state.type} />
                                <Typography variant="body1"> Movies: 6126 available</Typography>
                                <Typography variant="body1"> Tv Shows: 2664 available</Typography>
                                <svg id="legend" height={40} width={450} />
                                <StackedBarChart data={this.state.netflix_content_info} />
                            </Paper>
                        </Grid>
                        {/* SunburstZoomableChart: Dataset Info */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenCategInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openCategInfo} handleClose={this.handleCloseCategInfo} />
                                    <Typography variant="h5"> Netflix Movies/TV Shows </Typography>
                                </Stack>
                                <SunburstZoomableChart data={this.state.netflix_sunburst_data} size={700} />
                            </Paper>
                        </Grid>
                        {/* Area Chart: content added over years */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenContentInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openContentInfo} handleClose={this.handleCloseContentInfo} />
                                    <Typography variant="h5"> Netflix Contents added over years  </Typography>
                                </Stack>
                                <Image src={netflix_content_added_over_years} />
                            </Paper>
                        </Grid>
                        {/* BarChart: Countries */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenCountInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openCountInfo} handleClose={this.handleCloseCountInfo} />
                                    <Typography variant="h5"> Netflix Countries Production </Typography>
                                </Stack>
                                <GroupedBarChart data={this.state.netflix_grouped_countries_info} size={500}/>
                            </Paper>
                        </Grid>
                        {/* NormalizedStackedBarChart: Dataset Info */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenContentCountryInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openContentCountryInfo} handleClose={this.handleCloseContentCountryInfo} />
                                    <Typography variant="h5"> Netflix Contents by Countries</Typography>
                                </Stack>
                                <svg id="legend2" height={40} width={450} />
                                <NormalizedStackedBarChart data={this.state.netflix_countries_genre_info} />
                            </Paper>
                        </Grid>
                        {/* BarChart: Ratings */}
                        <Grid item xs={12} md={5} lg={5}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenRatingInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openRatingInfo} handleClose={this.handleCloseRatingInfo} />
                                    <Typography variant="h5"> Netflix Target </Typography>
                                </Stack>
                                <BarChart data={this.state.netflix_ratings_info} size={500} color={'#e50914'} legend={true} />
                            </Paper>
                        </Grid>
                        {/* Graph: target per country */}
                        <Grid item xs={12} md={7} lg={7}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenTargetCountryInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openTargetCountryInfo} handleClose={this.handleCloseTargetCountryInfo} />
                                    <Typography variant="h5"> Netflix Target and Countries  </Typography>
                                </Stack>
                                <Image src={netflix_country_target} height="333px" />
                            </Paper>
                        </Grid>
                        {/* Wordcloud: for title + mask */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenWCTitleInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openWCTitleInfo} handleClose={this.handleCloseWCTitleInfo} />
                                    <Typography variant="h5">Netflix Wordcloud</Typography>
                                </Stack>
                                <Image src={netflix_title} height="500px" />
                            </Paper>
                        </Grid>
                        {/* Wordcloud: for descriptions*/}
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenWCDescInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openWCDescInfo} handleClose={this.handleCloseWCDescInfo} />
                                    <Typography variant="h5">Netflix Target Wordcloud</Typography>
                                </Stack>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs={4} spacing={2}>
                                            <FormControl color='background' sx={{ m: 1, width: { xs: 80, sm: 150, md: 200 } }}>
                                                <InputLabel> Target </InputLabel>
                                                <Select
                                                    id='select-target'
                                                    label='target'
                                                    value={this.state.target ? this.state.target : 0}
                                                    onChange={(event) => {
                                                        this.setState({ target: event.target.value })
                                                    }}
                                                >
                                                    <MenuItem value={0}> All </MenuItem>
                                                    <MenuItem value={1}> Kids </MenuItem>
                                                    <MenuItem value={2}> Teens </MenuItem>
                                                    <MenuItem value={3}> Adults </MenuItem>  
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sx={{ paddingTop: 3, marginRight: 2 }}>
                                            <Typography variant="h7"> Max Words: </Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ paddingTop: 3 }}>
                                            <Slider defaultValue={this.state.max_words} aria-label="Default" valueLabelDisplay="auto" step={10} min={50} max={250} onChange={(event) => { this.setState({ max_words: event.target.value }) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>                                
                                <WordcloudChart data={this.state.netflix_text_all_txt} max_words={this.state.max_words} target={this.state.target}/>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </body>
        );
    }
}

export default Dashboard;