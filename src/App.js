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
        <Route exact path="/" render={(props) => <LandingPage />} />
        <Route path="/start" render={(props) => <StartPage />} />
        <Route path="/edit" render={(props) => <EditPage />} />
        <Route exact path="/sign-in" render={(props) => <SignIn />} />
        <Route exact path="/sign-up" render={(props) => <SignUp />} />
      </Switch>
    </Router>
  );
}

export default App;
