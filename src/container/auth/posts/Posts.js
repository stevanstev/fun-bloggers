import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {
	Grid, 
} from '@material-ui/core';
import BlogBox from '../../../component/BlogBox';
import AddBlog from '../blogs/AddBlog';
import AppBar from '../../../component/AppBar';
import AlertBox from '../../../component/AlertBox';
import './posts.css';
import {getBlogs} from '../../../actions/actions';
import Footer from '../../../component/Footer';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alertMessage: '',
			alertOpen: false,
			blogs: [],
			currentPageIndex: 0,
			loadingMessage: 'Loading ...',
			requiredToLoad: false,
		}

		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange = (event) => {
		console.log('handle change');
	}

	closeAlertHandler = () => {
		this.setState({
			alertOpen: !this.state.alertOpen,
		});
	}

	handleAlert = (message) => {
		this.setState({
			alertOpen: true,
			alertMessage: message,
			requiredToLoad: true,
		});
	}

	componentWillUnmount() {
		this.setState({
			alertMessage: '',
			alertOpen: false,
			blogs: [],
			currentPageIndex: 0,
			loadingMessage: 'Loading ...',
			requiredToLoad: false,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(prevState.requiredToLoad === true) {
			getBlogs(2)
			.then(res => {
				const blogs = res.data.blogs !== "0" ? JSON.parse(res.data.blogs) : [];

				this.setState({
					blogs: blogs,
					isLoading: false,
					requiredToLoad: false,
					loadingMessage: res.data.blogs === "0" ? "-- You haven't write any blog --" : "",
				});
			})
			.catch(err => {
				this.setState({
					blogs: [],
					requiredToLoad: false,
					isLoading: false,
					loadingMessage: "There was an error",
				});
			});
		}
	}

	componentDidMount() {
		getBlogs(2)
		.then(res => {
			const blogs = res.data.blogs !== "0" ? JSON.parse(res.data.blogs) : [];

			this.setState({
				blogs: blogs,
				isLoading: false,
				loadingMessage: res.data.blogs === "0" ? "-- You haven't write any blog --" : "",
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
				<div className={styles.homeContainer}>			
					<AlertBox 
						alertOpen={this.state.alertOpen} 
						closeAlertHandler={this.closeAlertHandler} 
						alertMessage={this.state.alertMessage} />
					<AppBar />
					<br/>
					<div align="right">
						<Grid container justify="space-evenly" alignItems="center">
							<Grid item xs={1} sm={1}></Grid>
							<Grid item xs={5} sm={5}></Grid>
							<Grid item xs={5} sm={5}>
								<AddBlog handleAlert={(message) => this.handleAlert(message)}/>
							</Grid>
							<Grid item xs={1} sm={1}></Grid>
						</Grid>
					</div>
					<br/>
	        		<div style={styles.container} align="center">
						<Grid container justify="space-evenly" alignItems="center">
							{
								blogs.length > 0 ? blogs.map(blog => {
									const {title, content, _id, author} = blog;
									return (
										<Grid key={_id} item xs={12} sm={4} style={styles.items}>
											<BlogBox 
												title={title} 
												content={content}
												id={_id}
												author={author}
												onClick={() => null} />
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
					<br/>				
					<BottomNav />
					<Footer />
				</div>
			</React.Fragment>
		);
	}
}


export default Posts;
