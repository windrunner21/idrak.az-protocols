import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/auth/signInPage";
import SignUp from "./pages/auth/signUpPage";
import StartPage from "./pages/home/startPage";
import EditPage from "./pages/home/editPage";
import LandingPage from "./pages/langingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/idrak.az-protocols/"
          render={(props) => <LandingPage />}
        />
        <Route
          path="/idrak.az-protocols/start"
          render={(props) => <StartPage />}
        />
        <Route
          path="/idrak.az-protocols/edit"
          render={(props) => <EditPage />}
        />
        <Route
          exact
          path="/idrak.az-protocols/sign-in"
          render={(props) => <SignIn />}
        />
        <Route
          exact
          path="/idrak.az-protocols/sign-up"
          render={(props) => <SignUp />}
        />
      </Switch>
    </Router>
  );
}

export default App;
