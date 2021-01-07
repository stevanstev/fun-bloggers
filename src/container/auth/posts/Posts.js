import React, {Component} from 'react';
import BottomNav from '../../../component/BottomNav';
import {Grid} from '@material-ui/core';
import BlogBox from '../../../component/BlogBox';
import AppBar from '../../../component/AppBar';
import TextField from '@material-ui/core/TextField';
import './posts.css';

class Posts extends Component {
	render() {
		const styles = {
			container: {
				alignItems: "center",
			},
			items: {
				alignItems: "center",
			}
		}

		return(
			<div>
				<AppBar />
				<br/>
        		<div style={styles.container}>
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item xs={1} sm={3}></Grid>
						<Grid item xs={10} sm={6} style={styles.items}>
							<TextField
			          			id="outlined-full-width"
			          			label="Search"
			          			placeholder="Search Blog"
			          			fullWidth
			          			margin="normal"
			          			InputLabelProps={{
			            			shrink: true,
			          			}}
			          			variant="outlined"
			        		/>
						</Grid>
						<Grid item xs={1} sm={3}></Grid>
					</Grid>
				</div>
				<br/>
				<div style={styles.container} align="center">
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item sm={3}></Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item sm={3}></Grid>
					</Grid>
					<Grid container justify="space-evenly" alignItems="center">
						<Grid item sm={3}></Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item xs={12} sm={3} style={styles.items}>
							<BlogBox title="hello world" content="Hello world is good for you"/>
							<p></p>
						</Grid>
						<Grid item sm={3}></Grid>
					</Grid>
				</div>
				
				<BottomNav />
			</div>
		);
	}
}

export default Posts;
