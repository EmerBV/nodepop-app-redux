import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import configureStore from "./store";
import Root from "./components/Root";

const accessToken = storage.get("auth");
setAuthorizationHeader(accessToken);

const history = createBrowserHistory();
const store = configureStore({ auth: !!accessToken }, { history });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App isInitiallyLogged={!!accessToken} />
    </Root>
  </React.StrictMode>
);
