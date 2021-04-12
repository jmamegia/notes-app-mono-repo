import React, { useState, forwardRef, useImperativeHandle } from "react";

const Toggler = forwardRef(({ children }, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <button onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
      <h1 style={{ display: visible ? "block" : "none" }}>{children}</h1>
    </>
  );
});

export default Toggler;
