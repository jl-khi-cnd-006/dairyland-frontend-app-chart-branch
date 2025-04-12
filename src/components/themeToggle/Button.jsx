import React, { useState } from "react";
import "./button.css";

const Button = () => {
  const [checked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <label className="ui-switch">
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
};

export default Button;
