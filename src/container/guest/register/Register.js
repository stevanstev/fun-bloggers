import React, {Component} from 'react';
import './register.css';
import { 
	TextField,
	CircularProgress,
	Button,
} from "@material-ui/core";
import {callRegisterAPIPost} from '../../../actions/actions';
import {connect} from 'react-redux';
import ErrorField from '../../../component/ErrorField';
import {withRouter} from 'react-router-dom';
import {CAN_REDIRECT} from '../../../redux/actionTypes';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			registerEmail: "",
			registerPassword: "",
			registerFullName: "",
		};

		this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
		this.onRegisterEmailChanged = this.onRegisterEmailChanged.bind(this);
		this.onRegisterPasswordChanged = this.onRegisterPasswordChanged.bind(this);
		this.onRegisterFullNameChanged = this.onRegisterFullNameChanged.bind(this);
		this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
	}

	onRegisterSubmit(event) {
		const requestData = {
			email: this.state.registerEmail,
			password: this.state.registerPassword,
			fullName: this.state.registerFullName,
		};
		event.preventDefault();
		this.props.callRegisterAPIPost(requestData);
	}	

	onRegisterEmailChanged = (event) => {
		this.setState({
			registerEmail: event.target.value
		});
	}

	onRegisterPasswordChanged = (event) => {
		this.setState({
			registerPassword: event.target.value
		});
	}

	onRegisterFullNameChanged = (event) => {
		this.setState({
			registerFullName: event.target.value
		});
	}

	componentDidUpdate() {
		if (this.props.canRedirect === true) {
			this.props.registerSuccess();
		}
	}

	render() {
		return(
			<div>
				<form method="post" onSubmit={this.onRegisterSubmit}>
					{this.state.isLoading === true ? <CircularProgress color="secondary" /> : ''}
					<p>Register</p>
					<p></p>
					<TextField
						onChange={this.onRegisterEmailChanged}
						type="text"
						value={this.state.registerEmail} 
						label="Email"
						placeholder="someone@mail.com" /> 
					{ this.props.errors.registerEmailError !== "" ? <ErrorField message={this.props.errors.registerEmailError}/> : <p></p>}
					<TextField
						onChange={this.onRegisterPasswordChanged}
						type="password"
						label="Password" 
						placeholder="******"
						value={this.state.registerPassword}/> 
					{ this.props.errors.registerPasswordError !== "" ? <ErrorField message={this.props.errors.registerPasswordError}/> : <p></p>}
					<TextField
						onChange={this.onRegisterFullNameChanged}
						type="text"
						label="Fullname" 
						placeholder="your name"
						value={this.state.registerFullName}/> 
					{ this.props.errors.registerFullNameError !== "" ? <ErrorField message={this.props.errors.registerFullNameError}/> : <p></p>}
					<Button type="submit" variant="contained" color="primary">
					  	Sign Up
					</Button>
					<p></p>
					<h6> -- Or -- </h6>
				</form>
				<Button 
					onClick={this.props.backToLogin}
					type="submit" 
					className="register-button">
				  	Sign In
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.authReducer.isLoading,
		errors: state.authReducer.errors,
		canRedirect: state.authReducer.canRedirect,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearState: () => dispatch({type: CAN_REDIRECT}),
		callRegisterAPIPost: data => dispatch(callRegisterAPIPost(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));