import React from 'react';

interface EditLocationIconProps {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
  className?: string;
}

const EditLocationIcon: React.FC<EditLocationIconProps> = ({ fontSize = 'medium', className }) => {
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
      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1.56 10H9v-1.44l3.35-3.34 1.44 1.44L10.44 12zm4.45-4.45l-.71.71-1.44-1.44.71-.71c.15-.15.39-.15.54 0l.9.9c.15.15.15.39 0 .54z" />
    </svg>
  );
};

export default EditLocationIcon;

