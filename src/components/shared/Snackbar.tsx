import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
`;

interface SnackbarProps {
  open: boolean;
  onClose?: () => void;
  message: string;
  autoHideDuration?: number;
  className?: string;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const SnackbarWrapper = styled.div<{ 
  open: boolean; 
  anchorOrigin: { vertical: string; horizontal: string } 
}>`
  position: fixed;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${props => props.anchorOrigin.horizontal === 'center' ? '50%' : 
    props.anchorOrigin.horizontal === 'left' ? '24px' : 'auto'};
  right: ${props => props.anchorOrigin.horizontal === 'right' ? '24px' : 'auto'};
  top: ${props => props.anchorOrigin.vertical === 'top' ? '24px' : 'auto'};
  bottom: ${props => props.anchorOrigin.vertical === 'bottom' ? '24px' : 'auto'};
  transform: ${props => props.anchorOrigin.horizontal === 'center' ? 'translateX(-50%)' : 'none'};
  pointer-events: none;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  animation: ${props => props.open ? slideUp : slideDown} 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const SnackbarContent = styled.div`
  background-color: #323232;
  color: #fff;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  padding: 6px 16px;
  border-radius: 4px;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
  min-width: 344px;
  max-width: 672px;
  display: flex;
  padding: 6px 16px;
  flex-wrap: wrap;
  align-items: center;
  pointer-events: auto;
`;

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  autoHideDuration = 4000,
  className,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}) => {
  React.useEffect(() => {
    if (open && autoHideDuration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <SnackbarWrapper 
      open={open}
      anchorOrigin={anchorOrigin}
      className={className}
    >
      <SnackbarContent>
        {message}
      </SnackbarContent>
    </SnackbarWrapper>
  );
};

export default Snackbar;

