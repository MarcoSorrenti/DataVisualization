import React from 'react';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ScrollTop from './Components/ScrollTop';
import StepperBox from './Components/StepperBox';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <body>
                <Container display='flex' maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh' }}>

                    <ScrollTop />
                    <Grid container spacing={5} flexDirection='row'>

                        {/* Stepper */}
                        <Grid item xs={12}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <StepperBox />
                            </Paper>
                        </Grid>

                        {/* altro */}
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                prova 1
                            </Paper>
                        </Grid>

                        {/* altro */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                prova 2
                            </Paper>
                        </Grid>

                        {/* altro */}
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                prova 3
                            </Paper>
                        </Grid>

                        {/* altro */}
                        <Grid item xs={12} md={12} lg={12} sx={{ mb: 0, pb: 0 }}>
                            <Paper sx={{
                                p: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                prova 4
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </body>
        );
    }
}

export default Dashboard;