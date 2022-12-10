import React from "react";

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import IconUp from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollTop = () => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const scrollToTop = React.useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: "fixed",
                    bottom: 48,
                    right: 32,
                    zIndex: 1,
                }}
            >
                <Fab
                    onClick={scrollToTop}
                    color="primary"
                    size="small"
                    aria-label="scroll back to top"
                >
                    <IconUp />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop;