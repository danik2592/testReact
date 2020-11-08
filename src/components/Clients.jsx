import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Container, Grid, Paper, TextField, InputAdornment } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import isEmpty from 'lodash/isEmpty';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Form, Field, reduxForm } from 'redux-form';
import { LogoIcon } from '../constants/app-constants';
import TableClients from '../containers/TableClients';
import FormClient from '../containers/FormClient';
import {isEmail, required} from "./validators";



const drawerWidth = 250;

class Clients extends React.Component {
  static propTypes = {
    // isAuth: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    activeCompany: PropTypes.arrayOf(PropTypes.object).isRequired,
    getCompanies: PropTypes.func.isRequired,
    addCompany: PropTypes.func.isRequired,
    exitApp: PropTypes.func.isRequired,
    resetUpdate: PropTypes.func.isRequired,
    activeCompanyId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      showDialog: false,
    };
  }

  componentDidMount() {
    this.props.getCompanies();
  }

  handleDrawerToggle = () => {
    this.setState(prevState => ({
      mobileOpen: !prevState.mobileOpen,
    }));
  };

  handleCreateCompany = () => {
    this.setState(prevState => ({
      showDialog: !prevState.showDialog,
    }));
  };

  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };

  handleCloseApp = () => {
    this.props.exitApp();
  };
  handleResetUpdate = () => {
    this.props.resetUpdate();
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
  )

  handleSubmit = (form) => {
    if (this.props.valid) {
      this.setState({ showDialog: false });
      this.props.addCompany(form);
    }
  }

  renderDialog = () => {
    const {
      showDialog,
    } = this.state;
    const { classes } = this.props;
    return (
      <Dialog open={showDialog} onClose={this.handleCloseDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle className={classes.dialogTitle} id='form-dialog-title'>Добавить клиента</DialogTitle>
        <DialogContent>
          <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Grid item xs={12} md={12}>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.grid} container xs={12} sm={12} md={6}>
                <Field
                  name='name'
                  component={this.renderTextField}
                  type='text'
                  label='Наименование компании'
                  validate={[required('Необходимо заполнить «Наименование компании».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
              <Grid className={classes.grid} container xs={12} sm={12} md={6}>
                <Field
                  name='shortname'
                  component={this.renderTextField}
                  type='text'
                  label='Короткое завание'
                  validate={[required('Необходимо заполнить «Короткое завание».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='registered_type'
                  component={this.renderTextField}
                  type='text'
                  label='Тип юр. лица'
                  validate={[required('Необходимо заполнить «Тип юр. лица».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='workscope'
                  component={this.renderTextField}
                  type='text'
                  label='Сфера деятельности'
                  validate={[required('Необходимо заполнить «Сфера деятельности».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='region'
                  component={this.renderTextField}
                  type='text'
                  label='Регион'
                  validate={[required('Необходимо заполнить «Регион».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='city'
                  component={this.renderTextField}
                  type='text'
                  label='Город'
                  validate={[required('Необходимо заполнить «Город».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='email'
                  component={this.renderTextField}
                  type='text'
                  label='Email'
                  validate={[required('Необходимо заполнить «Email».'), isEmail]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <Field
                  name='phone'
                  component={this.renderTextField}
                  type='text'
                  label='Телефон'
                  validate={[required('Необходимо заполнить «Телефон».')]}
                  required
                  className={classes.input}
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                />
              </Grid>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
                <Grid className={classes.grid} item xs={12} sm={12} md={12}>
                  <Field
                    name='description'
                    component={this.renderTextField}
                    type='text'
                    label='Дополнительно(описание)'
                    className={classes.input}
                    size='small'
                    multiline
                    rows={4}
                    InputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='flex-end'

              >
                <Grid className={classes.gridBtn} item xs={12} sm={12} md={3}>
                  <Button type='submit' fullWidth className={classes.btn} variant='contained' color='primary' >
                    Добавить
                  </Button>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };

  render() {
    const {
      classes, activeCompanyId, activeCompany, theme,
    } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} >
          <img className={classes.logo} src={LogoIcon} />
        </div>
        <List className={classes.list}>
          <ListItem onClick={this.handleResetUpdate} className={{ root: classes.listItem, selected: {} }} selected button key={1}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary='Клиенты' />
          </ListItem>
          <ListItem className={classes.listItemExit} onClick={this.handleCloseApp} button key={2}>
            <ListItemIcon><ExitToAppIcon className={classes.listItemExit} /></ListItemIcon>
            <ListItemText primary='Выход' />
          </ListItem>
        </List>
      </div>
    );

    const container = this.window !== undefined ? () => this.window().document.body : undefined;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar elevation={1} color='default' position='fixed' className={classes.appBar}>
          <Toolbar >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typography} color='textPrimary' variant='h6' noWrap>
              {isEmpty(activeCompanyId) ? 'Клиенты' : activeCompany.name}
            </Typography>
            {isEmpty(activeCompanyId) && <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
              <Button startIcon={<AddIcon />} onClick={this.handleCreateCompany} variant='contained' color='primary' >
                Добавить
              </Button>
            </Grid>}
            {isEmpty(activeCompanyId) && this.renderDialog()}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label='mailbox folders'>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {isEmpty(activeCompanyId) && <TableClients />}
          {!isEmpty(activeCompanyId) && <FormClient />}
        </main>
      </div>
    );
  }
}
const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  listItemExit: {
    color: 'red',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.41)',
      color: 'red',
    },
  },
  listItem: {
    '&$focusVisible': {
      backgroundColor: 'rgba(0, 123, 255, 0.41)',
    },
    '&$selected': {
      backgroundColor: 'rgba(0, 123, 255, 0.41)',
    },
    '&$selected:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.41)',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.41)',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    width: theme.spacing(21.125),
    height: theme.spacing(6.5),
    marginLeft: theme.spacing(4.375),
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5.75),
  },
  list: {
    marginTop: theme.spacing(3.625),
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
  },
  typography: {
    width: theme.spacing(20),
  },
  grid: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  gridBtn: {
    marginRight: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(3.5),
    // marginRight: theme.spacing(2),
    // marginLeft: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(3.5),
    width: '100%',
  },
});
export default reduxForm({
  form: 'newClient',
  destroyOnUnmount: false,
  // validate: () => {},
})(withTheme(withStyles(useStyles)(Clients)));
