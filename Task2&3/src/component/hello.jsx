import React from "react";
import { useLocation } from 'react-router-dom';

export default function Sub(){
    const location = useLocation();
  const { email } = location.state;

  return (
    <div>
      <h1>Hello, {email}</h1>
    </div>
  );
}