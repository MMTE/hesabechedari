import React, { useState, useEffect } from 'react';
import { toPersianNumber, toEnglishNumber } from '../utils';

interface PersianNumberInputProps {
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

const PersianNumberInput: React.FC<PersianNumberInputProps> = ({ value, onChange, placeholder, className }) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    setDisplayValue(value ? toPersianNumber(value) : '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(toPersianNumber(newValue));
    const englishNumber = toEnglishNumber(newValue);
    onChange(englishNumber === '' ? 0 : Number(englishNumber));
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      dir="ltr"
    />
  );
};

export default PersianNumberInput;