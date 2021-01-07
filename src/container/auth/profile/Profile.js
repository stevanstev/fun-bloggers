import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import UserBox from '../../../component/UserBox';

class Profile extends Component {
	render() {
		return(
			<div>
				<UserBox userName="Steven"/>
				<BottomNav />
			</div>
		);
	}
}

export default Profile;