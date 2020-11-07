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
import { LogoIcon } from '../constants/app-constants';
import TableClients from '../containers/TableClients';
import FormClient from '../containers/FormClient';


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
      name: '',
      shortName: '',
      registered_type: '',
      workscope: '',
      region: '',
      city: '',
      email: '',
      phone: '',
      addition: '',
      isValidFormDialog: true,
      nameError: '',
      shortNameError: '',
      typeError: '',
      workscopeError: '',
      regionError: '',
      cityError: '',
      emailError: '',
      phoneError: '',
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

  validateForm = () => {
    const {
      name, shortName, registered_type, workscope, region, city, phone, email,
    } = this.state;
    this.setState({
      nameError: '',
      shortNameError: '',
      typeError: '',
      workscopeError: '',
      regionError: '',
      cityError: '',
      emailError: '',
      phoneError: '',
      isValidFormDialog: true,
    });
    if (isEmpty(name)) {
      this.setState({ nameError: 'Заполните поле «Наименование компании»', isValidFormDialog: false });
    }
    if (isEmpty(shortName)) {
      this.setState({ shortNameError: 'Заполните поле «Короткое название»', isValidFormDialog: false });
    }
    if (isEmpty(registered_type)) {
      this.setState({ typeError: 'Заполните поле «Тип юр. лица»', isValidFormDialog: false });
    }
    if (isEmpty(workscope)) {
      this.setState({ workscopeError: 'Заполните поле «Сфера деятельности»', isValidFormDialog: false });
    }
    if (isEmpty(region)) {
      this.setState({ regionError: 'Заполните поле «Регион»', isValidFormDialog: false });
    }
    if (isEmpty(city)) {
      this.setState({ cityError: 'Заполните поле «Город»', isValidFormDialog: false });
    }
    if (isEmpty(phone)) {
      this.setState({ phoneError: 'Заполните поле «Телефон»', isValidFormDialog: false });
    }
    if (isEmpty(email)) {
      this.setState({ emailError: 'Заполните поле «Email»', isValidFormDialog: false });
    }
  };

  handleSumbitCompany = () => {
    const {
      isValidFormDialog, name, shortName, registered_type, workscope, region, city, phone, addition,
    } = this.state;
    this.validateForm();
    if (isValidFormDialog) {
      this.setState({ showDialog: false });
      this.props.addCompany({
        name, shortName, registered_type, workscope, region, city, phone, addition,
      });
    }
  };
  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };
  handleChangeInput = (e, name) => {
    this.setState({ [name]: e.target.value });
  };

  handleCloseApp = () => {
    this.props.exitApp();
  };
  handleResetUpdate = () => {
    this.props.resetUpdate();
  }
  renderDialog = () => {
    const {
      showDialog, nameError, shortNameError, emailError, typeError, workscopeError, regionError, cityError, phoneError,
    } = this.state;
    const { classes } = this.props;
    return (
      <Dialog open={showDialog} onClose={this.handleCloseDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle className={classes.dialogTitle} id='form-dialog-title'>Добавить клиента</DialogTitle>
        <DialogContent>
          <Grid item xs={12} md={12}>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid className={classes.grid} container xs={12} sm={12} md={6}>
                <TextField
                  error={!isEmpty(nameError)}
                  helperText={nameError}
                  className={classes.input}
                  required
                  id='name'
                  label='Наименование компании'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'name')}
                />
              </Grid>
              <Grid className={classes.grid} container xs={12} sm={12} md={6}>
                <TextField
                  error={!isEmpty(shortNameError)}
                  helperText={shortNameError}
                  className={classes.input}
                  required
                  id='shortName'
                  label='Короткое название'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'shortName')}
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
                <TextField
                  error={!isEmpty(typeError)}
                  helperText={typeError}
                  className={classes.input}
                  required
                  id='registered_type'
                  label='Тип юр. лица'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'registered_type')}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <TextField
                  error={!isEmpty(workscopeError)}
                  helperText={workscopeError}
                  className={classes.input}
                  required
                  id='workscope'
                  label='Сфера деятельности'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'workscope')}
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
                <TextField
                  error={!isEmpty(regionError)}
                  helperText={regionError}
                  className={classes.input}
                  required
                  id='region'
                  label='Регион'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'region')}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <TextField
                  error={!isEmpty(cityError)}
                  helperText={cityError}
                  className={classes.input}
                  required
                  id='city'
                  label='Город'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'city')}
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
                <TextField
                  error={!isEmpty(emailError)}
                  helperText={emailError}
                  className={classes.input}
                  required
                  id='email'
                  label='Email'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'email')}
                />
              </Grid>
              <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                <TextField
                  error={!isEmpty(phoneError)}
                  helperText={phoneError}
                  className={classes.input}
                  required
                  id='phone'
                  label='Телефон'
                  defaultValue=''
                  variant='outlined'
                  size='small'
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  onChange={e => this.handleChangeInput(e, 'phone')}
                />
              </Grid>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
                <Grid className={classes.grid} item xs={12} sm={12} md={12}>
                  <TextField
                    className={classes.input}
                    required
                    id='addition'
                    label='Дополнительно(описание)'
                    defaultValue=''
                    variant='outlined'
                    size='small'
                    multiline
                    rows={4}
                    InputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    onChange={e => this.handleChangeInput(e, 'addition')}
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
                <Button fullWidth className={classes.btn} variant='contained' color='primary' onClick={this.handleSumbitCompany} >
                  Добавить
                </Button>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  render() {
    const { classes, activeCompanyId, activeCompany, theme } = this.props;
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
        <AppBar elevation={1} color={"default"} position='fixed' className={classes.appBar}>
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
export default withTheme(withStyles(useStyles)(Clients));
