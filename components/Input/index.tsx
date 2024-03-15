import React, { ChangeEvent } from "react";


// Define the props interface
interface InputFieldProps {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name?: string
  type?: string;
}


const InputField: React.FC<InputFieldProps> = ({ placeholder = "Results URL", onChange, value, name, type }) => {
  return <input placeholder={placeholder} onChange={onChange} className="w-full outline-none h-12 border border-gray-300 rounded-md p-2 text-base" value={value} name={name} type={type} />;
};

export default InputField;
