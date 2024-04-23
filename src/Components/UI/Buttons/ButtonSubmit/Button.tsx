'use client';

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Button({
  onClick,
  className = '',
  type = 'button',
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
