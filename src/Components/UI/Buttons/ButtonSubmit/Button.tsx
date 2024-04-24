'use client';
import { ButtonProps } from "./types";

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
