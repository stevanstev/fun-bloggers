import {
	Button, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

const alertBox = (props) => {
	return (
		<Dialog
	        open={props.alertOpen}
	        onClose={props.closeAlertHandler}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description">
	        <DialogTitle id="alert-dialog-title">{"Please read the message inside this box"}</DialogTitle>
	        <DialogContent>
	          	<DialogContentText id="alert-dialog-description">
	            	{props.alertMessage}
	          	</DialogContentText>
	        </DialogContent>
	        <DialogActions>
	          	<Button onClick={props.closeAlertHandler} color="primary" autoFocus>
	            	Okay
	          	</Button>
	        </DialogActions>
	    </Dialog>
	);
} 

export default alertBox;