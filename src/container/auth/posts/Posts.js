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

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alertMessage: '',
			alertOpen: false,
		}
	}

	closeAlertHandler = () => {
		this.setState({
			alertOpen: !this.state.alertOpen,
		})
	}

	handleAlert = (message) => {
		this.setState({
			alertOpen: true,
			alertMessage: message,
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
			}
		}

		return(
			<div>
				<AlertBox 
					alertOpen={this.state.alertOpen} 
					closeAlertHandler={this.closeAlertHandler} 
					alertMessage={this.state.alertMessage} />
				<AppBar />
				<br/>
        		<div align="right">
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item xs={1} sm={1}></Grid>
						<Grid item xs={10} sm={10}>
							<AddBlog handleAlert={(message) => this.handleAlert(message)}/>
						</Grid>
						<Grid item xs={1} sm={1}></Grid>
					</Grid>
				</div>
				<br/>
				<div style={styles.container} align="center">
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item sm={1}></Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={4} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item sm={1}></Grid>
					</Grid>
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item sm={1}></Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={4} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item sm={1}></Grid>
					</Grid>
				</div>
				
				<BottomNav />
			</div>
		);
	}
}

export default Posts;
