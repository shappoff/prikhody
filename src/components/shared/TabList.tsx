'use client'

import React from 'react';
import styled from 'styled-components';
import { useTabContext } from './TabContext';
import Tab from './Tab';

interface TabListProps {
  children?: React.ReactNode;
  onChange?: (event: React.SyntheticEvent, newValue: string | number) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: boolean;
  visibleScrollbar?: boolean;
  wrapped?: boolean;
  centered?: boolean;
  'aria-label'?: string;
  className?: string;
  sx?: React.CSSProperties;
}

const StyledTabList = styled.div<{ 
  variant: string; 
  scrollable: boolean;
  visibleScrollbar: boolean;
  customStyles?: React.CSSProperties;
}>`
  display: flex;
  overflow-x: ${props => props.scrollable ? 'auto' : 'hidden'};
  scrollbar-width: ${props => props.visibleScrollbar ? 'auto' : 'none'};
  
  &::-webkit-scrollbar {
    display: ${props => props.visibleScrollbar ? 'block' : 'none'};
  }
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const TabList: React.FC<TabListProps> = ({
  children,
  onChange,
  variant = 'standard',
  scrollButtons = false,
  visibleScrollbar = false,
  wrapped = false,
  centered = false,
  'aria-label': ariaLabel,
  className,
  sx
}) => {
  const context = useTabContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
    if (onChange) {
      onChange(event, newValue);
    } else {
      context.onChange(event, newValue);
    }
  };

  const tabs = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Tab) {
      const tabChild = child as React.ReactElement<{ 
        value: string | number;
        label?: React.ReactNode;
        selected?: boolean;
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
        className?: string;
        disabled?: boolean;
      }>;
      return React.cloneElement(tabChild, {
        selected: context.value === tabChild.props.value,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleChange(e, tabChild.props.value);
        }
      } as any);
    }
    return child;
  });

  return (
    <StyledTabList
      variant={variant}
      scrollable={variant === 'scrollable'}
      visibleScrollbar={visibleScrollbar}
      customStyles={sx}
      className={className}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs}
    </StyledTabList>
  );
};

export default TabList;

