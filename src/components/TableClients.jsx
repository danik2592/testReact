import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme, lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import lowerCase from 'lodash/lowerCase';

class TableClients extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    regions: PropTypes.arrayOf(PopTypes.string).isRequired,
    types: PropTypes.arrayOf(PopTypes.string).isRequired,
    classes: PropTypes.object.isRequired,
    deleteCompanies: PropTypes.func.isRequired,
    activeCompany: PropTypes.func.isRequired,
    tableChangeRowsToPage: PropTypes.func.isRequired,
    tableChangePage: PropTypes.func.isRequired,
    tableChangeFilter: PropTypes.func.isRequired,
    refreshFilter: PropTypes.func.isRequired,
    activeCompanyId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      numSelected: 0,
      order: 'asc',
      orderBy: 'calories',
      page: 0,
      rowsPerPage: 5,
      filterColName: '',
      filterColType: '',
      filterColRegion: '',
      filterColCity: '',
    };
  }

  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === property && order === 'asc';
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  handleChangePage = (event, newPage) => {
    this.props.tableChangePage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    this.props.tableChangeRowsToPage(parseInt(event.target.value, 10));
  };

  handleEditRowTable = (id) => {
    this.props.activeCompany(id);
  };

  handleDeleteRowTable = (id) => {
    this.props.deleteCompanies(id);
  };

  handleFilterTable = (e, name) => {
    this.props.tableChangeFilter(name, e.target.value);
  };

  handleFilterRefresh = () => {
    this.props.refreshFilter();
  }

  render() {
    const { classes, filterColName, filterColType, filterColRegion, filterColCity, rows, page, rowsPerPage, regions, types } = this.props;
    const {
       orderBy, order,
    } = this.state;
    console.log(this.state, this.props);
    // let rows = [...data ];

    console.log('rows', rows);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const descendingComparator = (a, b, orBy) => {
      if (b[orBy] < a[orBy]) {
        return -1;
      }
      if (b[orBy] > a[orBy]) {
        return 1;
      }
      return 0;
    };

    const getComparator = (ord, orBy) => (ord === 'desc'
      ? (a, b) => descendingComparator(a, b, orBy)
      : (a, b) => -descendingComparator(a, b, orBy));

    const stableSort = (array, comparator) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const ord = comparator(a[0], b[0]);
        if (ord !== 0) return ord;
        return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
    };
    const headCells = [
      {
        id: 'name',
        label: 'Наименование компании',
      },
      {
        id: 'registered_type',
        label: 'Тип юр. лица',
      },
      {
        id: 'region',
        label: 'Регион',
      },
      {
        id: 'city',
        label: 'Город',
      },
      {
        id: 'action',
        label: '',
      },
    ];
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar
            className={classes.root}
          >
            <Grid className={classes.filterGrid} container direction='row' justify='space-between' alignItems='center' spacing={3}>
              <Grid container spacing={2} xs={11} md={11} >
                <Grid container item xs={3} md={3}>
                  <TextField
                    className={classes.filterInput}
                    label='Наименование компании'
                    variant='outlined'
                    value={filterColName}
                    size='small'
                    id='mui-theme-provider-outlined-input'
                    InputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    onChange={e => this.handleFilterTable(e, 'filterColName')}
                  />
                </Grid>
                <Grid container item xs={3} md={3}>
                <FormControl size='small' variant='outlined' className={classes.filterInput}>
                  <InputLabel className={classes.filterLabel} htmlFor='outlined-age-native-simple'>тип юр.лица</InputLabel>
                  <Select
                    size='small'
                    native
                    value={filterColType}
                    onChange={e => this.handleFilterTable(e, 'filterColType')}
                    label='тип юр.лица'
                    inputProps={{
                      name: 'filterColType',
                      style: { fontSize: 12 },
                    }}
                  >
                    <option aria-label='' value='' />
                    {types.map(type => (<option key={type} value={type}>{type}</option>))}
                  </Select>
                </FormControl>
                </Grid>
                <Grid container item xs={3} md={3}>
                <FormControl size='small' variant='outlined' className={classes.filterInput}>
                  <InputLabel className={classes.filterLabel} htmlFor='outlined-age-native-simple'>Регион</InputLabel>
                  <Select
                    size='small'
                    native
                    value={filterColRegion}
                    onChange={e => this.handleFilterTable(e, 'filterColRegion')}
                    label='Регион'
                    inputProps={{
                      name: 'filterColRegion',
                      style: { fontSize: 12 },
                    }}
                  >
                    <option aria-label='' value='' />
                    {regions.map(item => (<option key={item} value={item}>{item}</option>))}
                  </Select>
                </FormControl>
                </Grid>
                <Grid container item xs={3} md={3}>
                <TextField
                  className={classes.filterInput}
                  label='Город'
                  variant='outlined'
                  size='small'
                  value={filterColCity}
                  onChange={e => this.handleFilterTable(e, 'filterColCity')}
                  InputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  id='mui-theme-provider-outlined-input'
                />
                </Grid>
              </Grid>
              <Grid container xs={1} md={1}>
                <Grid item >
                  <Tooltip title='Обновить'>
                  <IconButton onClick={this.handleFilterRefresh} aria-label='Обновить'>
                    <ReplayIcon />
                  </IconButton>
                </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby={'Клиенты'}
              size='small'
              aria-label='Таблица клиентов'
            >
              <TableHead>
                <TableRow>
                  {headCells.map(headCell => (
                    <TableCell
                      key={headCell.id}
                      align='left'
                      className={classes.tableCell}
                      // padding={headCell.disablePadding ? 'none' : 'default'}
                      // sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        // onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.sortSpan}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        align='left'
                        className={classes.tableCell}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} align='left'>{row.registered_type}</TableCell>
                      <TableCell className={classes.tableCell} align='left'>{row.region}</TableCell>
                      <TableCell className={classes.tableCell} align='left'>{row.city}</TableCell>
                      <TableCell className={classes.tableCell} style={{ paddingBottom: 0, paddingTop: 0 }} align='right' component='th' scope='row'>
                        <IconButton size='medium' onClick={() => this.handleEditRowTable(row.id)}>
                          <EditIcon style={{ fontSize: 18 }} color='action' />
                        </IconButton>
                        <IconButton size='medium' onClick={() => this.handleDeleteRowTable(row.id)}>
                          <DeleteIcon style={{ fontSize: 18 }} color='action' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            labelRowsPerPage='Записей на странице'
          />
        </Paper>
      </div>
    );
  }
}

const useStyles = theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  filterInput: {
    width: '100%',
    height: theme.spacing(4.5),
    fontSize: 12,
  },
  filterLabel: {
    fontSize: 12,
  },
  filterGrid: {
    marginTop: theme.spacing(3.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  tableCell: {
    paddingLeft: theme.spacing(3),
  }
});
export default withTheme(withStyles(useStyles)(TableClients));
