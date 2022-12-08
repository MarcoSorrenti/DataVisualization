import React from 'react';
import { csv } from 'd3-fetch';

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
import StackedBarChart from './Components/StackedBarChart';
import NormalizedStackedBarChart from './Components/NormalizedStackedBarChart';

import netflix_data from '../data/Netflix_cleaned.csv';

//DATA
import netflix_title from './Components/data/netflix_title.png';
import netflix_content_added_over_years from './Components/data/netflix_content_added_over_years.png';
import netflix_content_added_over_years_cumulative from './Components/data/netflix_content_added_over_years_cumulative.png';
import netflix_country_target from './Components/data/netflix_country_target.png';

import netflix_content_info from "./Components/data/netflix_content_info.csv";
import netflix_year_info from "./Components/data/netflix_year_info.csv";
import netflix_ratings_info from "./Components/data/netflix_ratings_info.csv";
import netflix_countries_info from "./Components/data/netflix_countries_info.csv";
import netflix_countries_genre_info from "./Components/data/netflix_countries_genre_info.csv";
import netflix_text_title from "./Components/data/text_title.txt";
import netflix_text_description from "./Components/data/text_description.txt";
import netflix_text_genre from "./Components/data/text_genre.txt";
import netflix_categories_data from "./Components/data/netflix_sunburst_data";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            netflix_data: null,
            type: null,
            category: null,
            openStatsInfo: false,
            netflix_content_info: false,
            netflix_year_info: false,
            netflix_ratings_info: false,
            netflix_countries_info: false,
            netflix_countries_genre_info: false,
            netflix_text_title_txt: fetch(netflix_text_title).then(r => r.text()).then(text => { this.state.netflix_text_title_txt = text }),
            netflix_text_description_txt: fetch(netflix_text_description).then(r => r.text()).then(text => { this.state.netflix_text_description_txt = text }),
            netflix_text_genre_txt: fetch(netflix_text_genre).then(r => r.text()).then(text => { this.state.netflix_text_genre_txt = text }),
            max_words: 150,
            netflix_sunburst_data: netflix_categories_data
        };

        this.handleOpenStatsInfo = this.handleOpenStatsInfo.bind(this);
        this.handleCloseStatsInfo = this.handleCloseStatsInfo.bind(this);
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

    handleOpenStatsInfo() {
        this.setState({ openStatsInfo: true });
    }

    handleCloseStatsInfo() {
        this.setState({ openStatsInfo: false });
    }

    componentDidMount() {
        this.loadCSV();
        this.loadCSV2();
        this.loadCSV3();
        this.loadCSV4();
        this.loadCSV5();
        this.loadCSV6();
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
                                    <DatasetInfoDialog open={this.state.openStatsInfo} handleClose={this.handleCloseStatsInfo} />
                                    <Typography variant="h5"> Netflix Contents Information </Typography>
                                </Stack>
                                <DatasetInfo data={this.state.netflix_data} type={this.state.type} category={this.state.category} />
                                <svg id="legend" height={40} width={450} />
                                <StackedBarChart data={this.state.netflix_content_info} />
                            </Paper>
                        </Grid>
                        {/* SunburstZoomableChart: Dataset Info */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Categories </Typography>
                                <SunburstZoomableChart data={this.state.netflix_sunburst_data} size={600} />
                            </Paper>
                        </Grid>
                        {/* BarChart: Ratings */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Ratings </Typography>
                                <BarChart data={this.state.netflix_ratings_info} size={500} color={'#221f1f'}/>
                            </Paper>
                        </Grid>
                        {/* BarChart: Release years */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Release Year </Typography>
                                <BarChart data={this.state.netflix_year_info} size={500} color={'#b20710'}/>
                            </Paper>
                        </Grid>
                        {/* BarChart: Countries */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Countries </Typography>
                                <BarChart data={this.state.netflix_countries_info} size={500} color={'#e50914'}/>
                            </Paper>
                        </Grid>
                        {/* Graph: content added over years */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: contents added over years  </Typography>
                                <Image src={netflix_content_added_over_years} />
                            </Paper>
                        </Grid>
                        {/* Graph: content added over years (cumulative) */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: contents added over years [Cumulative]  </Typography>
                                <Image src={netflix_content_added_over_years_cumulative} />
                            </Paper>
                        </Grid>
                        {/* NormalizedStackedBarChart: Dataset Info */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Coutries divided by TVs and Movies </Typography>
                                <svg id="legend2" height={40} width={450} />
                                <NormalizedStackedBarChart data={this.state.netflix_countries_genre_info} />
                            </Paper>
                        </Grid>
                        {/* Graph: target per country */}
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: target per country  </Typography>
                                <Image src={netflix_country_target} />
                            </Paper>
                        </Grid>
                        {/* Wordcloud: for title + mask */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Wordcloud for Titles  </Typography>
                                <Image src={netflix_title} />
                            </Paper>
                        </Grid>
                        {/* Wordcloud: for descriptions*/}
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5"> Netflix: Wordcloud for Descriptions  </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs={2} spacing={2}>
                                            <Typography variant="h7"> Max Words: </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Slider defaultValue={this.state.max_words} aria-label="Default" valueLabelDisplay="auto" step={10} min={50} max={300} onChange={(event) => { this.setState({ max_words: event.target.value }) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <WordcloudChart data={this.state.netflix_text_description_txt} max_words={this.state.max_words} />
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </body>
        );
    }
}

export default Dashboard;