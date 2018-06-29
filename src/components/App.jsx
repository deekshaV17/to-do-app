import React from "react";
import Routes from "../routes/Routes";

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "../styles/App.scss";

const App = () => (
  <Provider template={AlertTemplate}>
    <div className="todoContainer">
      <Routes />
    </div>
  </Provider>
);


export default App;
