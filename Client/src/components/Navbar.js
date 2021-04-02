import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CircularProgress,
  LinearProgress,
  Collapse,
  Fade,
} from '@material-ui/core';

import { PowerSettingsNew } from '@material-ui/icons';

import styles from '../assests/components/Navbar';

function Navbar(props) {
  const { classes } = props;

  return (
    <AppBar
      position="absolute"
      className={classNames(classes.appBar)}
    >
      <Toolbar disableGutters className={classes.appBarSpacer}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Trivia Game App
        </Typography>

        <div className={classes.wrapper}>
          <IconButton
            color="inherit"
            onClick={props.handleLogout}
            disabled={props.loggingOut}
          >
            <PowerSettingsNew />
          </IconButton>
          {props.loggingOut && <CircularProgress size={60} className={classes.buttonProgress} />}
        </div>
      </Toolbar>
      <Collapse in={props.fetching}>
        <Fade in={props.fetching} timeout={1000}>
          <LinearProgress />
        </Fade>
      </Collapse>
    </AppBar>
  );
}

export default withStyles(styles)(Navbar);
