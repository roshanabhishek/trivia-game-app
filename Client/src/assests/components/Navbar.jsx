const styles = (theme) => {
    return {
      appBar: {
        background: '#7B80D1',
        zIndex: theme.zIndex.drawer + 1,
        padding: 10,
      },
      appBarSpacer: theme.mixins.toolbar,
      title: {
        flexGrow: 1,
      },
      wrapper: {
        marginRight: theme.spacing.unit * 3,
        position: 'relative',
      },
      buttonProgress: {
        color: theme.palette.primary.light,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
    };
  };
  
  export default styles;
  