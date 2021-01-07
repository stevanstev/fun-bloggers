import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {connect} from 'react-redux';
import {CAN_REDIRECT} from '../../../redux/actionTypes';

class Home extends Component {
	componentDidMount() {
		this.props.resetState();
	}

	render() {
		return(
			<div>
				<BottomNav />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetState: () => dispatch({type: CAN_REDIRECT})
	}
}

export default connect(null, mapDispatchToProps)(Home);