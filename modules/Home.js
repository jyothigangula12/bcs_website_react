import React from 'react'
import PropTypes from 'prop-types'
import { Glyphicon, Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap'
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share'
const {FacebookShareButton, GooglePlusShareButton,LinkedinShareButton,TwitterShareButton,TelegramShareButton,WhatsappShareButton,PinterestShareButton,VKShareButton,OKShareButton} = ShareButtons;
const TwitterIcon = generateShareIcon('twitter');
const FacebookIcon = generateShareIcon('facebook');
const LinkedinIcon = generateShareIcon('linkedin');
import {addEventToCartAsync , addTotalToCheckOutAsync} from '../store/actions'


import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			index: 0,
	        direction: null
        }  
	    console.log("From Home" , )
	}


  handleSelect(selectedIndex, e) {

    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
  }

	render() {
		
		const shareUrl = 'http://www.barcelonacodeschool.com';
		const title = 'Barcelona Code School';
		return (
			<div className="content">
				<div>
					<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
						{this.props.events.map(event => { if (new Date(event.startDate).getTime() > new Date().getTime()){
							var df = new Date(event.startDate);
							var dArr = df.toDateString().split(' ');
							var dFormat = dArr[2] + ' ' + dArr[1] + ' ' + dArr[3];
							return (
								<Carousel.Item>
								  <img width={960} height={480} alt="960x480" src={event.image}/>
								  <Carousel.Caption>
								   <h3>{event.title}</h3>
								    <h4>{event.subtitle} on {dFormat}</h4> 
								  </Carousel.Caption>
								</Carousel.Item>
							)
						}})}
					</Carousel>
				</div>

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
			</div>
			)
		//})}
	}

}


const mapStateToProps = (state) => ({events: state.EventData}) // getting info from the store
//const mapDispatchToProps = (dispatch) => bindActionCreators({addEventToCartAsync , addTotalToCheckOutAsync}, dispatch) // sending info to the store
export default connect(mapStateToProps)(Home) // we connect both things from above
