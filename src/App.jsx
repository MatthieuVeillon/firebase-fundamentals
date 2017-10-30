import React, { Component } from "react";
import "./App.css";
const firebase = require("firebase");

// Initialize Firebase
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

var r = database.ref("/push/test2");
for (var i = 0; i < 10; i++) {
  r.push().set(i * 2);
}
setTimeout(() => r.once("value").then(x => console.log(x.val()), 1000)); //wait for the DB to digest

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
