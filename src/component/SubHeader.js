import {
	Grid,
} from '@material-ui/core';

const subHeader = (props) => {
	return (
		<Grid container align="center" style={style}>
			<Grid item sm={1}></Grid>
			<Grid item sm={10}>
				{props.icon}
				{props.title}
			</Grid>
			<Grid item sm={1}></Grid>
		</Grid>
	);
}

const style = {
	marginTop: 25,
	marginBottom: 25,
}

export default subHeader;