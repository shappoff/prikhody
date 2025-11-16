import React from 'react';
import styled from 'styled-components';

interface ChipProps {
  label: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  size?: 'small' | 'medium';
  className?: string;
  id?: string;
}

const StyledChip = styled.div<{ size: string; clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.size === 'small' ? '24px' : '32px'};
  color: rgba(0, 0, 0, 0.87);
  background-color: rgba(0, 0, 0, 0.08);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: ${props => props.size === 'small' ? '0.8125rem' : '0.875rem'};
  font-weight: 500;
  line-height: 1.75;
  border-radius: 16px;
  white-space: nowrap;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  outline: 0;
  text-decoration: none;
  border: 0;
  padding: 0;
  vertical-align: middle;
  box-sizing: border-box;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  ${props => props.clickable && `
    &:hover {
      background-color: rgba(0, 0, 0, 0.12);
    }
    
    &:active {
      background-color: rgba(0, 0, 0, 0.16);
    }
  `}
`;

const ChipIcon = styled.span<{ size: string }>`
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: -6px;
  
  svg {
    font-size: ${props => props.size === 'small' ? '18px' : '20px'};
  }
`;

const ChipLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 12px;
  padding-right: 12px;
  white-space: nowrap;
`;

const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  onClick,
  size = 'medium',
  className,
  id,
  ...props
}) => {
  return (
    <StyledChip
      onClick={onClick}
      size={size}
      clickable={!!onClick}
      className={className}
      id={id}
      {...props}
    >
      {icon && <ChipIcon size={size}>{icon}</ChipIcon>}
      <ChipLabel>{label}</ChipLabel>
    </StyledChip>
  );
};

export default Chip;

