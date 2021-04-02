import React, { FC, MouseEventHandler } from 'react';

export interface ButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
