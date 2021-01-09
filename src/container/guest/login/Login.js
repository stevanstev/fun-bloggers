import React, {Component} from "react";
import { 
	TextField,
	Grid,
	Button,
	CircularProgress,
} from "@material-ui/core";
import "./login.css";
import loginImage from "../../../assets/images/login_image.jpg";
import appLogo from "../../../assets/images/app_logo.png";
import Register from '../register/Register';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {SET_TOKEN} from '../../../redux/actionTypes';
import {callLoginAPIPost} from '../../../actions/actions';
import {CAN_REDIRECT} from '../../../redux/actionTypes';
import ErrorField from '../../../component/ErrorField';

class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			email: "",
			password: "",
			showRegister: false,
		};

		this.onemailChanged = this.onemailChanged.bind(this);
		this.onPasswordChanged = this.onPasswordChanged.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit = (event) => {
		const requestData = {
			email: this.state.email,
			password: this.state.password,
		};		
		event.preventDefault();
		this.props.callLoginAPIPost(requestData);
	}

	onemailChanged = (event) => {
		this.setState({
			email: event.target.value
		});
	}

	onPasswordChanged = (event) => {
		this.setState({
			password: event.target.value
		})
	}

	changeForm = (value) => {
		this.setState({
			showRegister: value,
		});
	}

	onRegisterSuccess = () => {
		this.props.resetRegisterState();
		this.setState({
			showRegister: false,
		});
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevProps.canRedirect !== this.props.canRedirect) {
			return {
				canRedirect: this.props.canRedirect,
			}
		}

		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot !== null) {
			// TODO
		}
	}

	render() {
		return(
			<React.Fragment>
			<div className="login-container"> 
				<Grid container>
					<Grid item sm={2}></Grid>
					<Grid item xs={12} sm={8} className="login-form-container">
						<Grid container>
							<Grid item xs={12} sm={6}>
								<img src={loginImage} className="login-image" alt="loginimage"/>
							</Grid>
							<Grid item xs={12} sm={6} className="form-container">
								<img src={appLogo} className="app-logo" alt="applogo"/>
								<p className="sub-title">Welcome to Fun Bloggers</p>
								{
									this.state.showRegister === false ?
										<div>
											<form method="post" onSubmit={this.onFormSubmit}>
												{this.props.isLoading ? <CircularProgress color="secondary" /> : ''}
												<p>Login</p>
												<p></p>
												<TextField 
													onChange={this.onemailChanged} 
													type="text"
													value={this.state.email} 
													label="Email"
													placeholder="someone@mail.com" /> 
												{ this.props.errors.loginEmailError !== "" ? <ErrorField message={this.props.errors.loginEmailError}/> : <p></p>}
												<TextField
													type="password"
													label="Password" 
													placeholder="******"
													value={this.state.password}
													onChange={this.onPasswordChanged} /> 
												{ this.props.errors.loginPasswordError !== "" ? <ErrorField message={this.props.errors.loginPasswordError}/> : <p></p>}
												<Button type="submit" variant="contained" color="primary">
												  	Sign In
												</Button>
												<p></p>
												<h6> -- Or -- </h6>
											</form>
											<Button 
												onClick={() => this.changeForm(true)}
												type="submit" 
												className="register-button">
											  	Sign Up
											</Button>
										</div>
									:
										<Register registerSuccess={this.onRegisterSuccess} backToLogin={() => this.changeForm(false)}/>
								}
							</Grid>
						</Grid>
					</Grid>
					<Grid item sm={2}></Grid>
				</Grid>
			</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.authReducer.isLoading,
		errors: state.authReducer.errors,
		token: state.authReducer.authToken,
		canRedirect: state.authReducer.canRedirect,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setToken: () => dispatch({type: SET_TOKEN}),
		resetRegisterState: () => dispatch({type: CAN_REDIRECT}),
		callLoginAPIPost: data => dispatch(callLoginAPIPost(data)), 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));