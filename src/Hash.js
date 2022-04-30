import React, { useState } from "react";

const Hash = ({ prev, hash, setHash, setPrev }) => {
  const [visibleDiv, setVisibleDiv] = useState(true);
  const [inputValue, setInputValue] = useState(prev);
  const [visibleInput, setVisibleInput] = useState(false);

  const handleDivClick = () => {
    setVisibleDiv(false);
    setVisibleInput(true);
  };

  const handleDoneClick = () => {
    setVisibleDiv(true);
    setVisibleInput(false);
    setPrev(inputValue);
    setHash("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const inputBox = (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="hack"
      />
      <button onClick={handleDoneClick}>Done</button>
    </>
  );
  return (
    <>
      {visibleDiv && (
        <div onClick={handleDivClick}>
          Prev: {inputValue ? inputValue : prev}
        </div>
      )}
      {visibleInput && inputBox}
      <div>Hash: {hash}</div>
    </>
  );
};

export default Hash;
