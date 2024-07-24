import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  className?: string;
};

const Textarea: FC<TextareaProps> = ({
  placeholder,
  register,
  required,
  className = "",
}) => (
  <textarea
    className={className}
    placeholder={placeholder}
    {...register}
    required={required}
  />
);

export default Textarea;
