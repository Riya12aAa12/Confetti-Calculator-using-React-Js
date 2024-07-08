import React from 'react';
import './Button.css';

// Button component definition
const Button = ({ label, className, onClick }) => {
  // Return a button element with the specified label and className
  return (
    <button className={`button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

// Export the Button component as the default export
export default Button;
