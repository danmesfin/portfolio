import React from 'react';

interface PaperButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const PaperButton: React.FC<PaperButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  type = 'button',
}) => {
  const buttonContent = (
    <div className={`btn-${variant} ${className}`}>
      {variant === 'primary' ? (
        <>
          <div className="btn-primary-bg"></div>
          <div className="btn-primary-shadow"></div>
          <div className="btn-primary-content">{children}</div>
        </>
      ) : (
        <>
          <div className="btn-secondary-shadow"></div>
          <div className="btn-secondary-content">{children}</div>
        </>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default PaperButton;
