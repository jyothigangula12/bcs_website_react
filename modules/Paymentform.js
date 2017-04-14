import React from 'react';
import {ReactScriptLoaderMixin} from 'react-script-loader';
import {FieldGroup, FormGroup, FormControl, ControlLabel, Checkbox, Button} from 'react-bootstrap'


class PaymentForm extends React.Component{
  constructor(props){
    super()
    for (let functionality in ReactScriptLoaderMixin){
      this[functionality] = ReactScriptLoaderMixin[functionality]
    }
    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }
  }
  

  getScriptURL () {
    return 'https://js.stripe.com/v2/';
  }

  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
      }
    });
  }

  render() {
    // if (this.state.stripeLoading) {
    //   return <div>Loading</div>;
    // }
    // else if (this.state.stripeLoadingError) {
    //   return <div>Error</div>;
    // }
    // else if (this.state.paymentComplete) {
    //   return <div>Payment Complete!</div>;
    // }
    // else {
      return (
        <form action="/your-server-side-code" method="POST">
        $script (
        src="https://checkout.stripe.com/checkout.js" class="stripe-button"
        data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
        data-amount="999"
        data-name="Stripe.com"
        data-description="Widget"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-zip-code="true">
        )
        </form>
        );
    // }
  }
};

export default PaymentForm;