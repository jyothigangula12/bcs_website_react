import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import { Button, Row } from 'react-materialize'

import axios from 'axios'



// const FormGroup = ReactBootstrap.FormGroup
// const ControlLabel = ReactBootstrap.ControlLabel
// const FormControl = ReactBootstrap.FormControl
// const HelpBlock = ReactBootstrap.HelpBlock

class Contacts extends React.Component {

	handleSubmit (event) {
		event.preventDefault()
		const nameInput = event.target.elements.name
		const emailInput = event.target.elements.email
		const messageInput = event.target.elements.message
		var data = {name: nameInput.value, email: emailInput.value, message: messageInput.value}
		// console.log("--data--", name: event.target.elements.name.value, event.target.elements.email.value, event.target.elements.message.value)
		axios.post('/sendEmail', data)
			.then((response) => {
				nameInput.value = ""
				emailInput.value = ""
				messageInput.value = ""
				alert("Your message has been sent, thanks!")
			})
		console.log("--SeNd!--")
	}

	render() {
		return (
			<div>
			<div className='pageTitle'>
			<h3>Contact us</h3>
			</div>
			<div className="content">
			<div className="row">
			<form onSubmit={this.handleSubmit.bind(this)} className="col s12">

				<div className="row">
				<div className="input-field col s12" >
						<FormGroup controlId="formControlsName">
						Your name				
						<FormControl type="text" name="name" placeholder="Your name" />
						</FormGroup>
				</div>
				</div>

<div className="row">
<div className="input-field col s12">
				<FormGroup controlId="formControlsEmail">
				Email
				<FormControl type="email" name="email" placeholder="Your Email" />
				</FormGroup>
</div>
</div>




      <div className="row">
        <div className="input-field col s12">


          <FormGroup controlId="formControlsMessage">
				Your message
				<FormControl className="materialize-textarea" componentClass="textarea" name="message" placeholder="Type your message" />
				</FormGroup>
</div>
  </div>


<div className="row">
<div className="input-field col s12">
				<Button type="submit" className="grey">Submit</Button>
</div>
</div>				

				
			</form>
			</div>
			</div>
			</div>
		)
	}
}

export default Contacts
    
