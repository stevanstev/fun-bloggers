import {Grid} from '@material-ui/core';
import appLogo from "../assets/images/app_logo.png";

const appBar = (props) => {
	return (
		<div style={styles.container}>
			<Grid container justify="space-evenly" alignItems="center">
				<Grid item sm={1}></Grid>
				<Grid item xs={12} sm={5} style={styles.items}>
					<img src={appLogo} className="app-logo" alt="applogo"/>	
				</Grid>
				<Grid item sm={5} style={styles.items}></Grid>
				<Grid item sm={1}></Grid>
			</Grid>
		</div>
	);
}

const styles = {
	container: {
		alignItems: "center",
		backgroundImage: "linear-gradient(to right,#70e1f5, #ffd194)",
		borderRadius: 4,
		padding: 2,
	},
}

export default appBar;