import React from 'react';
import styled from 'styled-components';

interface PaperProps {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  className?: string;
  elevation?: number;
}

const StyledPaper = styled.div<{ elevation: number; customStyles?: React.CSSProperties }>`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: ${props => {
    if (props.elevation === 0) return 'none';
    if (props.elevation === 1) return '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';
    if (props.elevation === 2) return '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
    if (props.elevation === 3) return '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)';
    if (props.elevation === 4) return '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)';
    return '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)';
  }};

  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const Paper: React.FC<PaperProps> = ({ 
  children, 
  sx,
  className,
  elevation = 1
}) => {
  return (
    <StyledPaper 
      elevation={elevation}
      customStyles={sx}
      className={className}
    >
      {children}
    </StyledPaper>
  );
};

export default Paper;

