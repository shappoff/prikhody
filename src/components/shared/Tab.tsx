import React from 'react';
import styled from 'styled-components';

interface TabProps {
  label: React.ReactNode;
  value: string | number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  className?: string;
  disabled?: boolean;
}

const StyledTab = styled.button<{ selected: boolean; disabled: boolean }>`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
  padding: 12px 16px;
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
  min-width: 72px;
  max-width: 360px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-bottom: 2px solid transparent;
  
  ${props => props.selected && `
    color: #1976d2;
    border-bottom-color: #1976d2;
  `}
  
  &:hover:not(:disabled) {
    background-color: rgba(25, 118, 210, 0.04);
  }
  
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    cursor: default;
    pointer-events: none;
  }
`;

const Tab: React.FC<TabProps> = ({
  label,
  value,
  onClick,
  selected = false,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <StyledTab
      onClick={onClick}
      selected={selected}
      disabled={disabled}
      className={className}
      {...props}
    >
      {label}
    </StyledTab>
  );
};

export default Tab;

