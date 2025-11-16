import React from 'react';
import styled from 'styled-components';

interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  button?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const StyledListItem = styled.li<{ button: boolean }>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  text-align: left;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: flex-start;
  text-decoration: none;
  cursor: ${props => props.button ? 'pointer' : 'default'};
  user-select: none;
  
  ${props => props.button && `
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    &:active {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `}
`;

const ListItem: React.FC<ListItemProps> = ({ 
  children, 
  className,
  id,
  button = false,
  onClick
}) => {
  return (
    <StyledListItem 
      className={className}
      id={id}
      button={button}
      onClick={onClick}
    >
      {children}
    </StyledListItem>
  );
};

export default ListItem;

