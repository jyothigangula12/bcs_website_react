// Reducer


const EventData = function (state = [], action) {
    //action.todoInfo = "Hey i was in the todoReducer"
    switch (action.type) {
        case 'ADD_EVENT':
            return state.concat(action.data)
        case 'DELETE_EVENT':
        debugger
                const newState = [...state]
                   return state.filter(function(el){
                        return (el._id !== action.data.event._id)
                    }) 
        case 'UPDATE_EVENT' :
              const tempState = [...state]
              for(let i in tempState) {
                    let event = tempState[i]
                    if (event._id === action.data._id) {
                       tempState[i] = action.data   
                    }
                }
                
            return tempState
        default:
            return state
    }
}

const CartData = function (state = [], action) {
    switch (action.type) {
        case 'ADD_EVENT_TO_CART':
        // check if product is already in the cart
        // if so, update the amount
        
        if (!state[0]) {return state.concat(action.data)}
        else {const tempState = [...state]
                      for(let i in tempState) {
                            let obj = tempState[i]
                            if(obj.event.title === action.data.event.title){
                               tempState[i].number.number = Number(action.data.number.number) + Number(obj.number.number)
                               return tempState
                            } 
                        }
                        for(let i in tempState) {
                            let obj = tempState[i]
                            if(obj.event.title != action.data.event.title){return state.concat(action.data)}
                        }        
        }
      
        // if not, continue with state.concat
           
        case 'DELETE_EVENT_FROM_CART':
            const newState = [...state]
            return state.filter(function(el){
                return (el.event._id !== action.data.event.event._id)
             }) 
        default:
            return state
    }
}

const CheckOutData = function (state = [], action) {
    switch (action.type) {
        case 'ADD_TOTAL_TO_CHECKOUT':
            return state.concat(action.data)

        default:
            return state
    }
}
const CustomerData = function (state = [], action) {
    switch (action.type) {
        case 'ADD_CUSTOMER_INFO':
            return state.concat(action.data)   
        default:
            return state
    }
}

export {EventData, CartData , CheckOutData, CustomerData}
 