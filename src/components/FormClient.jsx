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
import { Form, Field, reduxForm } from 'redux-form';
import './style.less';
import TableBankDetail from '../containers/TableBankDetail';
import { isEmail, required } from './validators';

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

  handleChangeTab= (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleChangeSwitch = (e) => {
    const { activeCompany, updateActiveCompany } = this.props;
    const newCompany = { ...activeCompany, is_owner: e.target.checked };
    updateActiveCompany(newCompany);
  };

  handleSubmit = (form) => {
    if (this.props.valid) {
      this.props.updateCompany(form);
      this.props.resetUpdate();
    }
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

  renderSwitchField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <FormControlLabel
      control={<Switch color='primary' />}
      label={label}
      labelPlacement='start'
      {...input}
      {...custom}
    />
  );


  render() {
    const { classes, activeCompany } = this.props;
    const { tabValue } = this.state;
    const { is_owner } = activeCompany;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
                  <Grid container item md={6} sm={12}>
                    <Grid container md={12} sm={12}>
                      <Typography className={classes.typography} component='h1' variant='h5'>
                        Основная информация
                      </Typography>
                    </Grid>
                    <Grid className={classes.grid} container xs={12} md={12} sm={12}>
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
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                    >
                      <Grid className={classes.grid} item xs={12} md={6} sm={12}>
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
                      <Grid className={classes.grid} item xs={12} md={6} sm={12}>
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
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container xs={12} md={12}>
                      <Typography className={classes.typography} component='h1' variant='h5'>
                        Реквизиты компании
                      </Typography>
                    </Grid>
                    <Grid className={classes.grid} container xs={12} sm={12} md={12}>
                      <Field
                        name='registered_name'
                        component={this.renderTextField}
                        type='text'
                        label='Наименование юр. лица'
                        validate={[required('Необходимо заполнить «Наименование юр. лица».')]}
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
                          name='bin_iin'
                          component={this.renderTextField}
                          type='text'
                          label='БИН/ИИН'
                          validate={[required('Необходимо заполнить «БИН/ИИН».')]}
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
                          name='leader'
                          component={this.renderTextField}
                          type='text'
                          label='Руководитель'
                          validate={[required('Необходимо заполнить «Руководитель».')]}
                          required
                          className={classes.input}
                          size='small'
                          InputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                        />
                      </Grid>
                      <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                        <Field
                          name='leader_position'
                          component={this.renderTextField}
                          type='text'
                          label='Должность руководителя'
                          validate={[required('Необходимо заполнить «Должность руководителя».')]}
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
                          name='registered_address'
                          component={this.renderTextField}
                          type='text'
                          label='Юридический адрес'
                          validate={[required('Необходимо заполнить «Юридический адрес».')]}
                          required
                          className={classes.input}
                          size='small'
                          InputProps={{ style: { fontSize: 12 } }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                        />
                      </Grid>
                      <Grid className={classes.grid} item xs={12} sm={12} md={6}>
                        <Field
                          name='address'
                          component={this.renderTextField}
                          type='text'
                          label='Физический адрес'
                          validate={[required('Необходимо заполнить «Физический адрес».')]}
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
                            name='is_owner'
                            component={this.renderSwitchField}
                            type='text'
                            label='Платильщик НДС(нет/да)'
                            required
                            labelPlacement='start'
                            className={classes.switch}
                            checked={is_owner}
                            value={is_owner}
                            onChange={this.handleChangeSwitch}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} >
                    <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                      <Button type='submit' variant='contained' color='primary' >
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
      </Form>
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
export default reduxForm({
  form: 'client',
  destroyOnUnmount: false,
  enableReinitialize: true,
  // validate: () => {},
})(withTheme(withStyles(useStyles)(FormClient)));
