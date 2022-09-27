import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import GAEvent from '../GAEvent';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copyright: 'Copyright \u00A92022 All rights reserved.'
        };
    }

    render() {
        return (
            <footer>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexGrows: 1,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    px: 2, py: 0, bottom: 0, position: 'relative'
                }}>
                    <Box>
                        <Typography variant='caption'>{this.state.copyright}</Typography>
                    </Box>
                    <Stack direction='row'>
                        <Link onClick={GAEvent('Footer', 'Linkedin', '')}
                            href='https://www.linkedin.com/in/marco-sorrenti/' target='_blank' >
                            <LinkedInIcon sx={{ color: 'primary.contrastText', m: 0.5, fontSize: 30 }} />
                        </Link>
                        <Link onClick={GAEvent('Footer', 'Github', '')}
                            href='https://github.com/MarcoSorrenti/' target='_blank'>
                            <GitHubIcon sx={{ color: 'primary.contrastText', m: 0.5, fontSize: 30 }} />
                        </Link>
                    </Stack>
                </Box>
            </footer>
        );
    }
}

export default Footer;