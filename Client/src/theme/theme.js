import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto Condensed',
      'sans-serif',
    ].join(','),
  },
});
