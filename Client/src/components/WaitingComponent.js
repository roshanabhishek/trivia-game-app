import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import moment from 'moment';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  Button,
  Paper,
  Typography,
} from '@material-ui/core';

import ActionCreators from '../actions';

const styles = (theme) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.unit * 3,
    },
    headerContainer: {
      display: 'flex',
      width: 400,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      width: 400,
      padding: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      padding: theme.spacing.unit * 3,
    },
    submit: {
      margin: theme.spacing.unit * 3,
      width: '30vh',
      alignSelf: 'center',
    },
    title: {
      alignItems: 'flex-end',
      paddingLeft: 100,
    },
    timeTitle: {
      display: 'flex',
      alignItems: 'flex-end',
    },
  };
};

function RulesList(props) {
  const { users } = props;
  return (
    <div className={props.classes.tabContainer}>
      <div className={props.classes.headerContainer}>
        <Typography
          component="h1"
          variant="h5"
          className={props.classes.title}
        >
          Waiting List
      </Typography>
        <Typography
          className={props.classes.title}
        >
          {props.time}
        </Typography>
      </div>
      {
        map(users, (each, index) => {
          return <div className={props.classes.tabContainer} key={each}>{`${index + 1}. ${each.username}`}</div>;
        })
      }
    </div>
  );
}

class WaitingComponent extends Component {
  constructor(props) {
    super(props);
    const startTime = moment(props.gameStarted);
    const currentTime = moment();
    let timeDiff = currentTime.diff(startTime, 'seconds');
    console.log('-----', props.gameStarted, currentTime, startTime, timeDiff);

    timeDiff = 60 > timeDiff ? (60 - timeDiff) : 0;
    this.state = {
      time: timeDiff,
    }
  }

  componentDidMount() {
    this.updateTime();
    this.props.fetchQuestion(1);
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  updateTime = () => {
    this.setTimer = setInterval(() => {
      const { gameId, players } = this.props;
      if (this.state.time === 0 || (players && players.length === 10)) {
        this.props.startGame();
        clearInterval(this.setTimer);
      } else {
        this.props.fetchWaitingListPlayers(gameId);
        this.setState((prevState) => {
          return { time: prevState.time - 1 };
        });
      }
    }, 1000);
  }

  render() {

    const { classes, players } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <RulesList
            classes={classes}
            time={this.state.time}
            users={players || []}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => this.props.leaveGame()}
          >
            Leave Game
      </Button>
        </Paper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    gameId: state.game.gameId,
    players: state.game.players,
    gameStarted: state.game.gameStarted,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaitingComponent));
