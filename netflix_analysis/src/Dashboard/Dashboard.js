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
            netflix_text_title_txt: fetch(netflix_text_title).then(r => r.text()).then(text => { this.state.netflix_text_title_txt = text }),
            netflix_text_description_txt: fetch(netflix_text_description).then(r => r.text()).then(text => { this.state.netflix_text_description_txt = text }),
            netflix_text_genre_txt: fetch(netflix_text_genre).then(r => r.text()).then(text => { this.state.netflix_text_genre_txt = text }),
            max_words: 150,
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

    handleOpenStatsInfo() {
        this.setState({ 
            openStatsInfo: true,  
            title: "Netflix Dataset Information",
            text: "Total records is the total number of movies/TV Shows contents.\n This horizontal bar chart was created using the d3js library and shows what percentage of Netflix movies and TV shows are in the dataset."
        });
    }

    handleCloseStatsInfo() {
        this.setState({openStatsInfo: false});
    }

    handleOpenCategInfo() {
        this.setState({ 
            openCategInfo: true,  
            title: "Netflix Movies/TV Shows categories",
            text: "This sunburst zoomable chart was created using the d3js library and allows you to select a TV Show / Movie based on the type of content, category and rating."
        });
    }

    handleCloseCategInfo() {
        this.setState({openCategInfo: false});
    }

    handleOpenRatingInfo() {
        this.setState({ openRatingInfo: true ,  
            title: "Netflix Ratings Bar Chart",
            text: "This bar chart was created using the d3js library and it shows the amount of contents divided by their rating."
        });
    }

    handleCloseRatingInfo() {
        this.setState({ openRatingInfo: false });
    }

    handleOpenReleaseInfo() {
        this.setState({ openReleaseInfo: true ,  
            title: "Netflix Contents Release over years Bar Chart",
            text: "This bar chart was created using the d3js library and it shows the amount of contents divided by their years release."
        });
    }

    handleCloseReleaseInfo() {
        this.setState({ openReleaseInfo: false });
    }

    handleOpenCountInfo() {
        this.setState({ openCountInfo: true ,  
            title: "Netflix Contents produced in countries Bar Chart",
            text: "This bar chart was created using the d3js library and it shows the amount of contents produced in the top countries (ones that produced more contents)."
        });
    }

    handleCloseCountInfo() {
        this.setState({ openCountInfo: false });
    }

    handleOpenContentInfo() {
        this.setState({ openContentInfo: true ,  
            title: "Netflix TV Show/ Movies Release over years",
            text: ""
        });
    }

    handleCloseContentInfo() {
        this.setState({ openContentInfo: false });
    }

    handleOpenCumContentInfo() {
        this.setState({ openStatsInfo: true ,  
            title: "Netflix TV Show/ Movies Release over years (cumulative)",
            text: ""
        });
    }

    handleCloseCumContentInfo() {
        this.setState({ openCumContentInfo: false });
    }

    handleOpenContentCountryInfo() {
        this.setState({ openContentCountryInfo: true ,  
            title: "Netflix TV Show / Movies produced in top 5 countries",
            text: ""
        });
    }

    handleCloseContentCountryInfo() {
        this.setState({ openContentCountryInfo: false });
    }

    handleOpenTargetCountryInfo() {
        this.setState({ openTargetCountryInfo: true ,  
            title: "Netflix correlation between Country and Target",
            text: ""
        });
    }

    handleCloseTargetCountryInfo() {
        this.setState({ openTargetCountryInfo: false });
    }

    handleOpenWCTitleInfo() {
        this.setState({ openWCTitleInfo: true ,  
            title: "Netflix Wordcloud with contents Title",
            text: ""
        });
    }

    handleCloseWCTitleInfo() {
        this.setState({ openWCTitleInfo: false });
    }

    handleOpenWCDescInfo() {
        this.setState({ openWCDescInfo: true ,  
            title: "Netflix Wordcloud with contents Descriptions",
            text: ""
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
                                    <DatasetInfoDialog title={this.state.title} text= {this.state.text} open={this.state.openStatsInfo} handleClose={this.handleCloseStatsInfo} />
                                    <Typography variant="h5"> Netflix Dataset Information </Typography>
                                </Stack>
                                <DatasetInfo data={this.state.netflix_data} type={this.state.type} category={this.state.category} />
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
                                <SunburstZoomableChart data={this.state.netflix_sunburst_data} size={600} />
                            </Paper>
                        </Grid>
                        {/* BarChart: Ratings */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenRatingInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openRatingInfo} handleClose={this.handleCloseRatingInfo} />
                                    <Typography variant="h5"> Netflix Ratings </Typography>
                                </Stack>
                                <BarChart data={this.state.netflix_ratings_info} size={500} color={'#e50914'} legend={true}/>
                            </Paper>
                        </Grid>
                        {/* BarChart: Release years */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenReleaseInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openReleaseInfo} handleClose={this.handleCloseReleaseInfo} />
                                    <Typography variant="h5"> Netflix Contents Release </Typography>
                                </Stack>
                                <BarChart data={this.state.netflix_year_info} size={500} color={'#b20710'} legend={false}/>
                            </Paper>
                        </Grid>
                        {/* BarChart: Countries */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenCountInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openCountInfo} handleClose={this.handleCloseCountInfo} />
                                    <Typography variant="h5"> Netflix coutries production </Typography>
                                </Stack>
                                <BarChart data={this.state.netflix_countries_info} size={500} color={'#e50914'} legend={false}/>
                            </Paper>
                        </Grid>
                        {/* Graph: content added over years */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenContentInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openContentInfo} handleClose={this.handleCloseContentInfo} />
                                    <Typography variant="h5"> Netflix: contents added over years  </Typography>
                                </Stack>
                                <Image src={netflix_content_added_over_years} />
                            </Paper>
                        </Grid>
                        {/* Graph: content added over years (cumulative) */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenCumContentInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openCumContentInfo} handleClose={this.handleCloseCumContentInfo} />
                                    <Typography variant="h5"> Netflix: contents added over years [Cumulative]  </Typography>
                                </Stack>
                                <Image src={netflix_content_added_over_years_cumulative} />
                            </Paper>
                        </Grid>
                        {/* NormalizedStackedBarChart: Dataset Info */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenContentCountryInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openContentCountryInfo} handleClose={this.handleCloseContentCountryInfo} />
                                    <Typography variant="h5"> Netflix: Coutries divided by TVs and Movies </Typography>
                                </Stack>
                                <svg id="legend2" height={40} width={450} />
                                <NormalizedStackedBarChart data={this.state.netflix_countries_genre_info} />
                            </Paper>
                        </Grid>
                        {/* Graph: target per country */}
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenTargetCountryInfo}>
                                        <InfoIcon sx={{ color: 'primary', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog title={this.state.title} text={this.state.text} open={this.state.openTargetCountryInfo} handleClose={this.handleCloseTargetCountryInfo} />
                                    <Typography variant="h5"> Netflix: target per country  </Typography>
                                </Stack>
                                <Image src={netflix_country_target} />
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
                                    <Typography variant="h5"> Netflix: Wordcloud for Titles  </Typography>
                                </Stack>
                                <Image src={netflix_title} />
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
                                    <Typography variant="h5"> Netflix: Wordcloud for Descriptions  </Typography>
                                </Stack>
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