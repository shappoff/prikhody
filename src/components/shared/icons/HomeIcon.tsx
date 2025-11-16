import React from 'react';

interface HomeIconProps {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ fontSize = 'medium', className }) => {
  const size = fontSize === 'small' ? '16px' : fontSize === 'large' ? '24px' : '20px';
  
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export default HomeIcon;

