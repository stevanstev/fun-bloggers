import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {connect} from 'react-redux';
import {CAN_REDIRECT} from '../../../redux/actionTypes';
import AppBar from '../../../component/AppBar';
import {
	Grid, 
} from '@material-ui/core';
import BlogBox from '../../../component/BlogBox';
import {getBlogs, followUser, alreadyFollowing} from '../../../actions/actions';
import OpenDialog from '../../../component/OpenDialog';
import AlertBox from '../../../component/AlertBox';

class Explore extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blogs: [],
			paginationIndex: 0,
			loadingMessage: 'Loading....',
			detailEmail: '',
			detailID: '',
			detailTitle: '',
			detailContent: '',
			openDialog: false,
			alertOpen: false,
			alertMessage: '',
			shouldReload: false,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.shouldReload === true) {
			getBlogs(1)
			.then(res => {
				const blogs = res.data.blogs !== "0" ? JSON.parse(res.data.blogs) : [];
				this.setState({
					shouldReload: false,
					blogs: blogs,
					isLoading: false,
					loadingMessage: res.data.blogs === "0" ? "-- Your explore is empty --" : "",
				});
			})
			.catch(err => {
				this.setState({
					blogs: [],
					shouldReload: false,
					isLoading: false,
					loadingMessage: "There was an error",
				});
			});
		}
	}

	componentDidMount() {
		getBlogs(1)
		.then(res => {
			const blogs = res.data.blogs !== "0" ? JSON.parse(res.data.blogs) : [];
			this.setState({
				blogs: blogs,
				isLoading: false,
				loadingMessage: res.data.blogs === "0" ? "-- Your explore is empty --" : "",
			});
		})
		.catch(err => {
			this.setState({
				blogs: [],
				isLoading: false,
				loadingMessage: "There was an error",
			});
		});
	}

	handlerDetailsButton = (email, id, title, content) => {
		this.setState({
			openDialog: true,
			detailEmail: email,
			detailID: id,
			detailTitle: title,
			detailContent: content,
		})
	}

	handleCloseDialog = () => {
		this.setState({
			openDialog: false,
			detailEmail: '',
			detailID: '',
			detailTitle: '',
			detailContent: '',
		});
	}

	handleFollow = () => {
		alreadyFollowing(this.state.detailID)
		.then(res => {
			if(res.data.status === "yes") {
				this.setState({
					alertOpen: true,
					openDialog: false,
					alertMessage: "User has been followed",
				});
			} else if(res.data.status === "abort"){
				this.setState({
					alertOpen: true,
					openDialog: false,
					alertMessage: "Can't follow yourself",
				});
			} else {
				followUser(this.state.detailEmail)
				.then(res => {
					this.setState({
						alertOpen: true,
						openDialog: false,
						alertMessage: "User Followed",
						shouldReload: true,
					});
				})
				.catch(err => {
					console.log(err);
				});
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	alertCloseHandler = () => {
		this.setState({
			alertOpen: false,
			alertMessage: '',
		})
	}

	render() {
		const styles = {
			container: {
				alignItems: "center",
				borderRadius: 7,
				paddingTop: 25,
				paddingBottom: 25,
				backgroundImage: "linear-gradient(to right,#70e1f5, #ffd194)",
			},
			items: {
				alignItems: "center",
			},
			homeContainer: {
				zIndex: -2,
			}
		}

		const {blogs} = this.state;

		return(
			<React.Fragment>
				<AlertBox 
				alertOpen={this.state.alertOpen}
				closeAlertHandler={this.alertCloseHandler}
				alertMessage={this.state.alertMessage}
				/>

				<OpenDialog 
					isOpenDialog={this.state.openDialog}
					title={this.state.detailTitle}
					content={this.state.detailContent}
					email={this.state.detailEmail}
					id={this.state.detailID} 
					handleCloseDialog={this.handleCloseDialog}
					handleFollow={this.handleFollow}/>

				<div className={styles.homeContainer}>
					<AppBar />
					<br/>
					<div style={styles.container} align="center">
						<Grid container justify="space-evenly" alignItems="center">
							{
								blogs.length > 0 ? blogs.map(blog => {
									const {title, content, _id, author, userID} = blog;
									return (
										<Grid key={_id} item xs={12} sm={4} style={styles.items}>
											<BlogBox 
												title={title} 
												content={content}
												author={author}
												id={userID}
												detailsHandler={(email, id, title, content) => this.handlerDetailsButton(email, id, title, content)}
												/>
											<p></p>
										</Grid>
									);
								})
								:
								<Grid item xs={12} sm={4} style={styles.items}>
									<p style={{ color: 'white' }}>{this.state.loadingMessage}</p>
								</Grid>
							}
						</Grid>
					</div>
					<BottomNav />
				</div>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetState: () => dispatch({type: CAN_REDIRECT}),
	}
}

export default connect(null, mapDispatchToProps)(Explore);