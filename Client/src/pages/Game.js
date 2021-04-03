import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Navbar from '../components/Navbar';
import GameComponent from '../components/GameComponent';

import ActionCreators from '../actions';
import AnswerKey from '../components/AnswerKey';


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

class Game extends Component {
  constructor() {
    super();
    this.state = {
      isComplete: false,
    };
  }

  handleLogout = () => {
    this.props.signOut()
  };

  render() {
    if (!this.props.authenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    if (this.props.gameState === 'complete') {
      return <Redirect to={{ pathname: '/leaderboard' }} />;
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
          {
            isEmpty(this.props.playersResult) ?
              <GameComponent /> :
              <AnswerKey />
          }
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
    index: state.game.index,
    playersResult: state.game.playersResult,
  };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Game)));
