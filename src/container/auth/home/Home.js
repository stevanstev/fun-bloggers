import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {connect} from 'react-redux';
import {CAN_REDIRECT} from '../../../redux/actionTypes';
import AppBar from '../../../component/AppBar';

class Home extends Component {
	componentDidMount() {
		this.props.resetState();
	}

	render() {
		return(
			<div>
				<AppBar />
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