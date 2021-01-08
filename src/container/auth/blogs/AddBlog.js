import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';
import {callBlogAPIPost} from '../../../actions/actions';
import ErrorField from '../../../component/ErrorField';

class AddBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: '',
            content: '',
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onContentChangeHandler = this.onContentChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    clickHandler = (event) => {
        this.setState({
            open: !this.state.open,
            title: '',
            content: '',
        });
        this.props.clearErrorsState();
    }

    onTitleChangeHandler = (event) => {
        this.setState({
            title: event.target.value,
        });
    }

    onContentChangeHandler = (event) => {
        this.setState({
            content: event.target.value,
        });
    }

    onSubmitHandler(event) {
        const requestData = {
            title: this.state.title,
            content: this.state.content,
        }

        this.props.callBlogAPIPost(requestData);

        event.preventDefault();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.success !== this.props.success) {
          const successSnapshot = {
            open: false,
          }
          return successSnapshot;
        }
        return null;
    }

    componentDidUpdate(previousProps, previousState, snapshot) {
        if (snapshot !== null) {
            if (previousState.open === true) {
                this.setState({
                    open: false,
                });
                this.props.clearErrorsState();
                this.props.handleAlert("Blog added");
            }
        }
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this.clickHandler}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}>
                    Add Blog
                </Button>
                <form method="post">
                    <Dialog open={this.state.open} onClose={this.clickHandler} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Blog</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter the blog title and content
                        </DialogContentText>
                                <TextField
                                    onChange={this.onTitleChangeHandler}
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Blog's title"
                                    type="text"
                                    fullWidth />
                                { this.props.errors.blogTitleError !== "" ? <ErrorField message={this.props.errors.blogTitleError}/> : <p></p>}
                                <TextField
                                    onChange={this.onContentChangeHandler}
                                    margin="dense"
                                    id="content"
                                    label="Blog's content"
                                    type="text"
                                    fullWidth />
                                { this.props.errors.blogContentError !== "" ? <ErrorField message={this.props.errors.blogContentError}/> : <p></p>}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.clickHandler} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.onSubmitHandler} color="primary">
                                    Post
                                </Button>
                            </DialogActions>
                    </Dialog>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.blogReducer.errors,
        success: state.blogReducer.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        callBlogAPIPost: data => dispatch(callBlogAPIPost(data)),
        clearErrorsState: () => dispatch({type: "CLEAR_ERROR_STATE"}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);