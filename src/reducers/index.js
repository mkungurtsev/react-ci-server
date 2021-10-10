import { combineReducers } from "redux";
import settings from "./settings";
import pipelines from "./pipelines";

const rootReducer = combineReducers({ settings, pipelines });

export default rootReducer;
