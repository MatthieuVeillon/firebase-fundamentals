import React, { Component } from "react";
import "./App.css";

const firebase = require("firebase");
const config = {
  apiKey: "AIzaSyDYTb0anggV7RGEKfbwlFcaZ2LLCkuzz24",
  authDomain: "fir-fundamentals-5da3d.firebaseapp.com",
  databaseURL: "https://fir-fundamentals-5da3d.firebaseio.com",
  projectId: "fir-fundamentals-5da3d",
  storageBucket: "fir-fundamentals-5da3d.appspot.com",
  messagingSenderId: "936198909818"
};

firebase.initializeApp(config);

const database = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  saveOnClick = () => {
    database.ref("/name").set(this.input.value);
  };

  componentDidMount = () => {
    database
      .ref("/name")
      .once("value")
      .then(data => {
        console.log(data);
        this.setState({ message: data.val() });
        console.log(this.state);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <input type="text" ref={node => (this.input = node)} />
        <button onClick={this.saveOnClick}>Save</button>
      </div>
    );
  }
}

export default App;
