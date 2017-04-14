import React from 'react'
import ReactBootstrap from 'react-bootstrap'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import Alert from 'react-bootstrap/lib/Alert'

import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import Button from 'react-bootstrap/lib/Button'
import { Button, Row } from 'react-materialize'
import Col from 'react-bootstrap/lib/Col'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'

import axios from 'axios'

import store from '../store/index'
import {addEvent, addEventAsync, updateEventAsync, deleteEventAsync} from '../store/actions'


// const FormGroup = ReactBootstrap.FormGroup
// const ControlLabel = ReactBootstrap.ControlLabel
// const FormControl = ReactBootstrap.FormControl
// const HelpBlock = ReactBootstrap.HelpBlock

class Admin extends React.Component {

	constructor() {
		super()
		this.state = {event: {}}
	}
// should send axios.get("/events")
// should recieve an object with all events from db
	componentWillReceiveProps(){
		this.setState({visibleEvent: undefined})
	}

	handleSelectEvent(event){
    	// var eventTitle =  event.target.value
    	const eventTitle = event.target.value
    	for (let i in this.props.events) {
    		const event = this.props.events[i]
    		if (event.title === eventTitle) this.setState({visibleEvent: i })
    	}    	
	}

	handleSubmit (event) {
		event.preventDefault()
		var data = {}
		for(let input of event.target.elements){
			const name = input.getAttribute('name') 
			if (name) data[name] = input.value
		}
		this.props.addEventAsync(data, ()=>{console.log('event added!!!!' , data)})
	}

	render() {
		return (
			<div>
			<div className='pageTitle'>
	    	<h3>Admin area</h3>
	    	</div>			
			<div className = 'row content'>
			<div className = "col-md-12">
			<Accordion>
			<Panel header="Add new event">
			<div>
			<form onSubmit={this.handleSubmit.bind(this)}>
			<FormGroup controlId="formControlsTitle">
			Event title
			<FormControl type="text" name="title" placeholder="Event title" />
			</FormGroup>

			<FormGroup controlId="formControlsSubtitle">
			Event subtitle
			<FormControl type="text" name="subtitle" placeholder="Event subtitle" />
			</FormGroup>

			<FormGroup controlId="formControlsStartdate">
			Event start date
			<FormControl type="date" name="startDate" placeholder="Event start date" />
			</FormGroup>

			<FormGroup controlId="formControlsStarttime">
			Event start time
			<FormControl type="time" name="startTime" placeholder="Event start time" />
			</FormGroup>

			<FormGroup controlId="formControlsStarttime">
			Event end date
			<FormControl type="date" name="endDate" placeholder="Event end date" />
			</FormGroup>

			<FormGroup controlId="formControlsStarttime">
			Event end time
			<FormControl type="time" name="endTime" placeholder="Event end time" />
			</FormGroup>

			<FormGroup controlId="formControlsEventtype">
			Event type (topics)
			<FormControl type="text" name="eventType" placeholder="Event type" />
			</FormGroup>

			<FormGroup controlId="formControlsEventtype2">
			Event type2 (duration)
			<FormControl type="text" name="eventType2" placeholder="Event type (duration)" />
			</FormGroup>

			<FormGroup controlId="formControlsEventimage">
			Event image (a link)
			<FormControl type="text" name="image" placeholder="Event image" />
			</FormGroup>

			<FormGroup controlId="formControlsDetails">
			<ControlLabel>Event details</ControlLabel>
			<FormControl componentClass="textarea" name="details" placeholder="Event details" />
			</FormGroup>

			<FormGroup controlId="formControlsLocation">
			Event location
			<FormControl type="text" name="location" placeholder="Event location" />
			</FormGroup>

			<FormGroup controlId="formControlsPrice">
			Event price
			<FormControl type="number" name="price" placeholder="Event price" />
			</FormGroup>    

			<FormGroup controlId="formControlsOrganizer">
			Event organizer
			<FormControl type="text" name="organizer" placeholder="Event organizer" />
			</FormGroup>             
			<Button className="grey" type="submit">Submit</Button>
			</form>
			</div>
			</Panel>
			</Accordion>

			<Accordion>
			<Panel header="Update existing event">
			<form >
			<FormGroup controlId="formControlsSelect">
			<ControlLabel>Select event to update </ControlLabel>
			<FormControl componentClass="select" placeholder="Select event" onChange= {this.handleSelectEvent.bind(this)} >
			<option value="select" >Select the event</option>
			{this.props.events.map( (event, i) => {
				console.log(event)
				return(
					<option key={i} value={event.title}>{event.title}</option>
					)
			})
		}
		</FormControl>
		</FormGroup>
		</form>
			<UpdateEventForm visibleEvent = {this.state.visibleEvent} events = {this.props.events} updateEventAsync = {this.props.updateEventAsync} deleteEventAsync = {this.props.deleteEventAsync}/>	
		</Panel>
		</Accordion>
		</div>
		</div>
		</div>
		)}

	}

	class UpdateEventForm extends React.Component{
		constructor(props){
			super()
			this.state = {event: {}}
		}

		componentWillReceiveProps(newProps) {
			if (newProps.visibleEvent !== undefined) {
				this.setState({event: newProps.events[newProps.visibleEvent]})
			} else {
				this.setState({event: {}})
			}
			console.log("new props",newProps)
		}

		handleChange(event){
			const updatedEvent = Object.assign(
				{},
				this.state.event,
				{[event.target.name]: event.target.value})
			this.setState({event: updatedEvent})
			console.log(this.state.event)
		}
		handleUpdate(event){
				
			event.preventDefault()
			this.props.updateEventAsync(this.state, ()=>{console.log('event updated!!!!')})
		}

		handleRemove(event){
			var str = new String("Are you sure?");
            alert(str);
			event.preventDefault()
			console.log("Hey am in handleDelete", this.state)
			this.props.deleteEventAsync(this.state, ()=>{
				console.log('event deleted!!!!',this.state)
			
			})			
		}


		render(){
			return(

				<form onSubmit={this.handleUpdate.bind(this)}>
				<FormGroup controlId="formControlsTitle">
				Event title
				<FormControl type="text" name="title" placeholder="Event title" onChange = {this.handleChange.bind(this)} value={this.state.event.title || ""} />
				</FormGroup>

				<FormGroup controlId="formControlsSubtitle">
				Event subtitle
				<FormControl type="text" name="subtitle" placeholder="Event subtitle" onChange = {this.handleChange.bind(this)} value={this.state.event.subtitle || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsStartdate">
				Event start date
				<FormControl type="date" name="startDate" placeholder="Event start date" onChange = {this.handleChange.bind(this)}  value={this.state.event.startDate || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsStarttime">
				Event start time
				<FormControl type="time" name="startTime" placeholder="Event start time" onChange = {this.handleChange.bind(this)} value={this.state.event.startTime || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsStarttime">
				Event end date
				<FormControl type="date" name="endDate" placeholder="Event end date" onChange = {this.handleChange.bind(this)} value={this.state.event.endDate || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsStarttime">
				Event end time
				<FormControl type="time" name="endTime" placeholder="Event end time" onChange = {this.handleChange.bind(this)} value={this.state.event.endTime || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsEventtype">
				Event type (topics)
				<FormControl type="text" name="eventType" placeholder="Event type" onChange = {this.handleChange.bind(this)} value={this.state.event.eventType || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsEventtype2">
				Event type2 (duration)
				<FormControl type="text" name="eventType2" placeholder="Event type (duration)" onChange = {this.handleChange.bind(this)} value={this.state.event.eventType2 || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsEventimage">
				Event image (a link)
				<FormControl type="text" name="image" placeholder="Event image" onChange = {this.handleChange.bind(this)} value={this.state.event.image || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsDetails">
				<ControlLabel>Event details</ControlLabel>
				<FormControl componentClass="textarea" name="details" placeholder="Event details" onChange = {this.handleChange.bind(this)} value={this.state.event.details || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsLocation">
				Event location
				<FormControl type="text" name="location" placeholder="Event location" onChange = {this.handleChange.bind(this)} value={this.state.event.location || ""}/>
				</FormGroup>

				<FormGroup controlId="formControlsPrice">
				Event price
				<FormControl type="number" name="price" placeholder="Event price" onChange = {this.handleChange.bind(this)} value={this.state.event.price || ""}/>
				</FormGroup>    

				<FormGroup controlId="formControlsOrganizer">
				Event organizer
				<FormControl type="text" name="organizer" placeholder="Event organizer" onChange = {this.handleChange.bind(this)} value={this.state.event.organizer || ""}/>
				</FormGroup>             
				<Button className="grey" style={{marginRight:'1em'}} type="submit">Save changes</Button>
				<Button className="grey" type="button" onClick={this.handleRemove.bind(this)}>Delete event</Button>

				
				</form>
				)}
		}


const mapStateToProps = (state) => ({events: state.EventData})
const mapDispatchToProps = (dispatch) => bindActionCreators({addEventAsync, updateEventAsync, deleteEventAsync}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
