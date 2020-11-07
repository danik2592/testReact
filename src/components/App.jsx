import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import blue from '@material-ui/core/colors/blue';
import './style.less';
import Auth from '../containers/Auth';
import Clients from '../containers/Clients';
import {checkAuthToken} from "../actions";


class App extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    checkAuthToken: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const token = sessionStorage.getItem('accessToken');
    console.log(token);
    await this.props.checkAuthToken(token);
  }

  render() {
    const { isAuth } = this.props;
    console.log(isAuth);
    const theme = createMuiTheme({
        MuiListItem: {
          root: {
            "&$selected": {
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "orange",
              },
            },
          },
          button: {
            "&:hover": {
              backgroundColor: "yellow",
            },
          },
        },
      palette: {
        primary: {
          main: '#007BFF',
        },
        secondary: blue,
        textPrimary: {
          main: '#3D5170',
        },
      },
    }, ruRU);
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          {!isAuth && <Auth />}
          {isAuth && <Clients />}
        </ThemeProvider>
      </Fragment>
    );
  }
}
export default App;
