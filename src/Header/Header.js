import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

class Header extends React.Component {

    render() {
        return (
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar color='primary' position="static">
                        <Toolbar>

                            <BubbleChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Netflix Analysis
                            </Typography>

                            <Button target="_blank" href="https://github.com/MarcoSorrenti/DataVisualization" color="inherit" startIcon={<GitHubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}>Source Code </Button>
                            <Button target="_blank" href="https://www.linkedin.com/in/marco-sorrenti/" color="inherit" startIcon={<InfoIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}>About Me </Button>

                        </Toolbar>
                    </AppBar>
                </Box>
            </header>
        );
    }
}

export default Header;
