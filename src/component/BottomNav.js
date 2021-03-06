import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {AUTH_ROUTE_INDEX} from '../redux/actionTypes';
import {removeToken} from '../actions/actions';
import {useEffect} from 'react';
import { 
	Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
		root: {
			backgroundColor: "white",
			borderRadius: "10px",
			boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
			paddingLeft: 30,
			paddingRight: 30,
		},
		item: {
			color: "lightblue",
			textAlign: "center",
		},
		container: {
			width: '100%',
			position: 'fixed',
			bottom: 30,
			left: 0,
			right: 0,
		}
});


const BottomNav = (props) => {
		const classes = useStyles();

		const history = useHistory();

		useEffect(() => {
			return () => {};
	}, []);

		const routeNavigate = (path) => {
			history.push(path);
		}

		const handleLogout = () => {
			props.changeIndex(0);

			props.logoutHandler();
		}

		return (
		<div>
			<Grid container className={classes.container}>
				<Grid item sm={4}></Grid>
				<Grid item xs={12} sm={4}>
					<BottomNavigation
								value={props.routeIndex}
								onChange={(event, newValue) => {
									props.changeIndex(newValue);
								}}
								showLabels
							className={classes.root}>
									<BottomNavigationAction className={classes.item} label="Home" icon={<HomeIcon />} onClick={() => routeNavigate('/home')}/>
									<BottomNavigationAction className={classes.item} label="Explore" icon={<SearchIcon />} onClick={() => routeNavigate('/explore')}/>
									<BottomNavigationAction className={classes.item} label="Posts" icon={<MenuBookIcon />} onClick={() => routeNavigate('/posts')}/>
									<BottomNavigationAction className={classes.item} label="Profile" icon={<PersonIcon />} onClick={() => routeNavigate('/profile')}/>
									<BottomNavigationAction className={classes.item} label="Logout" icon={<ExitToApp />} onClick={() => handleLogout()}/>
						</BottomNavigation>
				</Grid>
				<Grid item sm={4}></Grid>
			</Grid>
		</div>
		);
}

const mapStateToProps = (state) => {
	return {
		routeIndex: state.authReducer.authRouteIndex
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logoutHandler: () => dispatch(removeToken()),
		changeIndex: (index) => dispatch({type: AUTH_ROUTE_INDEX, index: index})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);