import React, { useReducer } from "react";
import { useHistory, Link } from "react-router-dom";
import Title from "../../components/title";
import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import Input from "../../components/input";
import Notification from "../../components/notification";
import {
  reducer,
  getStateFromLocalStorage,
  actionCreators,
} from "../../reducers/settings";
import "./style.css";

const onSubmit = (event, state, dispatch, history) => {
  event.preventDefault();
  dispatch(actionCreators.submitStarted());

  if (state.command === "error") {
    setTimeout(() => dispatch(actionCreators.submitFailed()), 1000);
    return;
  }

  Object.keys(state).forEach((key) => {
    const value = state[key];
    value ? localStorage.setItem(key, value) : localStorage.removeItem(key);
  });

  setTimeout(() => {
    dispatch(actionCreators.submitSucceeded());
    history.push("/");
  }, 1000);
};

const Settings = () => {
  const [state, dispatch] = useReducer(reducer, getStateFromLocalStorage());
  const history = useHistory();

  return (
    <div>
      <Title appearance="secondary">School CI Server</Title>

      <div className="settings__subtitle">Settings</div>
      <div className="settings__description">
        Configure repository connection and synchronization settings.
      </div>

      <form
        className="settings__form"
        onSubmit={(event) => onSubmit(event, state, dispatch, history)}
      >
        {state.submitFailed && (
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
            value={state.repo}
            onChange={(value) => dispatch(actionCreators.setRepo(value))}
          />
        </FormGroup>

        <FormGroup title="Build command" isRequired>
          <Input
            name="command"
            required
            placeholder="yarn start"
            withClearButton
            value={state.command}
            onChange={(value) => dispatch(actionCreators.setCommand(value))}
          />
        </FormGroup>

        <FormGroup title="Main branch">
          <Input
            name="branch"
            placeholder="master"
            withClearButton
            value={state.branch}
            onChange={(value) => dispatch(actionCreators.setBranch(value))}
          />
        </FormGroup>

        <FormGroup>
          <div className="inline-input">
            <div>Synchronize every</div>
            <Input
              name="sync"
              normalize={(value) => value?.replace(/[^\d.-]/g, "")}
              size={3}
              value={state.sync}
              onChange={(value) => dispatch(actionCreators.setSync(value))}
            />
            <div>minutes</div>
          </div>
        </FormGroup>

        <div className="settings__buttons">
          <Button type="submit" fetching={state.submitting}>
            Save
          </Button>
          <Link to="/">
            <Button
              appearance="secondary"
              className="settings__button--fullwidth"
              disabled={state.submitting}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Settings;
