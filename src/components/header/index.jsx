import React, { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../title";
import Button from "../button";
import Modal from "../modal";
import Input from "../input";
import { ReactComponent as CogIcon } from "../../icons/cog.svg";
import { ReactComponent as PlayIcon } from "../../icons/play.svg";
import "./style.css";

const defaultButtonProps = { show: false, withCaption: false };

const Header = ({
  title,
  appearance,
  settingsButton = defaultButtonProps,
  runButton = defaultButtonProps,
  addBuild = () => void 0,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [buildName, setBuildName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    setFetching(true);

    setTimeout(() => {
      addBuild(buildName);
      setModalVisible(false);
      setFetching(false);
    }, 1000);
  };

  return (
    <div className="header">
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="header__new-build-title">New build</div>
        <div className="header__new-build-description">
          Enter the commit hash which you want to build.
        </div>
        <form onSubmit={onSubmit}>
          <Input onChange={setBuildName} required withClearButton />
          <div className="header__modal-button-group">
            <Button type="submit" fetching={fetching}>
              Run build
            </Button>
            <Button
              appearance="secondary"
              onClick={() => setModalVisible(false)}
              disabled={fetching}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Title appearance={appearance}>{title}</Title>

      <div className="header__actions">
        {runButton.show && (
          <Button
            appearance="secondary"
            size="sm"
            onClick={() => setModalVisible(true)}
          >
            <div className="header__action-button">
              <div className="header__action-icon">
                <PlayIcon />
              </div>

              {runButton.withCaption && (
                <span className="header__action-caption">Run build</span>
              )}
            </div>
          </Button>
        )}

        {settingsButton.show && (
          <Link to="/settings">
            <Button appearance="secondary" size="sm">
              <div className="header__action-button">
                <div className="header__action-icon">
                  <CogIcon />
                </div>

                {settingsButton.withCaption && (
                  <span className="header__action-caption">Settings</span>
                )}
              </div>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
