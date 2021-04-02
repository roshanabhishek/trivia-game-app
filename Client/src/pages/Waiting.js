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
import WaitingComponent from '../components/WaitingComponent';

import ActionCreators from '../actions';


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

class Waiting extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  handleLogout = () => {
    // this.props.signOut();
  };

  onClickJoin = () => {
    this.props.joinGame();
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    
    if (this.props.gameState === 'started') {
      return <Redirect to={{ pathname: '/game' }} />;
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
          <WaitingComponent />
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Waiting)));
