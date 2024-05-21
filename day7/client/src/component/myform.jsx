import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; 

export default function MyForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    city: '',
    address: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dob: '',
    agreeTerms: false
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.city.trim() === '') {
      alert('Please enter a city');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      alert('Please enter a valid email address');
      return;
    }
    // Check if password and confirm password match
    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    axios.post('http://localhost:8081/add_user', values)
    .then((res) => {
      console.log(res);
      navigate('/hello');
    })
    .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <div className="text-center text-white"><h2>SIGN UP</h2></div>

      <div className='box'>
        <form className="row g-3"  onSubmit={handleSubmit} action="" method="POST">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={values.email} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">User Name</label>
            <input type="text" className="form-control" id="name" value={values.name} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" placeholder="Apartment, studio, or floor" value={values.address} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="City" className="form-label">City</label>
            <input type="text" className="form-control" id="city" value={values.city} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select id="state" className="form-select" value={values.state} onChange={handleChange}>
            <option value="">--</option> 
              <option>Tamilnadu</option>
              <option>Kerala</option>
              <option>Karnataka</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="zip" value={values.zip} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={values.password} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" value={values.confirmPassword} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDob" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="dob" value={values.dob} onChange={handleChange} />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="agreeTerms" checked={values.agreeTerms} onChange={handleChange} />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </>
  );
}
