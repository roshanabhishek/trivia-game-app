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
    paper: {
      width: 550,
      marginTop: theme.spacing.unit * 3,
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tabContainer: {
      padding: theme.spacing.unit * 3,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    title: {
    },
    question: {
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
    },
    optionContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
    },
    option: {
      paddingLeft: 5,
    },
  };
};

function RulesList(props) {
  const { question, options, index, totalQuestion } = props.questionData;
  return (
    <div className={props.classes.tabContainer}>
      <div className={props.classes.headerContainer}>
        <Typography
          component="h1"
          variant="h5"
          className={props.classes.title}
        >
          {index} out of {totalQuestion}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          className={props.classes.title}
        >
          {props.timer}s
      </Typography>
      </div>
      <Typography
        component="h1"
        variant="h5"
        className={props.classes.question}
      >
        {question}
      </Typography>
      {
        map(options, (each, index) => {
          return <div key={each} className={props.classes.optionContainer} onClick={() => props.onChange(index + 1)}>
            <input
              type="radio"
              value={each}
              name="option"
              defaultChecked={each === "MALE"}
              onChange={() => props.onChange(index + 1)}
            />
            <Typography
              component="h1"
              variant="h5"
              className={props.classes.option}
            >
              {index + 1}. {each}
            </Typography>
          </div>;
        })
      }
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={props.classes.submit}
        onClick={() => props.onClickJoin()}
        disabled={props.option === ''}
      >
        Submit
      </Button> */}
    </div>
  );
}

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0,
      timer: 10,
      timeTaken: 0,
    }
  }

  componentDidMount() {
    this.updateTime();
    const { username, gameId } = this.props;
    this.props.fetchPlayerResult({ username, gameId });
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  onOptionChange = (value) => {
    this.setState((prevState) => {
      const option = value;
      const timeTaken = 10 - prevState.timer;
      return { option, timeTaken };
    })
  }

  updateTime = () => {
    this.setTimer = setInterval(() => {
      const { username, gameId } = this.props;
      if (this.state.timer === 0) {
        const params = {
          username,
          gameId,
          index: this.props.index,
          answer: this.state.option,
          timeTaken: this.state.timeTaken,
        }
        this.props.updateAnswer(params);
        this.setState({ option: 0, timer: 10, timeTaken: 0 })
        if (this.props.index === 15) {
          this.props.fetchPlayerResult({ username, gameId });
          clearInterval(this.setTimer);
        } else {
          this.props.fetchQuestion(this.props.index + 1);
        }
      } else {
        this.setState((prevState) => {
          return { timer: prevState.timer - 1 };
        });
      }
    }, 1000);
  }

  render() {
    const { classes, questionData } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <RulesList
            classes={classes}
            timer={this.state.timer}
            questionData={questionData}
            option={this.state.option}
            onChange={this.onOptionChange}
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
    questionData: state.game.questionData,
    gameId: state.game.gameId,
    index: state.game.index,
    username: state.auth.username,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameComponent));
