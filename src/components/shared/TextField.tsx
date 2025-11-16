import React from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  id?: string;
  className?: string;
  sx?: React.CSSProperties;
  fullWidth?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  InputProps?: any;
}

const StyledTextField = styled.div<{ size: string; fullWidth: boolean; customStyles?: React.CSSProperties }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  vertical-align: top;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const InputWrapper = styled.div<{ size: string; variant: string }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
  
  ${props => {
    if (props.variant === 'outlined') {
      return `
        border: 1px solid rgba(0, 0, 0, 0.23);
        padding: ${props.size === 'small' ? '8.5px 14px' : '16.5px 14px'};
        
        &:hover {
          border-color: rgba(0, 0, 0, 0.87);
        }
        
        &:focus-within {
          border-color: #1976d2;
          border-width: 2px;
        }
      `;
    }
    return '';
  }}
`;

const InputLabel = styled.label<{ focused: boolean; size: string; variant: string }>`
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  padding: 0;
  display: block;
  transform-origin: top left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  position: absolute;
  left: 0;
  top: 0;
  transform: ${props => props.focused ? 'translate(14px, -9px) scale(0.75)' : `translate(14px, ${props.size === 'small' ? '9px' : '17px'}) scale(1)`};
  transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
    max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  z-index: 1;
  pointer-events: none;
  background-color: ${props => props.focused ? '#fff' : 'transparent'};
  padding: ${props => props.focused ? '0 4px' : '0'};
  
  ${props => {
    if (props.variant === 'outlined') {
      return `
        transform: ${props.focused ? 'translate(14px, -9px) scale(0.75)' : 'translate(14px, 17px) scale(1)'};
      `;
    }
    return '';
  }}
`;

const Input = styled.input<{ size: string; variant: string; hasLabel: boolean }>`
  font: inherit;
  letter-spacing: inherit;
  color: currentColor;
  padding: ${props => props.size === 'small' ? '8.5px 14px' : '16.5px 14px'};
  border: 0;
  height: ${props => props.size === 'small' ? '1.4375em' : '1.4375em'};
  margin: 0;
  display: block;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  background: none;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
  
  &::placeholder {
    opacity: ${props => props.hasLabel ? '0' : '1'};
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  
  &:focus::placeholder {
    opacity: 1;
  }
  
  ${props => {
    if (props.variant === 'outlined') {
      return `
        padding: ${props.size === 'small' ? '8.5px 14px' : '16.5px 14px'};
      `;
    }
    return '';
  }}
`;

const TextField: React.FC<TextFieldProps> = ({ 
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  size = 'medium',
  variant = 'outlined',
  id,
  className,
  sx,
  fullWidth = false,
  inputProps,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `${inputId}-label`;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const { size: inputSize, ...restInputProps } = inputProps || {};
  const { size: propsSize, ...restProps } = props as any;

  return (
    <StyledTextField 
      size={size} 
      fullWidth={fullWidth}
      customStyles={sx}
      className={className}
    >
      <InputWrapper size={size} variant={variant}>
        {label && (
          <InputLabel 
            htmlFor={inputId}
            id={labelId}
            focused={focused || !!value}
            size={size}
            variant={variant}
          >
            {label}
          </InputLabel>
        )}
        <Input
          id={inputId}
          size={size}
          variant={variant}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          hasLabel={!!label}
          {...restInputProps}
          {...restProps}
        />
      </InputWrapper>
    </StyledTextField>
  );
};

export default TextField;

