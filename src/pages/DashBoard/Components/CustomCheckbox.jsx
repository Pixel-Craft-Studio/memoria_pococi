import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const CustomCheckBox = forwardRef(({ id, onCheckChange }, ref) => {
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    updateCheckState: (newState) => {
      setChecked(newState);
    }
  }));

  const handleCheck = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    
    if (onCheckChange) {
      onCheckChange(newCheckedState);
    }
  };

  return (
    <div className="relative">
      <input
        hidden
        type="checkbox"
        className="absolute"
        checked={checked}
        onChange={handleCheck}
        id={id}
      />
      <div
        className="transition-colors w-[20px] h-[20px] border-1 dark:border-0 border-neutral-300 top-0 left-5 rounded-[4px] cursor-pointer"
        onClick={handleCheck}
        style={{ backgroundColor: checked ? "#1E3A8A" : "#F5F5F5" }}
      >
        <svg
          className="w-4 h-4 text-white transition-all duration-300 ease-out translate-x-[2px] translate-y-[2px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M5 12l4 4L19 7"
            className="stroke-current transition-all duration-300 ease-out"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: checked ? 0 : 24,
              transition: "stroke-dashoffset 0.3s ease-out",
            }}
          />
        </svg>
      </div>
    </div>
  );
});

CustomCheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCheckChange: PropTypes.func
};

CustomCheckBox.displayName = "CustomCheckBox";

export default CustomCheckBox;