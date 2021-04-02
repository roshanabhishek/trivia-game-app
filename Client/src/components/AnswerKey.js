import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import {
  Paper,
  Button,
  Typography,
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
    submit: {
      marginTop: 10,
      width: '30vh',
      alignSelf: 'flex-end',
    },
  };
};

function createData(id, question, acutal, expected, score) {
  return { id, question, acutal, expected, score };
}

const data = [
  createData(1, 'askjafkjdnakjdfnkajdfnkajdndfkjnjkdvsbak', 'a', 'a', 10),
  createData(2, 'Ice cream sandwich', 'aaasaaa', 'sssss', 0),
  createData(3, 'Eclair', 'a', 'b', 0),
  createData(4, 'Cupcake', 'ffffff', 'fffff', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
  createData(5, 'Gingerbread', 'adfaf', 'adadad', 10),
]
function TableComponent(props) {
  const { classes, data } = props
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell style={{ width: '20%' }} align="left">Question</TableCell>
            <TableCell align="left">Actual</TableCell>
            <TableCell align="left">Expected</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">{row.acutal}</TableCell>
              <TableCell align="left">{row.expected}</TableCell>
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
    const { classes } = this.props;

    return (
      <div style={{ 
        height: '100vh',
         width: '100%', 
         display: 'flex', 
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AnswerKey));
