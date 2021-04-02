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
    },
    option: {
      paddingLeft: 5,
    },
  };
};

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
]
const question = `What is the sdfnsdkjnkj skjdnfksjn
sdjfnskjdfn ksjdfnksjdfnksjd kjndkfjnskdjf kjndkfjnskdjf
sdlkfnslkfn lskdnflksdnlks sdlfnkksndlksndfk lskdnflksdnlks
skdflskdn sdklnsdlknflskdnf`;

function RulesList(props) {
  const { question, options } = props;
  return (
    <div className={props.classes.tabContainer}>
      <div className={props.classes.headerContainer}>
        <Typography
          component="h1"
          variant="h5"
          className={props.classes.title}
        >
          3 out of 15
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
        map(options, each => {
          return <div key={each} className={props.classes.optionContainer}>
            <input
              type="radio"
              value={each}
              name="option"
              defaultChecked={each === "MALE"}
              onChange={props.onChange}
            />
            <Typography
              component="h1"
              variant="h5"
              className={props.classes.option}
            >
              {each}
            </Typography>
          </div>;
        })
      }
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={props.classes.submit}
        onClick={() => props.onClickJoin()}
        disabled={props.option === ''}
      >
        Submit
      </Button>
    </div>
  );
}

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
      timer: 30,
    }
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  updateState = (key, value) => {
    this.setState({ [key]: value });
  }

  onOptionChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.updateState(name, value)
  }
  updateTime = () => {
    this.setTimer = setInterval(() => {
      if (this.state.timer === 0) {
        clearInterval(this.setTimer);
      } else {
        this.setState((prevState) => {
          return { timer: prevState.timer - 1 };
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
            timer={this.state.timer}
            question={question}
            options={options}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GameComponent));
