import React from 'react';

interface DoNotTouchOutlinedIconProps {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
  className?: string;
  style?: React.CSSProperties;
}

const DoNotTouchOutlinedIcon: React.FC<DoNotTouchOutlinedIconProps> = ({ 
  fontSize = 'medium', 
  className,
  style
}) => {
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
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6.5 6V22h-2v-6h-2v6h-2v-8h-2v3.61c-.32.26-.65.48-.99.65-.36.18-.73.3-1.11.39-.19.05-.39.07-.6.07-.19 0-.37-.02-.56-.07-.38-.09-.75-.21-1.11-.39-.34-.17-.67-.39-.99-.65L3.5 15V22h-2v-6h2v-4l1.22-1.22c.09-.09.2-.16.31-.22L8 10.5c.39-.26.84-.4 1.31-.4.42 0 .82.1 1.19.28L12.5 12h2l1.5-2v2h2z" />
    </svg>
  );
};

export default DoNotTouchOutlinedIcon;

