import React, { useState, useRef } from "react";
import cx from "classnames";
import RemoveIcon from "../../icons/remove-circle";
import "./style.css";

const Input = ({
  name,
  onChange,
  placeholder,
  disabled,
  value: initValue = "",
  inline,
  withClearButton,
  size,
  required,
  type,
  normalize = (value) => value,
}) => {
  const [value, setValue] = useState(initValue);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  return (
    <div
      ref={wrapperRef}
      onClick={(event) => {
        if (inputRef.current) {
          document.activeElement === inputRef.current
            ? event.preventDefault()
            : inputRef.current.focus();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cx(
        "input",
        disabled && "input--disabled",
        focused && "input--focused",
        inline && "input--inline",
        withClearButton && "input--with-clear-button"
      )}
    >
      <input
        ref={inputRef}
        name={name}
        size={size}
        value={value}
        disabled={disabled}
        required={required}
        type={type}
        className="input__entry"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          const value = normalize(event.target.value);

          setValue(value);
          onChange && onChange(value);
        }}
      />

      {withClearButton && (
        <RemoveIcon
          className={cx(
            "input__icon-remove",
            value && (focused || hovered) && "input__icon-remove--visible"
          )}
          onClick={() => {
            setValue("");
            onChange && onChange("");
          }}
        />
      )}
    </div>
  );
};

export default Input;
