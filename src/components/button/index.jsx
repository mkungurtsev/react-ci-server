import React from "react";
import cx from "classnames";
import Loader from "../loader";
import "./style.css";

const Button = ({
  children,
  onClick,
  appearance = "primary",
  disabled,
  size = "md",
  type = "button",
  fetching,
  className,
}) => (
  <button
    type={type}
    onClick={disabled || fetching ? () => void 0 : onClick}
    className={cx(
      "button",
      `button--${size}`,
      !disabled && `button--${appearance}`,
      disabled && "button--disabled",
      className
    )}
  >
    <div className={cx(fetching && "hidden")}>{children}</div>

    {fetching && (
      <div className="button__loader">
        <Loader size={15} />
      </div>
    )}
  </button>
);

export default Button;
