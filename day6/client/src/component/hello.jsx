import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Sub() {
  const navigate = useNavigate(); // Get the navigate function
  const [users, setUsers] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user, index) => ({ ...user, id: user.userId })));
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
    const { id } = cellValues.row;
    try {
      await axios.put(`http://localhost:8081/users/${id}`, cellValues.row);
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

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'state', headerName: 'State', width: 150, editable: true },
    { field: 'zip', headerName: 'ZIP', width: 120, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (cellValues) => (
        editRowId === cellValues.id ? (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleSave(event, cellValues);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
          >
            Edit
          </Button>
        )
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (cellValues) => (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            handleDelete(event, cellValues);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate('/myform'); // Navigate to the MyForm page
        }}
        style={{ marginBottom: '10px' }} // Add some space below the button
      >
        Create User
      </Button>
      <div style={{ height: 400, width: '100%', background: 'white' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          editRowsModel={editRowsModel}
          onEditRowModelChange={(newModel) => setEditRowsModel(newModel)}
          components={{
            Toolbar: GridToolbar,
          }}
          onCellClick={handleCellClick}
          onRowClick={handleRowCellClick}
        />
      </div>
    </div>
  );
}
