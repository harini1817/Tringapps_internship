import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export default function Sub() {
  const [users, setUsers] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleNewUser = () => {
    navigate('/myform'); // Navigate to the desired next page
  };
  
  
  const generateUserId = () => {
    // Generate a random 3-digit number as the user ID
    return Math.floor(100 + Math.random() * 900);
  };

  const handleEdit = (id) => {
    setEditingRowId(id);
  };

  const handleSave = async (id, updatedUserData) => {
    try {
      const { userId, name, email, city, address, state, zip } = updatedUserData;
      console.log('Saving data:', updatedUserData);
  
      await axios.put(`http://localhost:8081/users/${userId}`, { userId, name, email, city, address, state, zip });
      setEditingRowId(null);
      fetchData(); // Fetch updated data after saving
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  

  
  
  
  
  

  const buttonStyle = {
    minWidth: '80px',
    marginRight: '8px',
    height: '40px'
  };

  const columns = [
    { field: 'userId', headerName: 'User ID', width: 150, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'state', headerName: 'State', width: 150, editable: true },
    { field: 'zip', headerName: 'ZIP', width: 120, editable: true },
    {
      field: '', headerName: 'Action', width: 200,
      renderCell: (params) => {
        if (params.row.userId === editingRowId) {
          return (
            <>
              <button style={{ ...buttonStyle, backgroundColor: 'green', color: 'white' }} onClick={() => handleSave(params.row.userId, params.row)}>Save</button>
            </>
          );
        } else {
          return (
            <>
              <button style={{ ...buttonStyle, backgroundColor: 'blue', color: 'white' }} onClick={() => handleEdit(params.row.userId)}>Edit</button>
              <button style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}>Delete</button>
            </>
          );
        }
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  

  return (
    <>
      <div className="text-center text-white"><h2>User Data</h2></div>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          <button onClick={handleNewUser} style={{ ...buttonStyle, backgroundColor: 'green' }}>Create user</button>
        </div>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          style={{ background: 'white' }}
          editMode={editingRowId ? 'row' : undefined}
          getRowId={(row) => row.userId} // Specify the userId as the row ID
        />
      </div>
    </>
  );
}
