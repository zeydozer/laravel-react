import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/app.css";

import DataTable from 'react-data-table-component'

const columns = [{
  name: 'Fullname',
  selector: row => row.fullname,
  sortable: true,
  width: '15%'
}, {
  name: 'E-Mail',
  selector: row => row.mail,
  sortable: true,
  width: '15%'
}, {
  name: 'Phone',
  selector: row => row.phone,
  sortable: true,
  width: '15%'
}, {
  name: 'Address',
  selector: row => row.address,
  sortable: true,
  width: '25%'
}, {
  name: 'Date',
  selector: row => row.created_at,
  sortable: true,
  format: (row) => new Date(row.created_at.replace('T', ' ')).toLocaleString(),
  width: '15%'
}, {
  cell: (row) => <button className="btn btn-danger" onClick={() => handleButtonClick(row.id)}>Delete</button>,
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  width: '15%'
}]

const handleButtonClick = (id) => {
  axios.delete('/api/datas/' + id).then(() => {
    getData()
  }).catch((err) => {
    console.log(err)
  })
};

const customStyles = {
  rows: {
    style: {
      padding: '.5rem 0'
    }
  },
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '12pt'
    }
  }
}

let data = []
const getData = () => {
  axios.get('/api/datas').then((res) => {
    data = res.data
    ReactDOM.render(<DataList />, document.getElementById('data-list'))
  }).catch((err) => {
    console.log(err)
  })
}

export default function DataList(props) {
  const [rows, setRows] = useState([])
  const [pending, setPending] = useState(true)
  useEffect(() => {
    getData()
    const timeout = setTimeout(() => {
      setRows(data)
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <div className='col-md-10'>
      <DataTable
        columns={columns}
        data={props.out == undefined ? data : props.data}
        progressPending={pending}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

if (document.getElementById('data-list')) {
  ReactDOM.render(<DataList />, document.getElementById('data-list'))
}