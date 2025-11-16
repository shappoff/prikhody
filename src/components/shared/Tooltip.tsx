import React from 'react';
import styled from 'styled-components';

interface TooltipProps {
  title: string;
  children: React.ReactElement;
  arrow?: boolean;
  className?: string;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div<{ show: boolean; arrow: boolean }>`
  position: absolute;
  z-index: 1500;
  pointer-events: none;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  margin-bottom: ${props => props.arrow ? '4px' : '8px'};
  white-space: nowrap;
  background-color: rgba(97, 97, 97, 0.9);
  color: #fff;
  padding: 4px 8px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.4em;
  border-radius: 4px;
  
  ${props => props.arrow && `
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: rgba(97, 97, 97, 0.9);
    }
  `}
`;

const Tooltip: React.FC<TooltipProps> = ({ 
  title, 
  children, 
  arrow = false,
  className
}) => {
  const [show, setShow] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <TooltipWrapper 
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
      <TooltipContent show={show} arrow={arrow}>
        {title}
      </TooltipContent>
    </TooltipWrapper>
  );
};

export default Tooltip;

