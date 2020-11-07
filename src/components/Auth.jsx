import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Container, Grid, Paper, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import './style.less';
import {resetErrorAuth, setEmailErrorText, setPasswordErrorText} from '../actions';

class Auth extends React.Component {
    static propTypes = {
      isValid: PropTypes.bool.isRequired,
      errorEmail: PropTypes.string.isRequired,
      errorPassword: PropTypes.string.isRequired,
      classes: PropTypes.object.isRequired,
      authUser: PropTypes.func.isRequired,
      setEmailErrorText: PropTypes.func.isRequired,
      setPasswordErrorText: PropTypes.func.isRequired,
      resetErrorAuth: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        showPass: false,
        email: '',
        password: '',
      };
    }

    handleValidateForm = () => {
      const { email, password } = this.state;
      this.props.resetErrorAuth();
      if (isEmpty(email)) {
        this.props.setEmailErrorText('Заполните поле «Email»', false);
      }
      if (isEmpty(password)) {
        this.props.setPasswordErrorText('Заполните поле «Пароль»', false);
      }
      if (!isEmpty(email) && isEmpty(String(email).match('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$'))) {
        this.props.setEmailErrorText('Неверный формат поля «Email»', false);
      }
    };

    handleShowPassword = () => {
      this.setState(prevState => ({
        showPass: !prevState.showPass,
      }));
    };

   handleOnClickBtn = async () => {
     const { email, password } = this.state;
     const { isValid } = this.props;
     this.handleValidateForm();
     if (isValid) {
       this.props.authUser(email, password);
     }
   };

  handleChangeInput = (e, name) => {
    const { isValid } = this.props;
    this.setState({
      [name]: e.target.value,
    }, () => {
      if (!isValid) {
        this.handleValidateForm();
      }
    });
  };

  render() {
    const { classes, errorEmail, errorPassword } = this.props;
    const { showPass } = this.state;
    return (
      <Fragment>
        <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
          <Grid container item xs={12} md={4} sm={12} >
            <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
              <Paper className={classes.paper} elevation={3}>
                <Grid
                  item
                  // direction='row'
                  // justify='flex-start'
                  // alignItems='center'
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Typography className={classes.typography} component='h1' variant='h5'>
                    Авторизация
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <TextField
                    error={!isEmpty(errorEmail)}
                    helperText={errorEmail}
                    className={classes.input}
                    required
                    id='email'
                    label='Email'
                    defaultValue=''
                    variant='outlined'
                    onChange={e => this.handleChangeInput(e, 'email')}
                  />
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <TextField
                    error={!isEmpty(errorPassword)}
                    helperText={errorPassword}
                    className={classes.input}
                    required
                    id='password'
                    label='Пароль'
                    variant='outlined'
                    type={showPass ? 'text' : 'password'}
                    onChange={e => this.handleChangeInput(e, 'password')}
                    InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='Пароль'
                          onClick={this.handleShowPassword}
                          onMouseDown={this.handleShowPassword}
                        >
                          {showPass ? <Visibility color='primary' /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  />
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  xs={12}
                  sm={12}
                  md={12}
                >
                  <Button onClick={this.handleOnClickBtn} className={classes.btn} variant='contained' color='primary' disableElevation>
                    Войти
                  </Button>
                </Grid>

              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: '10rem',
    maxWidth: theme.spacing(45.5),
    maxHeight: theme.spacing(45.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  typography: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2.25),
    marginBottom: theme.spacing(2.5),
    height: theme.spacing(3.625),
  },
  input: {
    marginTop: theme.spacing(3.5),
    marginLeft: theme.spacing(2.25),
    width: '21rem',
    maxHeight: '100%',
    marginRight: theme.spacing(2.25),
  },
  btn: {
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(4.875),
    marginRight: theme.spacing(2.25),
    width: theme.spacing(12.375),
    height: theme.spacing(4.5),
  },
});
export default withTheme(withStyles(useStyles)(Auth));
