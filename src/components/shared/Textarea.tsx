import React from 'react';
import styled from 'styled-components';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  maxRows?: number;
  id?: string;
  className?: string;
  sx?: React.CSSProperties;
  slotProps?: {
    textarea?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  };
}

const StyledTextarea = styled.textarea<{ minRows: number; customStyles?: React.CSSProperties }>`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
  cursor: text;
  display: block;
  min-height: ${props => props.minRows * 1.4375 + 16.5 * 2}px;
  width: 100%;
  padding: 16.5px 14px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  resize: vertical;
  outline: 0;
  
  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }
  
  &:focus {
    border-color: #1976d2;
    border-width: 2px;
    padding: 15.5px 13px;
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
  minRows = 3,
  maxRows,
  id,
  className,
  sx,
  slotProps,
  ...props
}) => {
  const textareaProps = slotProps?.textarea || {};

  return (
    <StyledTextarea
      id={id}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minRows={minRows}
      customStyles={sx}
      {...textareaProps}
      {...props}
    />
  );
};

export default Textarea;

