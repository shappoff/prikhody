import React from "react";
import Button from './Button';
import { HomeIcon } from './icons';
import Tooltip from './Tooltip';

const HomeButton = ({absolute, variant}: any) => {
    return <Tooltip title="На главную страницу">
        <Button
            variant={variant ? 'contained' : 'outlined'}
            size="small"
            href="/"
            sx={absolute ? {position: 'absolute', top: 0, left: 0, zIndex: 999} : {}}>
            <HomeIcon fontSize="small" />
        </Button>
    </Tooltip>
}

export default React.memo(HomeButton);
