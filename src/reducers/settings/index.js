const actions = {
  submitStarted: "submit_started",
  submitSucceeded: "submit_succeeded",
  submitFailed: "submit_failed",
  clearErrors: "clear_errors",
};

export const actionCreators = {
  submitStarted: () => ({ type: actions.submitStarted }),
  submitSucceeded: (payload) => ({ type: actions.submitSucceeded, payload }),
  submitFailed: () => ({ type: actions.submitFailed }),
  clearErrors: () => ({ type: actions.clearErrors }),
};

export const saveSettings = (settings) => (dispatch) =>
  new Promise((res, rej) => {
    dispatch(actionCreators.submitStarted());

    setTimeout(() => {
      if (settings.command === "error") {
        dispatch(actionCreators.submitFailed());
        rej();

        return;
      }

      res(settings);
      dispatch(actionCreators.submitSucceeded(settings));
    }, 1000);
  });

const initialState = {
  repo: "",
  command: "",
  branch: "",
  sync: "",
  submitting: false,
  submitFailed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.submitStarted:
      return { ...state, submitting: true };

    case actions.submitSucceeded:
      return {
        ...state,
        ...action.payload,
        submitting: false,
        submitFailed: false,
      };

    case actions.submitFailed:
      return {
        ...state,
        submitting: false,
        submitFailed: true,
      };

    case actions.clearErrors:
      return {
        ...state,
        submitFailed: false,
      };

    default:
      return state;
  }
};

export default reducer;
