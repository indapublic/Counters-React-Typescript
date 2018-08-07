import { History } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";

import rootReducer from "../reducers/";

export default function configureStore(initialState: object, history: History) {
  const historyMiddleware = routerMiddleware(history);
  const middlewares = [thunk, createLogger(), historyMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState, enhancer);
  if ((module as any).hot) {
    (module as any).hot.accept("../reducers", () => {
      store.replaceReducer(require("../reducers"));
    });
  }
  return store;
}
