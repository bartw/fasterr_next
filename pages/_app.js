import React from "react";
import Auth, { AuthContext } from "../auth";
import NextApp from "next/app";
import "../css/tailwind.css";

class App extends NextApp {
  constructor(props) {
    super(props);

    this.auth = new Auth();

    this.state = { initialized: false };
  }

  componentDidMount() {
    this.auth.initialize().finally(() => {
      this.setState({ initialized: true });
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    const { initialized } = this.state;

    return (
      initialized && (
        <AuthContext.Provider value={this.auth}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      )
    );
  }
}

export default App;
