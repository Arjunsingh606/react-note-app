import React, { useState, useEffect } from "react";
import { ColorLable, Notedata } from "../interface/Interfaces";

interface CustomDropdownProps {
  options: ColorLable[];
  setLabel: (option: ColorLable) => void;
  label: any;
  selectedNote: Notedata | null;
}

const LableDropdown: React.FC<CustomDropdownProps> = ({
  options,
  setLabel,
  label,
  selectedNote,
}) => {
  const [selectedOption, setSelectedOption] = useState<ColorLable | null>(null);
  const [dropDown, setDropDown] = useState(false);

  const handleOptionClick = (option: ColorLable) => {
    setSelectedOption(option);
    setLabel(option);
    setDropDown(false);
  };

  const toggleDropdown = () => {
    if (!selectedOption && selectedNote) {
      // Set the initial selected option when the dropdown is opened
      setSelectedOption({
        label: selectedNote.label,
        color: selectedNote.color,
      });
    }
    setDropDown(true);
  };

  // Update the selected option when the selectedNote prop changes
  useEffect(() => {
    if (selectedNote) {
      setSelectedOption({
        label: selectedNote.label,
        color: selectedNote.color,
      });
    }
  }, [selectedNote]);

  return (
    <div className="custom-dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedOption ? (
          <div className="lable-color">
            <div
              className="color-circle"
              style={{ backgroundColor: selectedOption.color }}
            ></div>
            <span className="title">{selectedOption.label}</span>
          </div>
        ) : (
          <span className="title">Label</span>
        )}
      </div>
      {dropDown && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              <div
                className="color-circle"
                style={{ backgroundColor: option.color }}
              ></div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LableDropdown;
