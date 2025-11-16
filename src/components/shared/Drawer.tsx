import React from 'react';
import styled from 'styled-components';

interface DrawerProps {
  open: boolean;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  sx?: React.CSSProperties;
}

const DrawerBackdrop = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1200;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.open ? 1 : 0};
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  pointer-events: ${props => props.open ? 'auto' : 'none'};
`;

const DrawerContent = styled.div<{ 
  open: boolean; 
  anchor: string;
  customStyles?: React.CSSProperties;
}>`
  position: fixed;
  z-index: 1300;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  
  ${props => {
    if (props.anchor === 'left') {
      return `
        top: 0;
        left: 0;
        bottom: 0;
        width: 240px;
        max-width: calc(100vw - 32px);
        transform: ${props.open ? 'translateX(0)' : 'translateX(-100%)'};
      `;
    } else if (props.anchor === 'right') {
      return `
        top: 0;
        right: 0;
        bottom: 0;
        width: 240px;
        max-width: calc(100vw - 32px);
        transform: ${props.open ? 'translateX(0)' : 'translateX(100%)'};
      `;
    } else if (props.anchor === 'top') {
      return `
        top: 0;
        left: 0;
        right: 0;
        height: 240px;
        max-height: calc(100vh - 32px);
        transform: ${props.open ? 'translateY(0)' : 'translateY(-100%)'};
      `;
    } else {
      return `
        bottom: 0;
        left: 0;
        right: 0;
        height: 240px;
        max-height: calc(100vh - 32px);
        transform: ${props.open ? 'translateY(0)' : 'translateY(100%)'};
      `;
    }
  }}
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const Drawer: React.FC<DrawerProps> = ({
  open,
  anchor = 'left',
  children,
  className,
  onClose,
  sx
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleBackdropClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <DrawerBackdrop open={open} onClick={handleBackdropClick} />
      <DrawerContent 
        open={open} 
        anchor={anchor}
        customStyles={sx}
        className={className}
      >
        {children}
      </DrawerContent>
    </>
  );
};

export default Drawer;

