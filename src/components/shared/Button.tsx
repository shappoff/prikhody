import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  sx?: React.CSSProperties;
  className?: string;
  id?: string;
}

const StyledButton = styled.button<{ variant: string; size: string; customStyles?: React.CSSProperties }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 4px;
  padding: ${props => 
    props.size === 'small' ? '6px 16px' : 
    props.size === 'large' ? '11px 22px' : 
    '8px 22px'};
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: ${props => 
    props.size === 'small' ? '0.8125rem' : 
    props.size === 'large' ? '0.9375rem' : 
    '0.875rem'};
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  ${props => {
    if (props.variant === 'contained') {
      return `
        color: #fff;
        background-color: #1976d2;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        &:hover {
          background-color: #1565c0;
          box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
        }
        &:active {
          box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
        }
      `;
    } else if (props.variant === 'outlined') {
      return `
        color: #1976d2;
        border: 1px solid rgba(25, 118, 210, 0.5);
        background-color: transparent;
        &:hover {
          background-color: rgba(25, 118, 210, 0.04);
          border-color: #1976d2;
        }
      `;
    } else {
      return `
        color: #1976d2;
        background-color: transparent;
        &:hover {
          background-color: rgba(25, 118, 210, 0.04);
        }
      `;
    }
  }}

  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    background-color: rgba(0, 0, 0, 0.12);
    cursor: default;
    pointer-events: none;
  }

  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const Button: React.FC<ButtonProps> = ({ 
  variant = 'text', 
  size = 'medium',
  children, 
  onClick,
  href,
  type = 'button',
  disabled = false,
  sx,
  className,
  id,
  ...props 
}) => {
  const customStyles = sx;
  
  if (href) {
    return (
      <StyledButton
        as={Link}
        href={href}
        variant={variant}
        size={size}
        customStyles={customStyles}
        className={className}
        id={id}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
  
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
      customStyles={customStyles}
      className={className}
      id={id}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

