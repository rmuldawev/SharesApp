import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./screens/Home/HomePage";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="mainContainer">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
