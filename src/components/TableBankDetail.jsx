import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme, lighten, makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

class TableBankDetail extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired,
    activeCompanyId: PropTypes.string.isRequired,
    addCompanyBankDetail: PropTypes.func.isRequired,
    updateCompanyBankDetail: PropTypes.func.isRequired,
    deleteCompanyBankDetail: PropTypes.func.isRequired,
  };

  render() {
    const { classes, data, activeCompanyId, addCompanyBankDetail, updateCompanyBankDetail, deleteCompanyBankDetail } = this.props;
    return (
      <div className={classes.root}>
        <MaterialTable
          columns={[
              { title: 'Банк', field: 'bank' },
              { title: 'БИК', field: 'bank_id_code' },
              { title: 'Номер счета', field: 'account_number', type: 'numeric' },
              { title: 'Валюта', field: 'currency' },
            ]}
          data={data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    addCompanyBankDetail(activeCompanyId, newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    updateCompanyBankDetail(activeCompanyId, oldData.id, newData);
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    deleteCompanyBankDetail(activeCompanyId, oldData.id);
                  }
                  resolve()
                }, 1000)
              }),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Нет записей",
              addTooltip: 'Добавить',
              deleteTooltip: 'Удалить',
              editTooltip: 'Редактировать',
              filterRow: {
                filterTooltip: 'Фильтр',
              },
              editRow: {
                deleteText: 'Действительно ли вы хотите удалить запись?',
                cancelTooltip: 'Отмена',
                saveTooltip: 'Сохранить',
              },
            },
            grouping: {
              placeholder: 'Перетащите заголовки ...',
              groupedBy: 'Сгруппировано по:',
            },
            header: {
              actions: 'Действия',
            },
            pagination: {
              labelDisplayedRows: '{from}-{to} из {count}',
              labelRowsSelect: 'Строк',
              labelRowsPerPage: 'Строк на страниц:',
              firstAriaLabel: 'Первая страница',
              firstTooltip: 'Первая страница',
              previousAriaLabel: 'Предыдущая страница',
              previousTooltip: 'Предыдущая страница',
              nextAriaLabel: 'Следующая Страница',
              nextTooltip: 'Следующая Страница',
              lastAriaLabel: 'Последняя Страница',
              lastTooltip: 'Последняя Страница',
            },
            toolbar: {
              addRemoveColumns: 'Добавить или удалить столбцы',
              nRowsSelected: 'Выбрано {0} строк',
              showColumnsTitle: 'Показать столбцы',
              showColumnsAriaLabel: 'Показать столбцы',
              exportTitle: 'Экспорт',
              exportAriaLabel: 'Экспорт',
              exportName: 'Экспорт в CSV',
              searchTooltip: 'Поиск',
              searchPlaceholder: 'Поиск',
            },
          }}
          title='Банковские реквизиты компании'
        />
      </div>
    );
  }
}

const useStyles = theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
});
export default withTheme(withStyles(useStyles)(TableBankDetail));
