import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  Paper,
  Button,
} from '@material-ui/core';
import _ from 'lodash';

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
    submit: {
      marginTop: 10,
      width: '30vh',
      alignSelf: 'flex-end',
    },
  };
};

function createData(id, question, actual, expected, score) {
  return { id, question, actual, expected, score };
}

const prepareData = (list) => {
  return _.map(list, each => createData(each.index, each.question, each.actual, each.expected, each.score))
}

function TableComponent(props) {
  const { classes, data } = props
  console.log('data', data);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell style={{ width: '30%' }} align="left">Question</TableCell>
            <TableCell style={{ width: '30%' }} align="left">Actual</TableCell>
            <TableCell style={{ width: '30%' }} align="left">Expected</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{ width: '30%' }} align="left">{row.question}</TableCell>
              <TableCell style={{ width: '30%' }} align="left">{row.actual}</TableCell>
              <TableCell style={{ width: '30%' }} align="left">{row.expected}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

class AnswerKey extends Component {
  render() {
    const { classes, playersResult } = this.props;
    const data = prepareData(playersResult)
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
      }}>
        <TableComponent
          classes={classes}
          data={data}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => this.props.finshGame()}
        >
          Check Leaderboard
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    playersResult: state.game.playersResult,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnswerKey));
