import React from "react";

const NonceBox = ({ nonce, setNonce }) => {
  return (
    <div className="nonce-box">
      <label>Nonce:</label>
      <input
        type="number"
        min="0"
        value={nonce}
        onChange={(e) => setNonce(e.target.value)}
      />
    </div>
  );
};

export default NonceBox;
