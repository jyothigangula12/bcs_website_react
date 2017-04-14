import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import Table from 'react-bootstrap/lib/Table'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import InputGroup from 'react-bootstrap/lib/InputGroup'
// import Button from 'react-bootstrap/lib/Button'
import { Button, Row } from 'react-materialize'
import NavLink from './NavLink'
//import store from '../store/index'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {addTotalToCheckOutAsync ,deleteCartAsync} from '../store/actions'

import axios from 'axios'

class Cart extends React.Component{
	constructor(props){
		super()
		this.Amount = 0 
		this.subTotal = 0
		this.number = []
        this.total = []
		for(let item of props.cartObj){
		console.log("____props.cartObj+++++",props.cartObj)
        this.Amount = this.Amount + item.event.price * item.number.number + (item.event.price * item.number.number) * 0.21
	    this.subTotal = this.subTotal + item.event.price * item.number.number
	    console.log("++++++++Total++++++++", this.Amount, "++++++Subtotal+++++++", this.subTotal)
        }
	}
    handleCheckOut(event){
    	var data={}
    	data.Total = this.Amount
	    data.subTotal = this.subTotal
    	this.props.addTotalToCheckOutAsync(data, ()=>{console.log('checkout total added!!!!')})
    }
    
    handleDelete(event){
    	console.log('event',event)
    	var data={}
    	data.event = event
    	this.props.deleteCartAsync(data, ()=>{console.log('CartData has deleted!!!!')})
    	this.subTotal = this.subTotal - event.event.price * event.number.number
		this.Amount = this.subTotal + this.subTotal * 0.21
    }
  render() {
    return (
<div>
		<div className='pageTitle'>
    	<h3>Cart</h3>
    	</div>
    	<div className="content">
		  <Table responsive>
		    <thead>
		      <tr>
		        <th></th>
		        <th>Product</th>
		        <th>Price</th>
		        <th>Description</th>
		        <th>Amount</th>
		        <th>Total</th>

		      </tr>
		    </thead>
		    <tbody>
		    
            { 
		     this.props.cartObj.map( (event, i) => {
            	return <tr key={i}>
			        <td><i className="fa fa-trash-o" aria-hidden="true" onClick = {this.handleDelete.bind(this , event)}></i></td>
			        <td>{event.event.title}</td>
			        <td>{event.event.price}</td>
			        <td>{event.event.details}</td>
			        <td>{event.number.number}</td>
			        <td>{event.event.price * event.number.number}</td>

			    </tr>})
		    }
            </tbody>
			</Table>
            

			<div id="cartTotal">

			<h4>Cart Total</h4>

			<form >
			
		    <FormGroup>
		      <InputGroup>
		        <InputGroup.Addon>Subtotal</InputGroup.Addon>
		        <FormControl style={{paddingLeft: '1em'}} type="text" value = {this.subTotal}/>
		      </InputGroup>
  		    </FormGroup>
		
		    <FormGroup>
		    <InputGroup>
		        <InputGroup.Addon>Total (IVA incl.)</InputGroup.Addon>
		        <FormControl style={{paddingLeft: '1em'}} type="text" value = {this.Amount.toFixed(2)}
		         />
		      </InputGroup>
		    </FormGroup>
		    <NavLink to="/checkout"><Button className="grey" id="checkoutButton" type = "button" onClick = {this.handleCheckOut.bind(this)}>PROCEED TO CHECKOUT</Button></NavLink>
		    </form>	
</div>
        </div>
		</div>
   )
}
}

const mapStateToProps = (state) => ({cartObj: state.CartData}) // getting info from the store
const mapDispatchToProps = (dispatch) => bindActionCreators({addTotalToCheckOutAsync , deleteCartAsync}, dispatch) // sending info to the store
export default connect(mapStateToProps , mapDispatchToProps)(Cart) // we connect both things from above
 