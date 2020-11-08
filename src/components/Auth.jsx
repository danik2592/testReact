import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Form, Field, reduxForm } from 'redux-form';
import { Snackbar, Grid, Paper, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import MuiAlert from '@material-ui/lab/Alert';
import { required, isEmail } from './validators';
import './style.less';

class Auth extends React.Component {
    static propTypes = {
      isValid: PropTypes.bool.isRequired,
      msgError: PropTypes.string.isRequired,
      classes: PropTypes.object.isRequired,
      authUser: PropTypes.func.isRequired,
      resetErrorAuth: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        showPass: false,
      };
    }
    handleShowPassword = () => {
      this.setState(prevState => ({
        showPass: !prevState.showPass,
      }));
    };

  handleSubmit = (form) => {
    if (this.props.valid) {
      this.props.authUser(form.email, form.password);
    }
    console.log('submit invalid', form);
  }

  handleCloseAlert = () => {
    this.props.resetErrorAuth();
  }

  renderTextField = ({
                             label,
                             input,
                             meta: { touched, invalid, error },
                             ...custom
                           }) => (
    <TextField
      label={label}
      placeholder={label}
      variant='outlined'
      fullWidth
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    const { classes, msgError } = this.props;
    const { showPass } = this.state;

    return (
      <Fragment>
        <Snackbar onClose={this.handleCloseAlert} anchorOrigin={{ vertical:'top', horizontal:'right' }} open={!isEmpty(msgError)} autoHideDuration={1000}>
          <MuiAlert severity='error' elevation={6} variant='filled' >
            {msgError}
          </MuiAlert>
        </Snackbar>
        <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
            <Grid container item xs={12} md={4} sm={12} >
              <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
                <Paper className={classes.paper} elevation={3}>
                  <Grid
                    item
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
                  >
                    <Field
                      name='email'
                      component={this.renderTextField}
                      type='text'
                      label='Email'
                      validate={[required('Необходимо заполнить «Email».'), isEmail]}
                      required
                      className={classes.input}
                    />

                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='flex-end'
                    alignItems='center'
                  >
                    <Field
                      name='password'
                      component={this.renderTextField}
                      type={showPass ? 'text' : 'password'}
                      label='Пароль'
                      className={classes.input}
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
                      validate={[required('Необходимо заполнить «Пароль».')]}
                      required
                    />

                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='flex-end'
                    alignItems='center'
                  >
                    <Button type='submit' className={classes.btn} variant='contained' color='primary' disableElevation>
                      Войти
                    </Button>
                  </Grid>

                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Form>
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

export default reduxForm({
  form: 'auth',
  destroyOnUnmount: false,
  // validate: () => {},
})(withTheme(withStyles(useStyles)(Auth)));
