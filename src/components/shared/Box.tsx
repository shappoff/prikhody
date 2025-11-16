import React from 'react';
import styled, { css } from 'styled-components';

type SxValue = string | number | React.CSSProperties | Record<string, any>;
type SxObject = Record<string, any>;
type SxProp = React.CSSProperties | SxObject | ((theme: any) => React.CSSProperties | SxObject);

interface BoxProps {
  component?: React.ElementType;
  children?: React.ReactNode;
  sx?: SxProp;
  noValidate?: boolean;
  autoComplete?: string;
  className?: string;
  id?: string;
}

const convertMuiShorthand = (key: string, value: any): string => {
  // MUI shorthand properties mapping
  const shorthandMap: Record<string, string> = {
    m: 'margin',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    mx: 'margin-left', // will be handled separately
    my: 'margin-top', // will be handled separately
    p: 'padding',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    px: 'padding-left', // will be handled separately
    py: 'padding-top', // will be handled separately
  };

  if (shorthandMap[key]) {
    if (key === 'mx') {
      return `margin-left: ${value};\nmargin-right: ${value};`;
    } else if (key === 'my') {
      return `margin-top: ${value};\nmargin-bottom: ${value};`;
    } else if (key === 'px') {
      return `padding-left: ${value};\npadding-right: ${value};`;
    } else if (key === 'py') {
      return `padding-top: ${value};\npadding-bottom: ${value};`;
    }
    return `${shorthandMap[key]}: ${value};`;
  }
  
  // Regular CSS property
  const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  return `${cssKey}: ${value};`;
};

const processSxStyles = (sx: SxProp): string => {
  const styles = typeof sx === 'function' ? sx({}) : sx;
  
  if (!styles || typeof styles !== 'object') {
    return '';
  }

  // Check if it's a plain CSSProperties object (no selectors)
  const hasSelectors = Object.keys(styles).some(key => key.startsWith('&') || key.includes(':'));
  
  if (!hasSelectors) {
    // Plain CSS properties (may include MUI shorthand)
    return Object.entries(styles as any).map(([key, value]) => {
      return convertMuiShorthand(key, value);
    }).join('\n');
  }

  // MUI-style sx with selectors
  let cssString = '';
  Object.entries(styles as SxObject).forEach(([selector, value]) => {
    if (selector.startsWith('&')) {
      // Convert MUI selector to CSS
      const cssSelector = selector.replace(/&/g, '');
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedStyles = Object.entries(value as any).map(([key, val]) => {
          return `  ${convertMuiShorthand(key, val)}`;
        }).join('\n');
        cssString += `${cssSelector} {\n${nestedStyles}\n}\n`;
      }
    } else if (!selector.includes(':')) {
      // Regular CSS property (may include MUI shorthand)
      cssString += `${convertMuiShorthand(selector, value)}\n`;
    }
  });
  
  return cssString;
};

const StyledBox = styled.div<{ customStyles?: string }>`
  ${props => props.customStyles && css`${props.customStyles}`}
`;

const StyledForm = styled.form<{ customStyles?: string }>`
  ${props => props.customStyles && css`${props.customStyles}`}
`;

const Box: React.FC<BoxProps> = ({ 
  component = 'div', 
  children, 
  sx, 
  noValidate,
  autoComplete,
  className,
  id,
  ...props 
}) => {
  const customStyles = sx ? processSxStyles(sx) : undefined;
  
  if (component === 'form') {
    return (
      <StyledForm 
        noValidate={noValidate}
        autoComplete={autoComplete}
        className={className}
        id={id}
        customStyles={customStyles}
        {...props}
      >
        {children}
      </StyledForm>
    );
  }
  
  return (
    <StyledBox 
      as={component}
      customStyles={customStyles}
      className={className}
      id={id}
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export default Box;

