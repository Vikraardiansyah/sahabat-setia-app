import React, {Component} from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Token from './pages/Token'
import Description from './pages/Description'
import Register from './pages/Register'
import Manage from './pages/Manage'
import History from './pages/History'
import {Provider} from 'react-redux'
import store from './redux/store'
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom"


class App extends Component {


  render(){
    return(
      <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/token" component={Token}/>
            <Route path="/description/:id" component={Description} />
            <Route path="/register" component={Register}/>
            <Route path="/manage" component={Manage}/>
            <Route path="/history" component={History}/>
          </Switch>
        </Router>
      </Provider>
      </>
    )
  }
}

export default App;
