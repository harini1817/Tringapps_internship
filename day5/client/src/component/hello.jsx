
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export default function MyForm() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/users')
      .then(response => {
        // Add an 'id' property to each row
        const rowsWithId = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        setUsers(rowsWithId);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const columns = [
    
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'zip', headerName: 'ZIP', width: 120 },
  ];

  return (
    <>
      <div className="text-center text-white"><h2>User Data</h2></div>
      <div style={{ height: 400, width: '100%' }}>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
        )}
      </div>
    </>
  );
}
