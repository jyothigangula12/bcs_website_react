import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import {ReactScriptLoaderMixin} from 'react-script-loader'
import {FieldGroup, FormGroup, FormControl, ControlLabel, Checkbox, Col , Panel,NavLink} from 'react-bootstrap'
import { Button, Row } from 'react-materialize'
// import stripe from 'stripe'
import {addCustomerDataAsync} from '../store/actions'
import Provider from 'react-redux'
import store from '../store/index'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class GeneralInformation extends React.Component{
	constructor(props){
		super()
		this.state = {customer: {} }

	}

	
    handleChange(event){
			const updatedEvent = Object.assign(
				{},
				this.state.customer,
				{[event.target.name]: event.target.value})
			this.setState({customer: updatedEvent})
			
		}
    handleSubmit(event){
		event.preventDefault()
		var data = {}
		data.customer = this.state.customer
		console.log("+++++++++dat+++++++++++++",data)	
		this.props.addCustomerDataAsync(data, ()=>{console.log('customer info added!!!!')})
		
    }

	// componentWillUpdate(nextProps, nextState){
	// 	console.log("--nextState--", nextState)
	// 	this.props.addCustomerDataAsync(nextState.customer, ()=>{console.log('customer info added!!!!')})
	// }
    
render() {
			console.log("--this.state.customer--", this.state.customer)
return ( 
	<div>
		<div className='pageTitle'>
    	<h3>Checkout</h3>
    	</div>
		<div id="checkoutBilling" className="content">
		<h4>Please fill out your billing details</h4>
			<form onSubmit = {this.handleSubmit.bind(this)}>
				<ControlLabel>Enter your first name</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="firstName"
				placeholder="Enter your first name"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Last name</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="lastName"
				placeholder="Enter your last name"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Your ID</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="idNumber"
				placeholder="Enter your ID document number"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Company name</ControlLabel>
				<FormControl
				id="formControlsEmail"
				type="text"
				name="companyName"
				placeholder="Enter your company name"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Email address</ControlLabel>
				<FormControl
				id="formControlsEmail"
				type="email"
				name="email"
				placeholder="Enter email"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Your phone number</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="phone"
				placeholder="Enter your phone number"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Country</ControlLabel>
				<FormGroup controlId="formControlsSelect">
				<FormControl componentClass="select" name="country" placeholder="select"
				onChange = {this.handleChange.bind(this)}>
				<option value="select">Select your country</option>
				<option value="spain">Spain</option>
				<option value="other">Rest of the world</option>
				</FormControl>
				</FormGroup>
				<ControlLabel>Address</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="address"
				placeholder="Enter your address"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Post code</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="postcode"
				placeholder="Enter your post code"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>City</ControlLabel>
				<FormControl
				id="formControlsText"
				type="text"
				name="city"
				placeholder="Enter your city"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<ControlLabel>Additional information</ControlLabel>
				<FormControl
				id="formControlsText"
				type="textarea"
				name="notes"
				placeholder="If you have any order notes please enter them here"
				onChange = {this.handleChange.bind(this)}>
				</FormControl>
				<p id="agreeTC">
				By clicking the Next button you agree to our terms and conditions
				</p>
				<Button className="grey" type="submit">Next</Button>	
				</form>
		</div>
		</div>
	)
}
}
//const mapStateToProps = (state) => ({cartObj: state.CartData}) // getting info from the store
const mapDispatchToProps = (dispatch) => bindActionCreators({addCustomerDataAsync}, dispatch)
const ConnectedInfoComp = connect(null, mapDispatchToProps)(GeneralInformation) //
//const ConnectedComp = connect(mapStateToProps)(GeneralInformation) // we connect both things from above

class StripePaymentForm extends React.Component{
  constructor(props){
    super(props)
    for (let functionality in ReactScriptLoaderMixin){
      this[functionality] = ReactScriptLoaderMixin[functionality]	
    }
    console.log("========StripePaymentForm========", props.amount[0].Total)
    console.log("========CustomerData========", props.customer)
    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      amount: props.amount[0].Total * 100,
      orderID: null
    }
  }
  

  getScriptURL () {
    return 'https://js.stripe.com/v2/';
  }

  onScriptLoaded() {
    if (!this.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_47IIvaiJ7FanzzHsVr7vaEKH');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }

  onSubmit(event) {
    var self = this;
    event.preventDefault();

    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      	
		  	if (response.error) {
        		self.setState({ paymentError: response.error.message, submitDisabled: false });
      		}
      		else {
      			debugger
      			var Id = self.props.customer[0]._id.slice(-7)
      			self.setState({ paymentComplete: true, submitDisabled: false, token: response.id, orderID: Id });
        		// make request to your server here!
        		    	axios.post('/pay', self.state)
		  .then(function (response) {
		  	  if (callback) callback()
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
      		}
		  
    });
    // componentWillUpdate(nextProps,nextState){
    // 	axios.post('/pay', nextState)
		  // .then(function (response) {
		  // 	  if (callback) callback()
		  // })
		  // .catch(function (error) {
		  //   console.log(error);
		  // });
      
    // }

   // this.props.stripePaySync(this.state, ()=>{console.log('Dispatching to Stripe !!!!')})
  }	

  render() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
     if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return (
		<div>
		<h4>Pay with credit/debit card</h4>
		<Col md={6}  >
	      	<form onSubmit={this.onSubmit.bind(this)} >
	        	<span>{ this.state.paymentError }</span><br />
	        	<FormControl type='text' data-stripe='number' placeholder='credit card number'>
		        </FormControl>
		        <FormControl type='text' data-stripe='exp-month' placeholder='expiration month' >
		        </FormControl>
		        <FormControl type='text' data-stripe='exp-year' placeholder='expiration year' >
		        </FormControl>
		        <FormControl type='text' data-stripe='cvc' placeholder='cvc' >
		        </FormControl>
		        <Button disabled={this.state.submitDisabled} type='submit' className="grey" value='Purchase'>Purchase</Button>
	        </form>
        </Col>
		</div>
      );
    }
  }
};

const mapStateToProps = (state) => {
	return {amount: state.CheckOutData , customer : state.CustomerData}} // getting info from the store
// const mapDispatchToProps = (dispatch) => bindActionCreators({stripePaySync}, dispatch)
// const ConnectedComp = connect(mapDispatchToProps)(StripePaymentForm) //
const ConnectedComp = connect(mapStateToProps)(StripePaymentForm) // we connect both things from above

class CheckOut extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			
			<div className="content">
				<ConnectedInfoComp/>
				<ConnectedComp/>	
			</div>
			
			)
		}
}



export default CheckOut
