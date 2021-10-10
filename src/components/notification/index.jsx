import React from "react";
import cx from "classnames";
import "./style.css";

const Notification = ({ status, title, children, indentation = "none" }) => (
  <div
    className={cx(
      "notification",
      `notification--${status}`,
      `notification--indentation-${indentation}`
    )}
  >
    {!!title && <div className="notification__title">{title}</div>}
    <div className="notification__content">{children}</div>
  </div>
);

export default Notification;
