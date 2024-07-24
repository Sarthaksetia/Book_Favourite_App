import React, { type MouseEvent } from "react";
import "@styles/Button.scss";

type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  icon?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
  variant = "primary",
  isDisabled,
}) => {
  return (
    <button
      className={`btn ${variant} ${className} ${isDisabled ? "disabled" : ""}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
