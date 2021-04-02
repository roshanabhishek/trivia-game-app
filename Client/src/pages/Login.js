import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

// @material-ui/core components
import {
  CssBaseline,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// Local imports
import ActionCreators from '../actions';
import styles from '../assests/pages/Login';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
  };

  resetFields = () => {
    this.setState({ username: '', loading: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleButtonClick();
    const { username } = this.state;
    this.props.authenticate(username);
  }

  getCurrentPath = () => {
    if (this.props.gameState === 'waiting') return '/waiting';
    return '/join';
  }
  render() {
    if (this.props.authenticated) {
      return <Redirect to={{ pathname: this.getCurrentPath(), state: { username: this.state.username } }} />;
    }

    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />

        {/* SIGN-IN AREA */}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Game Login
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input
                id="email"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={this.onChange}
                value={this.state.username}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.state.loading}
            >
              Login
            </Button>


          </form>
        </Paper>
      </main>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  console.log('sssssssss', state.auth, state.auth.authenticated);
  return {
    authenticated: state.auth.authenticated,
    gameState: state.game.gameState,
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
