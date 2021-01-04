import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import { 
	Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  	root: {
    	backgroundColor: "white",
    	borderRadius: "10px",
    	boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    	justifyContent: 'space-between',
  	},
  	item: {
  		color: "lightblue",
  		textAlign: "center",
  	}
});

const BottomNav = () => {
  	const classes = useStyles();
  	const [value, setValue] = React.useState(0);

  	return (
    	<div>
    		<Grid container justify="center"  alignItems="center">
				<Grid item xs={0} sm={3}></Grid>
				<Grid item xs={12} sm={6}>
					<BottomNavigation
			      		value={value}
			      		onChange={(event, newValue) => {
			        		setValue(newValue);
			      		}}
			      		showLabels
			      	className={classes.root}>
					      	<BottomNavigationAction className={classes.item} label="Home" icon={<HomeIcon />} />
					      	<BottomNavigationAction className={classes.item} label="Posts" icon={<MenuBookIcon />} />
					      	<BottomNavigationAction className={classes.item} label="Profile" icon={<PersonIcon />} />
				    </BottomNavigation>
				</Grid>
				<Grid item xs={0} sm={3}></Grid>
			</Grid>
    	</div>
  	);
}

export default BottomNav;