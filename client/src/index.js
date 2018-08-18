import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import {BrowserRouter, Switch} from 'react-router-dom';
import rootReducer from "./redux/store";
import "./App.css";
import "./css/index.css";
import App from "./App";
// import registerServiceWorker from "./redux/store";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [reduxThunk];
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
// registerServiceWorker();
