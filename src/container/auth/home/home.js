import React, {Component} from 'react';
import BottomNav from '../../../component/bottom_nav';
import { 
	Grid,
} from "@material-ui/core";

class Home extends Component {
	render() {
		return(
			<div>
				<Grid container>
					<Grid item xs={0} sm={2}></Grid>
					<Grid item xs={0} sm={8}>
						<BottomNav />
					</Grid>
					<Grid item xs={0} sm={2}></Grid>
				</Grid>
			</div>
		);
	}
}

export default Home;