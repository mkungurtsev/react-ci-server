import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import Title from "../../components/title";
import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import Input from "../../components/input";
import Notification from "../../components/notification";
import { saveSettings, actionCreators } from "../../reducers/settings";
import "./style.css";

const onSubmit = (event, history, saveSettings, formData) => {
  event.preventDefault();

  return saveSettings(formData)
    .then(() => history.push("/"))
    .catch(() => void 0);
};

const Settings = ({ saveSettings, clearErrors, settings }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    repo: settings.repo,
    command: settings.command,
    branch: settings.branch,
    sync: settings.sync,
  });

  const onFiledChange = (field) => (value) =>
    setFormData((formData) => ({
      ...formData,
      [field]: value,
    }));

  useEffect(() => clearErrors, []);

  return (
    <div>
      <Title appearance="secondary">School CI Server</Title>

      <div className="settings__subtitle">Settings</div>
      <div className="settings__description">
        Configure repository connection and synchronization settings.
      </div>

      <form
        className="settings__form"
        onSubmit={(event) => onSubmit(event, history, saveSettings, formData)}
      >
        {settings.submitFailed && (
          <Notification status="error" title=" Submit failed" indentation="sm">
            Please, try again later
          </Notification>
        )}

        <FormGroup title="GitHub repository" isRequired>
          <Input
            name="repo"
            required
            placeholder="user-name/repo-name"
            withClearButton
            value={formData.repo}
            onChange={onFiledChange("repo")}
          />
        </FormGroup>

        <FormGroup title="Build command" isRequired>
          <Input
            name="command"
            required
            placeholder="yarn start"
            withClearButton
            value={formData.command}
            onChange={onFiledChange("command")}
          />
        </FormGroup>

        <FormGroup title="Main branch">
          <Input
            name="branch"
            placeholder="master"
            withClearButton
            value={formData.branch}
            onChange={onFiledChange("branch")}
          />
        </FormGroup>

        <FormGroup>
          <div className="inline-input">
            <div>Synchronize every</div>
            <Input
              name="sync"
              normalize={(value) => value?.replace(/[^\d.-]/g, "")}
              size={3}
              value={formData.sync}
              onChange={onFiledChange("sync")}
            />
            <div>minutes</div>
          </div>
        </FormGroup>

        <div className="settings__buttons">
          <Button type="submit" fetching={settings.submitting}>
            Save
          </Button>
          <Link to="/">
            <Button
              appearance="secondary"
              className="settings__button--fullwidth"
              disabled={settings.submitting}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

const mapDispatchToProps = {
  saveSettings,
  clearErrors: actionCreators.clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
