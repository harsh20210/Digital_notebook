import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { taskManagerStorage } from "./reducer";

const rootReducer = combineReducers({
  data: taskManagerStorage,
});

// for development
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

//for production
// export const store = createStore(rootReducer, applyMiddleware(thunk));
