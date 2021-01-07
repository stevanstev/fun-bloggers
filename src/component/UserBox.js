import {Grid} from '@material-ui/core';

const userBox = (props) => {
	return(
		<Grid container>
			<Grid item xs={1} sm={2}></Grid>
			<Grid item xs={10} sm={8} style={styles.container}>
				<h4>{props.userName}</h4>
			</Grid>
			<Grid item xs={1} sm={2}></Grid>
		</Grid>
	);
}

const styles = {
	container: {
		backgroundColor: 'red',
	}
};

export default userBox;