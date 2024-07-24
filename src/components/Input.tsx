import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
};

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  register,
  required,
  className = "",
  autoFocus = false,
}) => (
  <input
    className={className}
    type={type}
    placeholder={placeholder}
    {...register}
    required={required}
    autoFocus={autoFocus}
  />
);

export default Input;
