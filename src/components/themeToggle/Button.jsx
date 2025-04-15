import React, { useEffect, useState } from "react";
import "./button.css";
import { useTheme } from "next-themes";

const Button = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents SSR mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <label className="ui-switch" >
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default Button;
