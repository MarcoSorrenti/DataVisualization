import React from 'react';
import { csv } from 'd3-fetch';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ScrollTop from './Components/ScrollTop';
import DatasetInfo from './Components/DatasetInfo';
import DatasetInfoDialog from './Components/DatasetInfoDialog';

import WordcloudChart from './Components/WordcloudChart';
import SunburstZoomableChart from './Components/SunburstZoomableChart';
import BarChart from './Components/BarChart';

import netflix_data from '../data/Netflix_cleaned.csv';

// TEST IMPORT
import json from "./Components/data";
import alpha_data from "./Components/alphabet.csv";
import country from "./Components/country.csv"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            netflix_data: null,
            type: null,
            category: null,
            openStatsInfo: false,
            test_data: json,
            alpha_data: null,
            country_data: country,
            test: [{"date":0,"value":71.70963114293787},{"date":1,"value":16.691956253386998},{"date":2,"value":68.5889267709376},{"date":3,"value":95.00376536027895},{"date":4,"value":69.58008923174164}]
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
        const d = await csv(alpha_data, function (d) {
            return {
                letter: d.letter,
                frequency: d.frequency
            };
        })

        this.setState({ alpha_data: d });
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
    }

    render() {
        return (

            <body>
                <Container display='flex' maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh' }}>

                    <ScrollTop />
                    <Grid container spacing={5} flexDirection='row'>

                        {/* Selection of the dataset */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs direction="column" spacing={2}>
                                            <FormControl>
                                                <FormLabel id="dataset-selection-form">Select Dataset</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="dataset-selection-form"
                                                    name="dataset-selection-group"
                                                    value={this.state.type ? this.state.type : null}
                                                    onChange={(event) => {
                                                        this.setState({ type: event.target.value, category: null });
                                                    }}
                                                >
                                                    <FormControlLabel value={null} control={<Radio />} label="All Netflix contents " />
                                                    <FormControlLabel value={'TV Show'} control={<Radio />} label="TV Shows" />
                                                    <FormControlLabel value={'Movie'} control={<Radio />} label="Movies" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl color='background' sx={{ m: 1, width: { xs: 80, sm: 150, md: 200 } }}>
                                                <InputLabel> Category </InputLabel>
                                                <Select
                                                    id='select-category'
                                                    label='Category'
                                                    value={this.state.category ? this.state.category : null}
                                                    onChange={(event) => {
                                                        this.setState({ category: event.target.value })
                                                    }}
                                                >
                                                    <MenuItem value={null}> All </MenuItem>
                                                    {this.state.netflix_data ? this.state.netflix_data.filter(d => this.state.type ? d.type === this.state.type : true)
                                                        .map(d => d.listed_in).flat()
                                                        .filter((value, index, self) => self.indexOf(value) === index).sort()
                                                        .map(filteredData => (
                                                            <MenuItem value={filteredData}>
                                                                {filteredData}
                                                            </MenuItem>
                                                        )) : null}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Dataset Info */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <Stack direction="row" justifyContent="center-end" alignItems='center' spacing={1}>
                                    <IconButton aria-label="info-stat" aria-controls="info-data" aria-haspopup="true" size='large' onClick={this.handleOpenStatsInfo}>
                                        <InfoIcon sx={{ color: 'background.contrastText', fontSize: 15 }} />
                                    </IconButton>
                                    <DatasetInfoDialog open={this.state.openStatsInfo} handleClose={this.handleCloseStatsInfo} />
                                    <Typography variant="h5"> Dataset Information </Typography>
                                </Stack>
                                <DatasetInfo data={this.state.netflix_data} type={this.state.type} category={this.state.category} />
                                {/* <SunburstZoomableChart data={this.state.test_data} size={600}/> */}
                            </Paper>
                        </Grid>


                        {/*  
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <DonutChart data={this.state.test}/>
                            </Paper>
                        </Grid>
                    
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <Typography variant="h5"> Test </Typography>
                                <Pie data={this.state.test} width={200} height={200} innerRadius={60} outerRadius={100}/>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                prova 1
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                prova 2
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                prova 3
                            </Paper>
                        </Grid>
                        */}                                    
                    {/* <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <SunburstChart data={this.state.test_data} size={500}/>                                
                            </Paper>
                        </Grid>*/}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <SunburstZoomableChart data={this.state.test_data} size={600}/>                                
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <BarChart data={this.state.alpha_data} size={500}/>                                
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <WordcloudChart data={this.state.alpha_data} size={500}/>                                
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </body>
        );
    }
}

export default Dashboard;