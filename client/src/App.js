import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
      });
  }, []);

  const updatePhone = (id, phone) => {
    fetch('/api/updatePhone', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, phone }),
    });
  };

  const { SearchBar } = Search;
  const columns = [
    {
      dataField: 'firstname',
      text: 'First Name',
      editable: false,
      headerClasses: 'header-sm',
    },
    {
      dataField: 'lastname',
      text: 'Last Name',
      editable: false,
      headerClasses: 'header-sm',
    },
    {
      dataField: 'email',
      text: 'Email',
      editable: false,
    },
    {
      dataField: 'phone',
      text: 'Phone Number',
      classes: 'phone-cell',
      headerClasses: 'header-sm',
      formatter: cell => (
        <>
          <div className="phone-data">{cell}</div>
          <i className="fa fa-pencil" />
        </>
      ),
      validator: newValue => {
        // eslint-disable-next-line
        if (!newValue.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) {
          return {
            valid: false,
            message: 'Phone number is invalid',
          };
        }
        return true;
      },
    },
  ];

  return (
    <>
      <div className="header">
        <span className="title">ADDRESS BOOK</span>
      </div>
      {contacts && (
        <div className="wrapper">
          <ToolkitProvider
            keyField="id"
            data={contacts}
            columns={columns}
            search
          >
            {props => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  classes="search-bar"
                  delay={1000}
                />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="id"
                  data={contacts}
                  columns={columns}
                  striped
                  hover
                  bootstrap4
                  classes="table-dark"
                  pagination={paginationFactory()}
                  cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    onStartEdit: (row, column, rowIndex, columnIndex) => { },
                    beforeSaveCell: (oldValue, newValue, row, column) => { },
                    afterSaveCell: (oldValue, newValue, row, column) => {
                      updatePhone(row.id, newValue);
                    },
                  })}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      )}
    </>
  );
};

App.propTypes = {
  searchProps: PropTypes.object,
  baseProps: PropTypes.object,
};

export default App;
