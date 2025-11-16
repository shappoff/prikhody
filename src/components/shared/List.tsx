import React from 'react';
import styled from 'styled-components';

interface ListProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  sx?: React.CSSProperties;
}

const StyledList = styled.ul<{ customStyles?: React.CSSProperties }>`
  margin: 0;
  padding: 8px 0;
  position: relative;
  list-style: none;
  background-color: #fff;
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const List: React.FC<ListProps> = ({ 
  children, 
  className,
  id,
  sx
}) => {
  return (
    <StyledList 
      className={className}
      id={id}
      customStyles={sx}
    >
      {children}
    </StyledList>
  );
};

export default List;

