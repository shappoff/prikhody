import React from 'react';

interface DoneIconProps {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
  className?: string;
  style?: React.CSSProperties;
}

const DoneIcon: React.FC<DoneIconProps> = ({ fontSize = 'medium', className, style }) => {
  const size = fontSize === 'small' ? '16px' : fontSize === 'large' ? '24px' : '20px';
  
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
};

export default DoneIcon;

