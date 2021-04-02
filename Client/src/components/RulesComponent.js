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

import ActionCreators from '../actions';

const styles = (theme) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      width: 400,
      marginTop: theme.spacing.unit * 3,
    },
    buttons: {
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    tabContainer: {
      padding: theme.spacing.unit * 3,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
    },
  };
};

const rules = [
  '1. Instructions',
  '2. Please dont open new tab',
  '3. Instructions 3',
  '4. Dont use external tools for answer',
]
function RulesList(props) {
  return (
    <div className={props.classes.tabContainer}>
      <Typography
        component="h1"
        variant="h5"
        className={props.classes.title}
      >
        Game Rules
      </Typography>
      {
        map(rules, each => {
          return <div key={each}>{each}</div>;
        })
      }
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={props.classes.submit}
        onClick={() => props.onClickJoin()}
      >
        Join
      </Button>
    </div>
  );
}

class RulesComponent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <RulesList
            classes={classes}
            onClickJoin={this.props.onClickJoin}
          />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RulesComponent));
