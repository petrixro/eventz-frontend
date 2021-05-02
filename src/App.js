import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Events from "./components/Events";
import NavbarComponent from "./components/Navbar";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/events" exact component={Events} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/myprofile" exact component={UserProfile} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
