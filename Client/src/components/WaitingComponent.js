import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import {
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
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    paper: {
      width: 400,
      marginTop: theme.spacing.unit * 3,
    },
    tabContainer: {
      padding: theme.spacing.unit * 3,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    title: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    timeTitle: {
      display: 'flex',
      alignItems: 'flex-end',
    },
  };
};

const users = [
  '1. Roshan',
  '2. Abhishek',
  '3. DUmmy Name',
  '4. Dummy Name',
  '5. Dummy Value',
  '6. Second Name',
]
function RulesList(props) {
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
        map(users, each => {
          return <div key={each}>{each}</div>;
        })
      }
    </div>
  );
}

class WaitingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
    }
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  updateTime = () => {
    this.setTimer = setInterval(() => {
      if (this.state.time === 0) {
        this.props.startGame();
        clearInterval(this.setTimer);
      } else {
        this.setState((prevState) => {
          return { time: prevState.time - 1 };
        });
      }
    }, 1000);
  }

  render() {
    
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <RulesList
            classes={classes}
            time={this.state.time}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaitingComponent));
