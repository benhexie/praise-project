import "./Select.css";
import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6';

const Select = ({ value, setValue, options, label }) => {
const [selectOpen, setSelectOpen] = useState(false);

useEffect(() => {
  const closeSelect = () => {
    setSelectOpen(false);
  };
  document.addEventListener("click", (e) => {
    if (e.target.closest(".dashboard__custom__select")) return;
    closeSelect();
  });
  return () => document.removeEventListener("click", closeSelect);
}, []);

useEffect(() => {
  setSelectOpen(false);
}, [value]);

  return (
    <div className="dashboard__custom__select__container">
      {label && <label>{label}</label>}
      <div className="dashboard__custom__select">
        <div
          className="dashboard__custom__select__title"
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <span>
            {options?.filter((option) => option.value === value)?.[0]?.label ||
              []}
          </span>
          <FaChevronDown className="dashboard__custom__select__title__icon" />
        </div>
        {selectOpen && (
          <div className="dashboard__custom__select__options">
            {options.map((option, index) => (
              <span key={index} onClick={() => setValue(option.value)}>
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select