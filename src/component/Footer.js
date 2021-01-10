import {
	Grid,
	Badge,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const footer = (props) => {


	return (
		<Grid container align="center" style={style}>
			<Grid item sm={1}></Grid>
			<Grid item sm={10}>
				<Badge color="secondary">
			    	<a rel="noreferrer" href="https://github.com/stevanstev" target="_blank"><GitHubIcon /></a>
			    </Badge>
				<h5>Created By Stevanstev</h5>
			</Grid>
			<Grid item sm={1}></Grid>
		</Grid>
	);
}

const style = {
	marginTop: 100,
	color: 'lightblue',
}

export default footer;