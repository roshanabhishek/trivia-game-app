const styles = (theme) => {
  return {
    main: {
      width: 'auto',
      display: 'block',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      height: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      boxShadow: '2px 2px 5px gray',
    },
    form: {
      width: '100%',
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: 'center',
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    wrapper: {
      margin: theme.spacing.unit,
      position: 'relative',
    },
    logoProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  };
};

export default styles;