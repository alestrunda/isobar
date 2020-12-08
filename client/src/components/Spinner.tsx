import React from "react";

interface Props {
  active: boolean;
}

const Spinner = ({ active }: Props) => {
  if (!active) return null;
  return (
    <div className="spinner-wrapper">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
