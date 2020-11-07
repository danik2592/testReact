import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import './style.less';
import TableBankDetail from '../containers/TableBankDetail';

class TabPanel extends React.Component {
  render() {
    const {
      children, value, index, ...other
    } = this.props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
}

class FormClient extends React.Component {
  static propTypes = {
    activeCompanyId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    getCompanyDetail: PropTypes.func.isRequired,
    updateActiveCompany: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
    resetUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  componentDidMount() {
    this.props.getCompanyDetail(this.props.activeCompanyId);
  }

  handleChangeInput = (e, name) => {
    const { activeCompany, updateActiveCompany } = this.props;
    const newCompany = { ...activeCompany, [name]: e.target.value };
    updateActiveCompany(newCompany);
  };

  handleChangeTab= (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleSumbitForm = () => {
    this.props.updateCompany(this.props.activeCompany);
    this.props.resetUpdate();
  };

  handleChangeSwitch = (e) => {
    const { activeCompany, updateActiveCompany } = this.props;
    const newCompany = { ...activeCompany, is_owner: e.target.checked };
    updateActiveCompany(newCompany);
  };

  render() {
    const { classes, activeCompany } = this.props;
    const { tabValue } = this.state;
    const {
      name, shortname, city, region, workscope, email, phone, description, registered_name,
      registered_type, bin_iin, address, leader, leader_position, registered_address, is_owner,
    } = activeCompany;
    return (
      <Grid container direction='row' justify='center' alignItems='center' spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Tabs
              className={classes.tabs}
              value={tabValue}
              onChange={this.handleChangeTab}
              indicatorColor='primary'
              textColor='primary'
            >
              <Tab className={classes.tab} label='ИНФОРМАЦИЯ' />
              <Tab label='БАНКОВСКИЕ РЕКВИЗИТЫ' />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='flex-start'
              >
                <Grid item xs={6} md={6}>
                  <Grid container xs={12} md={12}>
                    <Typography className={classes.typography} component='h1' variant='h5'>
                      Основная информация
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container xs={12} md={12}>
                    <TextField
                      // error={!isEmpty(errorEmail)}
                      // helperText={errorEmail}
                      className={classes.input}
                      required
                      id='name'
                      label='Наименование компании'
                      value={name}
                      defaultValue={name}
                      variant='outlined'
                      size='small'
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      onChange={e => this.handleChangeInput(e, 'name')}
                    />
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='shortname'
                        label='Короткое завание'
                        value={shortname}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'shortname')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='workscope'
                        label='Сфера деятельности'
                        value={workscope}
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
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='region'
                        label='Регион'
                        value={region}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'region')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='city'
                        label='Город'
                        value={city}
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
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='email'
                        label='Email'
                        value={email}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'email')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='phone'
                        label='Телефон'
                        value={phone}
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
                      <Grid className={classes.grid} item xs={12} md={12}>
                        <TextField
                          // error={!isEmpty(errorEmail)}
                          // helperText={errorEmail}
                          className={classes.input}
                          required
                          id='description'
                          label='Дополнительно(описание)'
                          value={description}
                          variant='outlined'
                          size='small'
                          multiline
                          rows={4}
                          InputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          onChange={e => this.handleChangeInput(e, 'description')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} md={6}>
                  <Grid container xs={12} md={12}>
                    <Typography className={classes.typography} component='h1' variant='h5'>
                      Реквизиты компании
                    </Typography>
                  </Grid>
                  <Grid className={classes.grid} container xs={12} md={12}>
                    <TextField
                      // error={!isEmpty(errorEmail)}
                      // helperText={errorEmail}
                      className={classes.input}
                      required
                      id='registered_name'
                      label='Наименование юр. лица'
                      value={registered_name}
                      variant='outlined'
                      size='small'
                      InputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      onChange={e => this.handleChangeInput(e, 'registered_name')}
                    />
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='registered_type'
                        label='Тип юр. лица'
                        value={registered_type}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'registered_type')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='bin_iin'
                        label='БИН/ИИН'
                        value={bin_iin}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'bin_iin')}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='leader'
                        label='Руководитель'
                        value={leader}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'leader')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='leader_position'
                        label='Должность руководителя'
                        value={leader_position}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'leader_position')}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                  >
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='registered_address'
                        label='Юридический адрес'
                        value={registered_address}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'registered_address')}
                      />
                    </Grid>
                    <Grid className={classes.grid} item xs={6} md={6}>
                      <TextField
                        // error={!isEmpty(errorEmail)}
                        // helperText={errorEmail}
                        className={classes.input}
                        required
                        id='address'
                        label='Физический адрес'
                        value={address}
                        variant='outlined'
                        size='small'
                        InputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={e => this.handleChangeInput(e, 'address')}
                      />
                    </Grid>
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                    >
                      <Grid className={classes.grid} item xs={12} md={12}>
                        <FormControlLabel
                          className={classes.switch}
                          checked={is_owner}
                          value={is_owner}
                          onChange={this.handleChangeSwitch}
                          control={<Switch color='primary' />}
                          label='Платильщик НДС(нет/да)'
                          labelPlacement='start'
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} >
                  <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                    <Button onClick={this.handleSumbitForm} variant='contained' color='primary' >
                      Сохранить
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TableBankDetail />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    borderBottom: '1px solid #e8e8e8',
  },
  tab: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  switch: {
    marginTop: theme.spacing(3.25),
    fontSize: 12,
    marginLeft: 0,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(3.5),
    width: '100%',
  },
  typography: {
    paddingLeft: 15,
  },
  btn: {
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(4.875),
    marginRight: theme.spacing(2.25),
    width: theme.spacing(12.375),
    height: theme.spacing(4.5),
  },
});
export default withTheme(withStyles(useStyles)(FormClient));
