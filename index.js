import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import store from './store/index'
import App from './modules/App'
import About from './modules/About'
import Contacts from './modules/Contacts'
import Calendar from './modules/Calendar'
import Admin from './modules/Admin'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import Cart from './modules/Cart'
import Checkout from './modules/Checkout'
render((
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/repos" component={Repos}>
          <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/calendar" component={Calendar}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/checkout" component={Checkout}/>
    	  <Route path="/contacts" component={Contacts}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
