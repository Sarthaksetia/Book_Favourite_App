import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DateInputProps = {
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  className?: string;
};

const DateInput: FC<DateInputProps> = ({
  placeholder,
  register,
  required,
  className = "",
}) => (
  <input
    className={className}
    type="date"
    placeholder={placeholder}
    {...register}
    required={required}
  />
);

export default DateInput;
