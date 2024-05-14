
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export default function Sub() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'zip', headerName: 'ZIP', width: 120 },
  ];
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user, index) => ({ ...user, id: index + 1 })));
    } catch (err) {
      console.err('Error fetching data:', err);
    }
  };

  return (
    <>
      <div className="text-center text-white"><h2>User Data</h2></div>
      <div style={{ height: 400, width: '100%' }}>
        (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
        )
      </div>
    </>
  );
}
