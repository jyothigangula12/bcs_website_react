import axios from 'axios'

// ---------------------- Action Creators --------------------------//

const addEvent = (data) => { return {type: "ADD_EVENT", data}}
const updateEvent = (data) => {return {type : "UPDATE_EVENT", data}}
const deleteEvent = (data) => {return {type : "DELETE_EVENT",data}}
const addEventToCart = (data) => {return {type: "ADD_EVENT_TO_CART", data}}
const addToCheckOut = (data) => {return {type : "ADD_TOTAL_TO_CHECKOUT",data}}
const addCustomerInfo = (data) => {return {type: "ADD_CUSTOMER_INFO", data}}
const deleteFromCart = (data) => {return {type: "DELETE_EVENT_FROM_CART", data}}


const stripePaySync = (event , callback) => {
	return (dispatch) => {
		axios.post('/pay', event)
		  .then(function (response) {
		    if (callback) callback()
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}

const addEventAsync = (event , callback) => {
	return (dispatch) => {
		axios.post('/events/addevent', event)
		  .then(function (response) {
		    dispatch(addEvent(response.data))
		    if (callback) callback()
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}


const updateEventAsync = (data , callback) => {
	return (dispatch) => {
		axios.post('/events/updateevent', data)
		  .then(function (response) {
		    dispatch(updateEvent(response.data))
		    if (callback) callback()
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}
}

const fetchEventsAsync = (callback) => {
	return (dispatch) => {
		axios.get("/events", ) 
			.then ((res) => {
				for(let event of res.data) {
					dispatch(addEvent(event))
				}
				if (callback) callback()
			})
	}
}

const deleteEventAsync = (data, callback) => {
		return (dispatch) => {
			axios.post('/events/deleteevent', data)
			  .then(function (response) {
			  	if (response.data.ok === 1){
			    	dispatch(deleteEvent(data))			  		
			  	}
			    if(callback) callback()
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	}

}

const addEventToCartAsync = (data, callback) => {
	return (dispatch) => {
		dispatch(addEventToCart(data))
		if(callback) callback()
	}
}

const addTotalToCheckOutAsync = (data, callback) => {
	return (dispatch) => {
		dispatch(addToCheckOut(data))
		if(callback) callback()
	}
}

const deleteCartAsync = (data, callback) => {
	return (dispatch) => {
		dispatch(deleteFromCart(data))
		if(callback) callback()
	}
}
const addCustomerDataAsync = (data, callback) => {

	return (dispatch) => {
			axios.post('/events/customer', data)
			.then(function (response) {
			    dispatch(addCustomerInfo(response.data))
			    if(callback) callback()
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
	}

}

export {addEventAsync , updateEventAsync, fetchEventsAsync ,deleteEventAsync, addEventToCartAsync , addTotalToCheckOutAsync, stripePaySync, addCustomerDataAsync , deleteCartAsync ,deleteFromCart}