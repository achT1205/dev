import { createStore, applyMiddleware, compose} from "redux";
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk"; // for async call 
import DevTools from '../DevTools';

const middleware = [];
middleware.push(createLogger());
middleware.push(reduxImmutableStateInvariant());

const enhancer = compose(
  persistState(getDebugSessionKey()),
  DevTools.instrument()
);
function getDebugSessionKey () {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, ...middleware, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : enhancer)
  );
}