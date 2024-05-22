import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

export default function Sub() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editRowId, setEditRowId] = useState(null);
  const [selectedRows,setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user) => ({ 
        ...user,
        id: user.userId,
        dob: user.dob.split('T')[0] // Extracting only the date part
      })));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleEdit = (event, cellValues) => {
    setEditRowId(cellValues.id);
    setEditRowsModel((prevEditRowsModel) => ({
      ...prevEditRowsModel,
      [cellValues.id]: true,
    }));
  };

  const handleSave = async (event, cellValues) => {
    const { id, dob, phoneNumber, ...rest } = cellValues.row;
    try {
      await axios.put(`http://localhost:8081/users/${id}`, {
        ...rest,
        dob: new Date(dob).toISOString().split('T')[0],
        phoneNumber: phoneNumber.toString(),
      });
      setEditRowsModel((prevEditRowsModel) => ({
        ...prevEditRowsModel,
        [cellValues.id]: false,
      }));
      setEditRowId(null);
      fetchData();
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  const handleDelete = async (event, cellValues) => {

    try {
      await axios.delete(`http://localhost:8081/users/${cellValues.row.id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  const handleDeleteSelected = async () => {
if(selectedRows.length===0){
  console.warn('no rows selected');
}
  try {
   console.log('Deleting selected rows:', selectedRows); // Debugging line
   await axios.delete('http://localhost:8081/delete_users', { data: { ids: selectedRows } });
 fetchData();
     setSelectedRows([]);
 } catch (err) {
    console.error('Error deleting selected data:', err);
    }
   };
  

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'state', headerName: 'State', width: 150, editable: true },
    { field: 'zip', headerName: 'ZIP', width: 120, editable: true },
    { field: 'dob', headerName: 'Date of birth', width: 120, editable: true },
    { field: 'phoneNumber', headerName: 'Contact', width: 120, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (cellValues) => (
        editRowId === cellValues.id ? (
          <IconButton onClick={(event) => handleSave(event, cellValues)}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={(event) => handleEdit(event, cellValues)}>
            <EditIcon />
          </IconButton>
        )
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (cellValues) => (
        <IconButton onClick={(event) => handleDelete(event, cellValues)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/')}
          style={{ marginRight: '10px' }}
        >
          Create User
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ height: '400px', width: '1000px', background: 'white', overflowX: 'auto' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            editRowsModel={editRowsModel}
            onEditRowModelChange={(newModel) => setEditRowsModel(newModel)}
            components={{ Toolbar: GridToolbar }}
            onCellClick={handleCellClick}
        onRowClick={handleRowCellClick}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          console.log('Selected IDs:', ids); // Debug: Log selected IDs
          setSelectedRows(ids);
        }}

          />
        </div>
      </div>
    </div>
  );
}
