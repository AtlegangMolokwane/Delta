import React from "react";
import "./App.css";
import Games from "./Games";
import Header from "./Header";
import Deals from "./Deals";
import Store from "./Store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends React.Component {

  render() {
    
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/">
                <Deals />
              </Route>
              <Route path="/store">
                <Store />
              </Route>
              <Route exact path="/games">
                <Games />
              </Route>
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
