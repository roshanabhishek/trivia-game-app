import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
} from '@material-ui/core';

import Navbar from '../components/Navbar';

import ActionCreators from '../actions';
import Leaderboard from '../components/Leaderboard';


const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#F2F2F8',
    },
  };
};

class Result extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  handleLogout = () => {
    this.props.signOut();
  };

  render() {
    if (!this.props.authenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        {/* TOP NAV BAR */}
        <Navbar
          handleLogout={this.handleLogout}
        />

        {/* MAIN CONTENT AREA */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Leaderboard />
        </main>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gameState: state.game.gameState,
  };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Result)));
