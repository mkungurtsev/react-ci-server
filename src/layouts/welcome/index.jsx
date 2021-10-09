import React from "react";
import Button from "../../components/button";
import Link from "../../components/link";
import { ReactComponent as ToolsIcon } from "../../icons/tools.svg";
import "./style.css";

const Welcome = () => (
  <div className="welcome-page">
    <ToolsIcon className="welcome-page__image" />

    <div className="welcome-page__description">
      Configure repository connection and synchronization settings
    </div>

    <Link to="/settings">
      <Button>Open settings</Button>
    </Link>
  </div>
);

export default Welcome;
