import React, { Component } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Token from "./pages/Token";
import Description from "./pages/Description";
import Register from "./pages/Register";
import Manage from "./pages/Manage";
import History from "./pages/History";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/token" component={Token} />
                <Route path="/description/:id/:books" component={Description} />
                <Route path="/register" component={Register} />
                <Route path="/manage" component={Manage} />
                <Route path="/history" component={History} />
              </Switch>
            </Router>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;
