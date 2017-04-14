import React from 'react'
import ReactBootstrap from 'react-bootstrap'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Label from 'react-bootstrap/lib/Label'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

import FormControl from 'react-bootstrap/lib/FormControl'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
// import Button from 'react-bootstrap/lib/Button'
import { Button, Row } from 'react-materialize'
import Col from 'react-bootstrap/lib/Col'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import NavLink from './NavLink'

import {addEventToCartAsync , addTotalToCheckOutAsync} from '../store/actions'

import axios from 'axios'

import {
	ShareButtons,
	ShareCounts,
	generateShareIcon
} from 'react-share'
const {
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	VKShareButton,
	OKShareButton
} = ShareButtons;
const TwitterIcon = generateShareIcon('twitter');
const FacebookIcon = generateShareIcon('facebook');
const LinkedinIcon = generateShareIcon('linkedin');


class Calendar extends React.Component {
		constructor(props){
			super()
			this.state = {cart: {}, open :false}
			this.Amount = 0
            this.subTotal = 0

           
	    }
handleChangeStudentsNumber(event){
			const updatedStudentsNumber = Object.assign(
				{},
				this.state.number,
				{number: event.target.value})
			this.setState({number: updatedStudentsNumber})
			
}

handleAddToCart(event){
		console.log("-- this.state--", this.state.number)
		console.log("--event.target--",event)
		var data = {}
		data.number = this.state.number 
		data.event = event
	    
		this.props.addEventToCartAsync(data, ()=>{
			this.setState({ open: !this.state.open })
			console.log('event added to cart!!!!')
		})
        this.pricetotal = event.price
		this.no = this.state.number 
        this.Amount = this.Amount + this.pricetotal * this.no.number + (this.pricetotal * this.no.number) * 0.21
	    this.subTotal = this.subTotal + this.pricetotal * this.no.number
	    console.log(this.pricetotal * this.no.number)	
		
}

handleCheckOut(event){
    	var data = {}
		
	    data.Total = this.Amount
	    data.subTotal = this.subTotal
	    console.log("++++++++Total++++++++", this.Amount, "++++++Subtotal+++++++", this.subTotal)
    	this.props.addTotalToCheckOutAsync(data, ()=>{console.log('checkout total added!!!!')})
    }

	render() {
		 // These two lines are to sort date
			this.props.events.sort(function(a,b) { 
				return new Date(a.startDate).getTime() - new Date(b.startDate).getTime() 
			});
    const shareUrl = 'http://www.google.com';
    const title = 'Built with react';
		return (
			<div>
		<div className='pageTitle'>
    	<h3>Calendar</h3>
    	</div>
			<div className="content">
				<Accordion>
					{this.props.events.map( (event, i) => { if (new Date(event.startDate).getTime() > new Date().getTime()){
						
                            return(
								<Panel header={<div>{event.startDate} – {event.endDate}<h2>{event.title}: <small>{event.subtitle}</small></h2><div>{event.startTime} : {event.endTime}</div></div>} eventKey={i} key={i}>
								<div>
								<div><img className="eventImage" src={event.image}/></div>
								<div><span><strong>Type: </strong></span>{event.eventType}</div>
								<div><span><strong>Duration: </strong></span>{event.eventType2}</div>
								<div></div>
								<div><span><strong>Details: </strong></span>{event.details}</div>
								<div><strong>Location: </strong><address><strong>BCS</strong><br/>{event.location}<br/><abbr title="Phone">P:</abbr>(+34) 666-13-13</address></div>
								<div><span><strong>Price: </strong></span>{event.price}</div>
								<div><span><strong>Organizer: </strong></span>{event.organizer}</div>
									<div>
								
								<input type="number" placeholder = "Enter Quantity" name="studentsNumber" onChange={this.handleChangeStudentsNumber.bind(this)}></input>
								{/*<Button type="button" onClick={this.handleAddToCart.bind(this, event)}>Add to cart</Button>*/}
									</div>
									<Button type="button" className="grey" onClick={ this.handleAddToCart.bind(this, event)}>
									Add to cart
									</Button>
									<p/>
									<div className="social_share_container">
										<TwitterShareButton
										url={shareUrl}
										title={title}
										className="social_share_buttons">
										<TwitterIcon
										size={26}
										round />
										</TwitterShareButton>
										<FacebookShareButton
										url={shareUrl}
										title={title}
										className="social_share_buttons">
										<FacebookIcon
										size={26}
										round />
										</FacebookShareButton>
										<LinkedinShareButton
										url={shareUrl}
										title={title}
										className="social_share_buttons">
										<LinkedinIcon
										size={26}
										round />
										</LinkedinShareButton>
									</div>
									<Panel collapsible expanded={this.state.open}>
									<p>The event has been added to cart.</p>
									<NavLink to="/checkout"><Button className="grey" style={{marginRight: '1em'}} onClick = {this.handleCheckOut.bind(this,event)}>Checkout</Button></NavLink>
									<NavLink to="/cart"><Button className="grey">View cart</Button></NavLink>
									</Panel>
									</div>
								</Panel>
							)
					}}
					)}
				</Accordion>
              </div>
            </div>
		)
	}
}

const mapStateToProps = (state) => ({events: state.EventData ,cartObj: state.CartData}) // getting info from the store
const mapDispatchToProps = (dispatch) => bindActionCreators({addEventToCartAsync , addTotalToCheckOutAsync}, dispatch) // sending info to the store
export default connect(mapStateToProps, mapDispatchToProps)(Calendar) // we connect both things from above
    
