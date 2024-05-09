import React , { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';

export default function Myform() {
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
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
          
    // If city field is not empty, you can proceed with form submission logic here
    console.log('Form submitted successfully');
    navigate('/hello',{ state: { email } });
  };

  const handleChange = (event) => {
    if (event.target.id === 'inputEmail4') {
      setEmail(event.target.value);
    } else if (event.target.id === 'inputCity') {
      setCity(event.target.value);
    }
  };
  

  return (
    <><div> <h2>Register</h2></div>
    
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
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div class="col-md-6">
    <label for="City" class="form-label">City</label>
    <input type="text" className="form-control" id="inputCity" value={city} onChange={handleChange} />  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
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
