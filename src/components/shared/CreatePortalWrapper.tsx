'use client'

import {createPortal} from 'react-dom';
import {useEffect, useState} from 'react';

const CreatePortalWrapper = ({children, id = 'slide-panel-info'}: any) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || typeof document === 'undefined') {
        return <>{children}</>;
    }

    const targetElement = document.getElementById(id);
    
    if (!targetElement) {
        return <>{children}</>;
    }

    return <>
        {
            createPortal(
                <>{children}</>,
                targetElement
            )
        }
    </>
};

export default CreatePortalWrapper;
