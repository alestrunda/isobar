import React from "react";

interface Props {
  end: number;
  id: string;
  label?: string;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  start: number;
  value: string;
}

const SelectSequence = ({ end, id, label, onChange, start, value }: Props) => {
  const length = end - start + 1; //add 1 to make the end value inclusive

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className="form-control"
        id={id}
        onChange={onChange}
        value={value}
      >
        <option value="">Select</option>
        {new Array(length).fill(undefined).map((_, index) => {
          const option = (start + index).toString();
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectSequence;
