import React from "react";
import cx from "classnames";
import "./style.css";

const Title = ({ appearance = "primary", children }) => (
  <div className={cx("title", `title--${appearance}`)}>{children}</div>
);

export default Title;
