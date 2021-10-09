const LS_KEYS = {
  repo: "repo",
  command: "command",
  branch: "branch",
  sync: "sync",
};

const actions = {
  setRepo: "set_repo",
  setCommand: "set_command",
  setBranch: "set_branch",
  setSync: "set_sync",
  submitStarted: "submit_started",
  submitSucceeded: "submit_succeeded",
  submitFailed: "submit_failed",
};

export const actionCreators = {
  setRepo: (payload) => ({ type: actions.setRepo, payload }),
  setCommand: (payload) => ({ type: actions.setCommand, payload }),
  setBranch: (payload) => ({ type: actions.setBranch, payload }),
  setSync: (payload) => ({ type: actions.setSync, payload }),
  submitStarted: () => ({ type: actions.submitStarted }),
  submitSucceeded: () => ({ type: actions.submitSucceeded }),
  submitFailed: () => ({ type: actions.submitFailed }),
};

export const getStateFromLocalStorage = () => ({
  repo: localStorage.getItem(LS_KEYS["repo"]) || "",
  command: localStorage.getItem(LS_KEYS["command"]) || "",
  branch: localStorage.getItem(LS_KEYS["branch"]) || "",
  sync: localStorage.getItem(LS_KEYS["sync"]) || "",
  submitting: false,
  submitFailed: false,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setRepo:
      return { ...state, repo: action.payload };
    case actions.setCommand:
      return { ...state, command: action.payload };
    case actions.setBranch:
      return { ...state, branch: action.payload };
    case actions.setSync:
      return { ...state, sync: action.payload };
    case actions.submitStarted:
      return { ...state, submitting: true };
    case actions.submitSucceeded:
      return { ...state, submitting: false, submitFailed: false };
    case actions.submitFailed:
      return { ...state, submitting: false, submitFailed: true };
    default:
      return state;
  }
};
