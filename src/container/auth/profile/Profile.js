import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import AppBar from '../../../component/AppBar';

class Profile extends Component {
	render() {
		return(
			<div>
				<AppBar />
				<BottomNav />
			</div>
		);
	}
}

export default Profile;