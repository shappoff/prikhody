import React from 'react';
import styled from 'styled-components';

interface ListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
}

const StyledListItemText = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const PrimaryText = styled.div`
  margin: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
`;

const SecondaryText = styled.div`
  margin: 0;
  margin-top: 4px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.6);
`;

const ListItemText: React.FC<ListItemTextProps> = ({ 
  primary,
  secondary,
  className
}) => {
  return (
    <StyledListItemText className={className}>
      {primary && <PrimaryText>{primary}</PrimaryText>}
      {secondary && <SecondaryText>{secondary}</SecondaryText>}
    </StyledListItemText>
  );
};

export default ListItemText;

