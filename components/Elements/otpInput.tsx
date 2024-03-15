import React, { useState, useRef, ChangeEvent } from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const OtpInput: React.FC<Props> = ({ value, onChange }) => {
    const [activeInput, setActiveInput] = useState(0);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = event.target.value;
        const newValues = value.split("");
        newValues[index] = newValue;
        onChange(newValues.join(""));
        if (newValue !== "" && index < 5) {
            setActiveInput(index + 1);
            const nextInput = inputsRef.current[index + 1];
            if (nextInput !== null) {
                nextInput.focus();
            }
        }
    };



    return (
        <div className="flex justify-center items-center flex-wrap md:gap-6 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
                <input
                    key={index}
                    type="tel"
                    pattern="\d*"
                    className={`w-11 h-11 md:h-16 md:w-16 border rounded-lg text-lg md:text-2xl font-semibold text-center focus:outline-none focus:border-theme`}
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={(event) => handleInputChange(event, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                />
            ))}
        </div>
    );
};

export default OtpInput;
