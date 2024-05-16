import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Option1 } from "./components/Option1";
import { Option2 } from "./components/Option2";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-20">
      <Option1 />
      <Option2 />
    </div>
  );
}

export default App;
