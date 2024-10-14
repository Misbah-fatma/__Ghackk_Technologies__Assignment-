import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-r9ii.onrender.com/api/register', {
        username,
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) { // Check if the response indicates success (201 Created)
        // On successful registration, navigate to the login page
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data); // Log specific error details
        alert('Registration failed: ' + (error.response.data.message || ''));
      } else {
        console.error('Error during registration:', error); // Log general error
        alert('Registration failed: An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <section class="normal-breadcrumb">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-center position-relative">
              <img src="assets/img/normal-breadcrumb.jpg" alt="Breadcrumb Background" class="img-fluid" />
              <div class="normal__breadcrumb__text">
                <h2>Register</h2>
                <p>Welcome to the official Anime blog.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="signup spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="login__form">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                  <div class="input__item">
                    <input type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} placeholder="Enter User Name" />
                    <span class="icon_mail"></span>
                  </div>
                  <div class="input__item">
                    <input type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                    <span class="icon_profile"></span>
                  </div>
                  <div class="input__item">
                    <input type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <span class="icon_lock"></span>
                  </div>
                  <button type="submit" class="site-btn">Register Now</button>
                </form>
                <h5>Already have an account? <a href="/">Log In!</a></h5>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="login__social__links">
                <h3>Login With:</h3>
                <ul>
                  <li><a href="/" class="facebook"><i class="fa fa-facebook"></i> Sign in With Facebook</a>
                  </li>
                  <li><a href="/" class="google"><i class="fa fa-google"></i> Sign in With Google</a></li>
                  <li><a href="/" class="twitter"><i class="fa fa-twitter"></i> Sign in With Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
