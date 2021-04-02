import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

function createData(id, name, timeTaken, totalScore) {
  return { id, name, timeTaken, totalScore };
}

const data = [
  createData(1, 'rosdjknfks', 23, 10),
  createData(2, 'ujser 2', 26, 'sssss', 0),
  createData(3, 'user 3', 30, 0),
  createData(4, 'user 4', 30, 10),
  createData(5, 'user 5', 65, 10),
]
function TableComponent(props) {
  const { classes, data } = props
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="left">User Id</TableCell>
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
  render() {
    const { classes } = this.props;

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Leaderboard));
