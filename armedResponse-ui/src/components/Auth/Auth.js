import auth0 from "auth0-js";
import global from "../../global";
import history from "../history";
import TokenDecoder from "./jwtHelper";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: global.AUTH0_DOMAIN,
      audience: "https://rethabile.auth0.com/userinfo",
      clientID: global.AUTH0_ARMED_RESPONSE_CLIENT_ID,
      redirectUri: global.CALLBACK,
      responseType: "id_token",
      scope: "openid profile"
    });

    this.setProfile = this.setProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async setProfile(accessToken) {
    await this.auth0.client.userInfo(accessToken, (err, profile) => {
      sessionStorage.setItem("profile", JSON.stringify(profile));
      sessionStorage.setItem(
        "role",
        profile["https://rethabile:auth0:com/roles"]
      );
    });
  }

  getIdToken() {
    if (!this.isAuthenticated()) {
      return false;
    }
    return sessionStorage.getItem("idToken");
  }

  isAuthenticated() {
    // const expiresAt = JSON.parse(sessionStorage.getItem("expires_at"));
    // return new Date().getTime() < expiresAt;
    if (!sessionStorage.getItem("idToken")) {
      return false;
    }
    return TokenDecoder.isTokenExpired(sessionStorage.getItem("idToken"));
  }

  signIn(userName, password) {
    // const { history } = this.props;
    // this.auth0.authorize();
    this.auth0.client.login(
      {
        realm: global.AUTH0_REALM,
        username: userName,
        password: password
      },
      async (error, authResult) => {
        if (error) {
          console.log(error);
          return;
        }
        if (authResult && authResult.idToken && authResult.accessToken) {
          this.setSession(authResult);
          this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            sessionStorage.setItem("profile", JSON.stringify(profile));
            sessionStorage.setItem(
              "role",
              profile["https://rethabile:auth0:com/roles"]
            );
            history.push("/");
          });
        }
      }
    );
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        this.setProfile(authResult.accessToken);
        history.push("/dashboard");
        resolve();
      });
    });
  }

  setSession(authResult) {
    //save to session storage
    sessionStorage.setItem("idToken", authResult.idToken);
    sessionStorage.setItem("accessToken", authResult.accessToken);
    // set the time that the id token will expire at
    sessionStorage.setItem(
      "expiresAt",
      authResult.expiresIn * 1000 + new Date().getTime()
    );
  }
  signOut() {
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("expiresAt");
    sessionStorage.removeItem("profile");
    history.push("/login");
  }
  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
