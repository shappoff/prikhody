import React from 'react';

interface DocumentScannerOutlinedIconProps {
  fontSize?: 'small' | 'medium' | 'large' | 'inherit';
  className?: string;
  style?: React.CSSProperties;
}

const DocumentScannerOutlinedIcon: React.FC<DocumentScannerOutlinedIconProps> = ({ 
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
      <path d="M7 3H4v3H2V1h5v2zm15 3V1h-5v2h3v3h2zM7 21H4v-3H2v5h5v-2zm13-3v3h-3v2h5v-5h-2zM19 4v16H5V4h14zm-4 4H9v2h6V8zm0 3H9v2h6v-2zm0 3H9v2h6v-2z" />
    </svg>
  );
};

export default DocumentScannerOutlinedIcon;

