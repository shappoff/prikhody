import React from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  className?: string;
  id?: string;
  sx?: React.CSSProperties;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StyledIconButton = styled.button<{ size: string; customStyles?: React.CSSProperties }>`
  text-align: center;
  flex: 0 0 auto;
  font-size: 1.5rem;
  padding: ${props => 
    props.size === 'small' ? '5px' : 
    props.size === 'large' ? '12px' : 
    '8px'};
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.54);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  background-color: transparent;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    cursor: default;
    pointer-events: none;
  }
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  className,
  id,
  sx,
  disabled = false,
  size = 'medium',
  ...props
}) => {
  return (
    <StyledIconButton
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      id={id}
      customStyles={sx}
      disabled={disabled}
      size={size}
      {...props}
    >
      {children}
    </StyledIconButton>
  );
};

export default IconButton;

