import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledCircularProgress = styled.div<{ size?: number }>`
  display: inline-block;
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  
  &::after {
    content: '';
    display: block;
    width: ${props => (props.size || 40) * 0.8}px;
    height: ${props => (props.size || 40) * 0.8}px;
    margin: ${props => (props.size || 40) * 0.1}px;
    border-radius: 50%;
    border: ${props => (props.size || 40) * 0.08}px solid;
    border-color: #1976d2 transparent #1976d2 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

interface CircularProgressProps {
  size?: number;
  className?: string;
  sx?: React.CSSProperties;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  size = 40,
  className,
  sx
}) => {
  return (
    <StyledCircularProgress 
      size={size}
      className={className}
      style={sx}
    />
  );
};

export default CircularProgress;

