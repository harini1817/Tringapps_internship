import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";

export default function Sub() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const usersData = Cookies.get("usersData");
    if (usersData) {
      const parsedUsersData = JSON.parse(usersData);
      setRows(parsedUsersData.map((user, index) => ({ id: index + 1, ...user })));
    }
  }, []);

  const columns = [
    { field: "userNumber", headerName: "Users", width: 100 },

    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "state", headerName: "State", width: 200 },
    { field: "zip", headerName: "Zip", width: 100 },
  ];
  useEffect(() => {
    // Update the userNumber field in the rows whenever the rows change
    setRows((prevRows) =>
      prevRows.map((row, index) => ({
        ...row,
        userNumber: index + 1,
      }))
    );
  }, [rows]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid 
      rows={rows} 
      columns={columns} 
      pageSize={5}
      style={{ backgroundColor: 'lightblue' }} />
    </div>
  );
}
