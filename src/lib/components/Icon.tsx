import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  // Using smaller triangle icons with blue border and empty inside
  return (
    <svg 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img" 
      aria-label={name}
      width="20"
      height="20"
    >
      <path 
        d="M10 1L19 15H1L10 1Z" 
        fill="transparent" 
        stroke="#3B82F6" 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path 
        d="M10 7V11" 
        stroke="#3B82F6" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle 
        cx="10" 
        cy="14" 
        r="0.5" 
        fill="#3B82F6"
      />
    </svg>
  );
};
