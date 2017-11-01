import React, { Component } from "react";
import "./App.css";
import Chat from "./chat.jsx";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Vintage Chat</h1>
        <Chat path="messagedb1" />
        {/* <Chat path="messagedb2" /> */}
      </div>
    );
  }
}

export default App;
