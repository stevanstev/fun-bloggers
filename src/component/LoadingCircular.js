import { 
	CircularProgress,
	Backdrop,
} from "@material-ui/core";

const loadingCircular = (props) => {
	return (
		<Backdrop style={styles} open={props.isLoading}>
			<CircularProgress color="secondary" />
		</Backdrop>
	);
}

const styles = {
	position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    zIndex: -1,
}

export default loadingCircular;