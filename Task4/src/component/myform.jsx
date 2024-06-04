import React , { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Myform() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() === '') {
      alert('Please enter a city');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Get existing users data from cookie or initialize an empty array
    const existingUsersData = Cookies.get('usersData') ? JSON.parse(Cookies.get('usersData')) : [];

    // Add new user data to the array
    const newUser = { username,email,city,address,state,zip};
    const updatedUsersData = [...existingUsersData, newUser];

    // Store the updated array back in the cookie
    Cookies.set('usersData', JSON.stringify(updatedUsersData), { expires: 365 });

    // Clear the form fields
    setUserName('');
    setCity('');
    setEmail('');
    setAddress('');
    setState('');
    setZip('');
    navigate('/hello',{ state: { username,email,city,address,state,zip} });
  };

  const handleChange = (event) => {
    if (event.target.id === 'inputEmail4') {
      setEmail(event.target.value);
      
    } else if (event.target.id === 'inputCity') {
      setCity(event.target.value);
      
    }
    else if (event.target.id === 'inputname') {
      setUserName(event.target.value);
      
    }
    else if (event.target.id === 'inputAddress') {
      setAddress(event.target.value);
      
    }
    else if (event.target.id === 'inputState') {
      setState(event.target.value);
      
    }
    else if (event.target.id === 'inputZip') {
      setZip(event.target.value);
      
    }
  };
  

  return (
    <><div className="text-center" style={{ color: 'white !important' }}>SIGN UP</div>
    
<div class='box'>
    <form class="row g-3" onSubmit={handleSubmit}>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" value={email} onChange={handleChange}/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4"/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">User Name</label>
    <input type="text" class="form-control" id="inputname" value={username} onChange={handleChange}/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Apartment, studio, or floor" value={address} onChange={handleChange}/>
  </div>
  <div class="col-md-6">
    <label for="City" class="form-label">City</label>
    <input type="text" className="form-control" id="inputCity" value={city} onChange={handleChange} />  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select" value={state} onChange={handleChange}>
      <option>Tamilnadu</option>
      <option>Kerala</option>
      <option>Karnataka</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip" value={zip} onChange={handleChange}/>
  </div>
  <div class="col-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
</div> </>
  )
}
