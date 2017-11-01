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

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      username: "",
      notifications: ""
    };
  }

  componentWillMount() {
    this.askName();
  }

  askName = () => {
    let name = prompt("What's your name");
    this.setState({ username: name });

    if (name !== null) {
      database
        .ref(`/${this.props.path}/notifications`)
        .set(`${name} has entered the chat`);
    }
  };

  sendMessage = event => {
    console.log("this notif", this.state.notifications);
    event.preventDefault();
    database
      .ref(`/${this.props.path}/messages`)
      .push()
      .set({
        name: this.state.username,
        message: this.input.value
      });
    this.input.value = "";
  };

  displayMessage = data => {
    return (
      <div>
        <strong>{data.name} : </strong> {data.message}
      </div>
    );
  };

  componentDidMount() {
    // update the states for the messages and username based on value from database
    database.ref(`/${this.props.path}/messages`).on("child_added", data => {
      let items = data.val();
      this.setState(st => ({ messages: st.messages.concat([items]) }));

      let ref = firebase.database().ref(`/${this.props.path}/notifications`);
      ref.onDisconnect().set(`${this.state.username} has left the chat`);
    });

    database.ref(`/${this.props.path}/notifications`).on("value", data => {
      let value = data.val();
      this.setState({ notifications: value });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendMessage} action="submit">
          <input type="text" ref={node => (this.input = node)} />
          <input type="submit" />
        </form>
        <div className="chat">
          {this.state.messages.map(this.displayMessage)}
        </div>
        <div className="notifications">{this.state.notifications}</div>
      </div>
    );
  }
}

export default Chat;
