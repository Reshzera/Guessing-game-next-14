"use client";
import { forwardRef, useMemo, useState } from "react";

// import { Container } from './styles';

type AutocompleteProps = {
  options: string[];
  handleChange: (value: string) => void;
};

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ options, handleChange }, ref) => {
    const [currentValue, setCurrentValue] = useState("");

    const availableOptions = useMemo(() => {
      if (!currentValue) return [];

      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(currentValue.toLowerCase())
      );

      if (
        filteredOptions.length === 1 &&
        filteredOptions[0].toLowerCase() === currentValue.toLowerCase()
      )
        return [];

      return filteredOptions;
    }, [currentValue, options]);

    const handleClickOption = (option: string) => {
      handleChange(option);
      setCurrentValue(option);
    };

    return (
      <div className="relative w-full">
        <input
          className="w-full p-2 rounded-md border border-gray-400"
          onChange={(e) => setCurrentValue(e.target.value)}
          ref={ref}
        />

        {!!availableOptions.length && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded-md max-h-36 overflow-auto">
            {availableOptions.map((option) => (
              <div
                key={option}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleClickOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
