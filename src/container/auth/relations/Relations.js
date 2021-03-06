import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {getAllRelations, loggedInUserDetails} from '../../../actions/actions';
import {
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,	
	Typography,
	ListItemSecondaryAction,
	IconButton,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AppBar from '../../../component/AppBar';
import {blockUserByEmail} from '../../../actions/actions';
import AlertBox from '../../../component/AlertBox';
import Footer from '../../../component/Footer';

class Relations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			userEmail: '',
			alertMessage: '',
			alertOpen: false,
			shouldReload: false,
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.shouldReload === true) {
			loggedInUserDetails()
			.then(res => {
				const details = res.data.details[0];
				const userEmail = details.email;

				getAllRelations(userEmail)
				.then(res => {
					const following = res.data.following;

					this.setState({
						shouldReload: false,
						users: following,
						userEmail: userEmail,
					});
				})
				.catch(err => {
					this.setState({
						shouldReload: false,
					});
					console.log(err);
				});
			})
			.catch(err => {
				this.setState({
					shouldReload: false,
				});
				console.log(err);
			});
		}
	}

	componentDidMount() {
		loggedInUserDetails()
		.then(res => {
			const details = res.data.details[0];
			const userEmail = details.email;

			getAllRelations(userEmail)
			.then(res => {
				const following = res.data.following;

				this.setState({
					users: following,
					userEmail: userEmail,
				});
			})
			.catch(err => {
				console.log(err);
			});
		})
		.catch(err => {
			console.log(err);
		});
	}

	userBlockingHandler = (userEmail, blockEmail) => {
		blockUserByEmail(userEmail, blockEmail)
		.then(res => {
			this.setState({
				alertOpen: true,
				shouldReload: true,
				alertMessage: blockEmail+ ' Blocked',
			});
		})
		.catch(err => {
			this.setState({
				alertOpen: true,
				shouldReload: false,
				alertMessage: 'There was an error',
			});
		});
	}

	alertCloseHandler = () => {
		this.setState({
			alertOpen: false,
			alertMessage: '',
		})
	}

	render() {
		const {users} = this.state;

		return (
			<div>
				<AlertBox 
					alertOpen={this.state.alertOpen}
					closeAlertHandler={this.alertCloseHandler}
					alertMessage={this.state.alertMessage}
				/>
				<AppBar />
				<List>
				   	{
				   		(users.length > 0) ? users.map((user) => {
				   			const {email, fullName, _id} = user;
				   			const subStrEmail = email.substr(0,2);

				   			return (
		   						<React.Fragment key={_id}>
					   				<ListItem alignItems="flex-start">
								    	<ListItemAvatar>
								          	<Avatar>
				            					{subStrEmail}
				          					</Avatar>
								        </ListItemAvatar>
								        <ListItemText
							          	primary={email}
							          	secondary={
							            <React.Fragment>
							              	<Typography
							                	component="span"
							                	variant="body2"
							                	color="textPrimary">
							                {fullName}</Typography>
							            </React.Fragment>}/>
							          	<ListItemSecondaryAction>
						                    <IconButton onClick={() => this.userBlockingHandler(this.state.userEmail, email)} edge="end" aria-label="block">
						                      	<HighlightOffIcon />
						                    </IconButton>
					                	</ListItemSecondaryAction>
							      	</ListItem>
								    <Divider variant="inset" component="li" />
							    </React.Fragment>
				   			);
				   		})
				   		:
				   		null
				   	}
				</List>
				<Footer />
				<BottomNav />
			</div>
		);
	}
}

export default Relations;
 