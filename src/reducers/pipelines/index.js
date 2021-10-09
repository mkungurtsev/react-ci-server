import {
  generatePipelines,
  generatePipeline,
} from "../../utils/piplineGenerator";

const actions = {
  fetchMoreStarted: "fetch_more_started",
  fetchMoreSucceeded: "fetch_more_succeeded",
  addPipelineStarted: "add_pipeline_started",
  addPipelineSucceeded: "add_pipeline_succeeded",
};

export const actionCreators = {
  fetchMoreStarted: () => ({ type: actions.fetchMoreStarted }),
  fetchMoreSucceeded: (payload) => ({
    type: actions.fetchMoreSucceeded,
    payload,
  }),
  addPipelineStarted: () => ({ type: actions.addPipelineStarted }),
  addPipelineSucceeded: (payload) => ({
    type: actions.addPipelineSucceeded,
    payload,
  }),
};

export const fetchMore = (num, startsFrom) => (dispatch) =>
  new Promise((res, rej) => {
    dispatch(actionCreators.fetchMoreStarted());
    const pipelines = generatePipelines(5, startsFrom);

    setTimeout(() => {
      res();
      dispatch(actionCreators.fetchMoreSucceeded(pipelines));
    }, 1000);
  });

export const addPipeline = (pipeline) => (dispatch) =>
  new Promise((res, rej) => {
    dispatch(actionCreators.addPipelineStarted());
    const newPipeline = generatePipeline(pipeline);

    setTimeout(() => {
      res(pipeline);
      dispatch(actionCreators.addPipelineSucceeded(newPipeline));
    }, 1000);
  });

const initialState = {
  items: generatePipelines(5),
  fetchingMore: false,
  fetchingCreation: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.fetchMoreStarted:
      return { ...state, fetchingMore: true };
    case actions.fetchMoreSucceeded:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        fetchingMore: false,
      };

    case actions.addPipelineStarted:
      return { ...state, fetchingCreation: true };
    case actions.addPipelineSucceeded:
      return {
        ...state,
        fetchingCreation: false,
        items: [action.payload, ...state.items],
      };

    default:
      return state;
  }
};

export default reducer;
