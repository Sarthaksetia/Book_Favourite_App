import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DateInputProps = {
  placeholder?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
};

const DateInput: FC<DateInputProps> = ({ placeholder, register, required }) => (
  <input
    className="input--text"
    type="date"
    placeholder={placeholder}
    {...register}
    required={required}
  />
);

export default DateInput;
