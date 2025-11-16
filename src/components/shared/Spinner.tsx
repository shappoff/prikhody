import React from "react";
import CircularProgress from './CircularProgress';
import Box from './Box';

const Spinner = () => <Box sx={{ position: 'absolute', top: '50%', right: '50%', zIndex: 1000 }}>
    <CircularProgress />
</Box>

export default Spinner;
