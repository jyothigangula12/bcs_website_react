import React from 'react'
import NavLink from './NavLink'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import store from '../store/index'
//import addEvent from '../store/actions'
import {Nav, Navbar, NavItem, NavDropdown, Button, MenuItem,Glyphicon} from "react-bootstrap"
// import injectTapEventPlugin from 'react-tap-event-plugin'
import {browserHistory} from 'react-router'


import materialize from 'materialize-css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import { Button, Row, Col, Icon } from 'react-materialize';


class AppNavbar extends React.Component {

  handleSelect(event) {
    browserHistory.push("/"+event)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>

          <div id="topBar">
            <a href="tel:+666 13 13 13">Tel: 666 13 13 13</a> |
            <NavLink to="/contacts"> email@email.com</NavLink>
            <span> |
              <a href="https://www.facebook.com/BarcelonaCodingSchool/"><i className="fa fa-facebook" aria-hidden="true"></i></a> |
              <a href="http://www.twitter.com/gk3000"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            </span>
            <span id="cartTopIcon">
              <NavLink to="/cart">
                <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
              </NavLink>
              {" "}
            </span>
          </div>
          <div className="nav" style={{"zIndex": 1000, position: "relative"}}>
            <div id='desktopMenu' className='hide-on-med-and-down'>
            <NavLink to="/" onlyActiveOnIndex className="brand-logo">
                    <img src='https://i1.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/03/barcelona-code-school-logo-200.png'/>
            </NavLink>

            <ul id="nav-desktop" className="right">
              <li><NavLink to="/calendar">Calendar</NavLink></li>          
              <li><NavLink to="/contacts">Contact us</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/admin">Admin page</NavLink></li>
            </ul>
            </div>

            <div id='mobileMenu' className='hide-on-large-only show-on-med-and-down'>
              <NavLink to="/" onlyActiveOnIndex className="brand-logo left">
                <img src='https://i1.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/03/barcelona-code-school-logo-200.png'/>
              </NavLink>
            <Nav
              bsStyle="tabs"
              activeKey="1"
              className="right "
              onSelect={this.handleSelect.bind(this)}>
              <NavDropdown pullRight eventKey="1" title={<Glyphicon glyph="glyphicon glyphicon-menu-hamburger" />} id="nav-dropdown">
                <MenuItem eventKey="calendar">Calendar</MenuItem>
                <MenuItem eventKey="contacts">Contact us</MenuItem>
                <MenuItem eventKey="about">About</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="admin">Admin Page</MenuItem>
              </NavDropdown>
            </Nav>
            </div>
          </div>
          <div style={{"zIndex": 0}}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default AppNavbar

/*<PageHeader>A new website <small>Built with React, yo!</small></PageHeader>*/

/* main nav bar*/
/*
<nav>
            
              <NavLink to="/" onlyActiveOnIndex className="brand-logo">
                <img src='https://i1.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/03/barcelona-code-school-logo-200.png'/></NavLink>
              <ul id="nav-mobile" className="right hide-on-med-and-down ">
              <li><NavLink to="/calendar">Calendar</NavLink></li>          
              <li><NavLink to="/contacts">Contact us</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/checkout">Checkout</NavLink></li>
              <li><NavLink to="/admin">Admin page</NavLink></li>
              </ul>


              <NavDropdown title="Menu" id="nav-dropdown" className="left hide-on-large-only show-on-med-and-down">
                <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
              </NavDropdown>
          </nav>

old nav bar
        <Nav bsStyle="tabs" >
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/calendar">Calendar</NavLink></li>          
          <li><NavLink to="/contacts">Contact us</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          {/*<li><NavLink to="/checkout">Checkout</NavLink></li>
          <li><NavLink to="/admin">Admin page</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
      </Nav>
    */
/*   <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
          <NavLink to="/" onlyActiveOnIndex className="brand-logo"><img src='https://i1.wp.com/www.barcelonacodeschool.com/wp-content/uploads/2016/03/barcelona-code-school-logo-200.png'/></NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
          <li><NavLink to="/calendar">Calendar</NavLink></li>          
          <li><NavLink to="/contacts">Contact us</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/checkout">Checkout</NavLink></li>
          <li><NavLink to="/admin">Admin page</NavLink></li>
      </Nav>
    </Navbar.Collapse>
  </Navbar>*/
