import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
};

const Textarea: FC<TextareaProps> = ({ placeholder, register, required }) => (
  <textarea
    className="input--text"
    placeholder={placeholder}
    {...register}
    required={required}
  />
);

export default Textarea;
