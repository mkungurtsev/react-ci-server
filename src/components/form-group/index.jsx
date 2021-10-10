import React from "react";
import cx from "classnames";
import "./style.css";

const FormGroup = ({ children, title, isRequired, indentation = "md" }) => (
  <div className={cx("form-group", `form-group--indentation-${indentation}`)}>
    {title && (
      <div className="form-group__title">
        {title}
        {isRequired && <span className="form-group__title--required"> *</span>}
      </div>
    )}
    {children}
  </div>
);

export default FormGroup;
