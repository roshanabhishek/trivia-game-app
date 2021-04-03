import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  Paper,
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ActionCreators from '../actions';

const styles = (theme) => {
  return {
    table: {
      minWidth: 650,
    },
  };
};

function createData(id, name, correct, incorrect, unanswered, timeTaken, totalScore) {
  return { id, name, correct, incorrect, unanswered, timeTaken, totalScore };
}

const prepareData = (data) => {
  return _.map(data, (each, index) => createData(index + 1, each.username, each.correct, each.incorrect, each.unanswered, each.timeTaken, each.score));
}

function TableComponent(props) {
  const { classes, data } = props
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="left">User Id</TableCell>
            <TableCell align="center">Correct Answers</TableCell>
            <TableCell align="center">Incorrect Answers</TableCell>
            <TableCell align="center">Not Attempted</TableCell>
            <TableCell align="center">Time Taken&nbsp;(seconds)</TableCell>
            <TableCell align="center">Total Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.question}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.correct}</TableCell>
              <TableCell align="center">{row.incorrect}</TableCell>
              <TableCell align="center">{row.unanswered}</TableCell>
              <TableCell align="center">{row.timeTaken}</TableCell>
              <TableCell align="center">{row.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchLeaderboard(this.props.gameId);
  }
  render() {
    const { classes, leaderboard } = this.props;
    const data = prepareData(leaderboard);
    return (
      <div style={{ height: 400, width: '100%' }}>
        <TableComponent
          classes={classes}
          data={data}
        />
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
    leaderboard: state.game.leaderboard,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Leaderboard));
