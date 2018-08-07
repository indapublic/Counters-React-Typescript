import { combineReducers } from "redux";

import main from "./main";

import { IState as IMainState } from "./main";

export interface IRootState {
  main: IMainState;
}

export default combineReducers({
  main
});
