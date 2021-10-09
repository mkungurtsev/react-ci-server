import React from "react";
import cx from "classnames";
import { ReactComponent as BranchIcon } from "../../icons/branch.svg";
import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as FailIcon } from "../../icons/fail.svg";
import { ReactComponent as InProgressIcon } from "../../icons/in-progress.svg";
import { ReactComponent as PersonIcon } from "../../icons/person.svg";
import { ReactComponent as SuccessIcon } from "../../icons/success.svg";
import "./style.css";

const icons = {
  success: <SuccessIcon />,
  "in-progress": <InProgressIcon />,
  fail: <FailIcon />,
};

const getFormatedPeriod = (period) => {
  const hours = 0 | (period / 1000 / 60 / 60),
    min = 0 | (period / 1000 / 60) % 60;

  return `${hours} ч ${min} мин`;
};

const Pipeline = ({
  id,
  title,
  branch,
  hash,
  author,
  date,
  period,
  status,
}) => (
  <div className="pipeline">
    <div className="pipeline__status">{icons[status]}</div>

    <div className="pipeline__data">
      <div className="pipeline__info">
        <div className={cx("pipeline__id", `pipeline__id--${status}`)}>
          #{id}
        </div>
        <div className="pipeline__title">{title}</div>

        <div className="pipeline__meta">
          <div className="pipeline__branch">
            <BranchIcon className="pipeline__icon" />
            <div>{branch}</div>
            <div className={cx("pipeline__hash", "pipeline__gray")}>{hash}</div>
          </div>
          <div className="pipeline__author">
            <PersonIcon className="pipeline__icon" />
            <div>{author}</div>
          </div>
        </div>
      </div>

      <div className="pipeline__timestamps">
        <div className="pipeline__date">
          <CalendarIcon className="pipeline__icon" />
          <div className="pipeline__gray">
            {date.toLocaleDateString(navigator.language, {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
        <div className="pipeline__period">
          <ClockIcon className="pipeline__icon" />
          <div className="pipeline__gray">{getFormatedPeriod(period)}</div>
        </div>
      </div>
    </div>
  </div>
);

export default Pipeline;
