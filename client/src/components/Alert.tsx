import React from "react";

interface Props {
  children: React.ReactNode | string;
}

const Alert = ({ children }: Props) => (
  <div className="alert alert-info" role="alert">
    {children}
  </div>
);

export default Alert;
