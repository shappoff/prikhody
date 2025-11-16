'use client'

import React from 'react';
import styled from 'styled-components';
import { useTabContext } from './TabContext';

interface TabPanelProps {
  children?: React.ReactNode;
  value: string | number;
  className?: string;
  sx?: React.CSSProperties;
}

const StyledTabPanel = styled.div<{ hidden: boolean; customStyles?: React.CSSProperties }>`
  display: ${props => props.hidden ? 'none' : 'block'};
  padding: 16px;
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  className,
  sx
}) => {
  const context = useTabContext();
  const hidden = context.value !== value;

  return (
    <StyledTabPanel
      hidden={hidden}
      customStyles={sx}
      className={className}
      role="tabpanel"
      aria-hidden={hidden}
    >
      {!hidden && children}
    </StyledTabPanel>
  );
};

export default TabPanel;

