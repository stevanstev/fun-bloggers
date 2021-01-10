import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import AppBar from '../../../component/AppBar';
import {
	Grid,
	Button, 
} from '@material-ui/core';
import {getRelationsOfUser} from '../../../actions/actions';
import {withRouter} from 'react-router-dom';
import Footer from '../../../component/Footer';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			followedUser: 0,
			blockedUser: 0,
		}
	}

	componentDidMount() {
		getRelationsOfUser()
		.then(res => {
			const blockedUser = res.data.blockedUser;
			const followedUser = res.data.followedUser;

			this.setState({
				followedUser: followedUser,
				blockedUser: blockedUser,
			})
		})
		.catch(err => {
			console.log(err);
		});
	}

	routingHandler = (path) => {
		this.props.history.push(path);
	}

	render() {
		return(
			<div>
				<AppBar />
					<div align="center">
						<Grid container justify="space-evenly" alignItems="center">
							<Grid item xs={12} sm={4}></Grid>
							<Grid item xs={12} sm={4}>
								<Grid container >
									<Grid item xs={6} sm={6}>
										<div>
											<h4>Followed Users</h4>
											{this.state.followedUser === 0 ? 
												<span>No followed User</span> 
												:
												<Button variant="outlined" onClick={() => this.routingHandler('/relations')} color="primary">
											  		{this.state.followedUser}
												</Button>
											}
										</div>
									</Grid>
									<Grid item xs={6} sm={6}>
										<div>
											<h4>Blocked Users</h4>
											{this.state.blockedUser === 0 ? 
												<span>No blocked User</span> 
												:
												<Button variant="outlined" onClick={() => this.routingHandler('/relations')} color="secondary">
											  		{this.state.blockedUser}
												</Button>
											}
										</div>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={4}></Grid>
						</Grid>
					</div>
				<BottomNav />
				<Footer />
			</div>
		);
	}
}

export default withRouter(Profile);