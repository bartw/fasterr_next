import Amplify, { Hub } from "@aws-amplify/core";
import AmplifyAuth from "@aws-amplify/auth";

let callbacks = [];
let isAuthenticated = false;

const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const fireCallbacks = () =>
  callbacks.forEach((cb) => cb.callback(isAuthenticated));

class Auth {
  constructor() {
    Amplify.configure({
      Auth: {
        region: process.env.REGION,
        userPoolId: process.env.USER_POOL_ID,
        userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
      },
    });

    const listener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          isAuthenticated = true;
          fireCallbacks();
          break;
        case "signOut":
          isAuthenticated = false;
          fireCallbacks();
          break;
        case "signIn_failure":
        case "signUp_failure":
        case "configured":
          break;
        default:
          console.log("unhandled auth event:", data.payload.event);
      }
    };

    Hub.listen("auth", listener);
  }

  initialize() {
    return AmplifyAuth.currentSession()
      .then(() => {
        isAuthenticated = true;
        fireCallbacks();
      })
      .catch(() => {
        isAuthenticated = false;
        fireCallbacks();
      });
  }

  isAuthenticated() {
    return isAuthenticated;
  }

  onAuthStateChanged(callback) {
    const id = uuid();
    callbacks = [...callbacks, { id, callback }];
    return () => {
      callbacks = callbacks.filter((cb) => id !== cb.id);
    };
  }

  token() {
    return AmplifyAuth.currentSession()
      .then((session) => session.getIdToken())
      .then((accessToken) => accessToken.getJwtToken())
      .catch(() => null);
  }

  signUp({ email, password }) {
    return AmplifyAuth.signUp({
      username: email,
      password,
      attributes: { email },
    }).then(() => {});
  }

  confirmSignUp({ email, confirmationCode }) {
    return AmplifyAuth.confirmSignUp(email, confirmationCode).then(() => {});
  }

  resendConfirmationCode({ email }) {
    return AmplifyAuth.resendSignUp(email).then(() => {});
  }

  signIn({ email, password }) {
    return AmplifyAuth.signIn(email, password).then(() => {});
  }

  signOut() {
    AmplifyAuth.signOut();
  }
}

export default Auth;
