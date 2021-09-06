import React from "react";
import "./App.css";
import Games from "../Game/Games";
import Header from "../Header/Header";
import Deals from "../Deals/Deals";
import Store from "../Store/Store";
import MoreDeals from "../MoreDeals/MoreDeals";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

class App extends React.Component {
  history = createBrowserHistory();
  render() {
    return (
      <div className="container">
        <Router history={this.history}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/Deals">
                <Deals />
              </Route>
              <Route path="/store">
                <Store />
              </Route>
              <Route exact path="/games">
                <Games />
              </Route>
              <Route
                exact
                path="/Deals/:dealID"
                render={(props) => (
                  <MoreDeals {...props} dealID={props.match.params.dealID} />
                )}
              />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
