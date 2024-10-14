import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const user = response.data; // Get the user data from the response

      console.log('API Response:', user); // Log the user object to check if it's correct

      // Ensure the user object contains necessary information, e.g., user.username
      if (user && user.username) {
        localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
        console.log('Stored User:', localStorage.getItem('user')); // Check if it is stored correctly
        navigate('/'); // Redirect to home page
      } else {
        console.error('User object is invalid or missing username');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed', error.response.data); // Log the error response
        alert('Login failed: ' + error.response.data.message || error.message);
      } else {
        console.error('Error during login', error);
      }
    }
  };
  
  
  console.log(localStorage.getItem('user'));

  return (
    <div>
      <section class="normal-breadcrumb">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-center position-relative">
              <img src="assets/img/normal-breadcrumb.jpg" alt="Breadcrumb Background" class="img-fluid" />
              <div class="normal__breadcrumb__text">
                <h2>Login</h2>
                <p>Welcome to the official Anime blog.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="login spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="login__form">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                  <div class="input__item">
                    <input type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                    <span class="icon_mail"></span>
                  </div>
                  <div class="input__item">
                    <input type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <span class="icon_lock"></span>
                  </div>
                  <button type="submit" class="site-btn">Login Now</button>
                </form>
                <a href="/" class="forget_pass">Forgot Your Password?</a>
              </div>
            </div>
            <div class="col-lg-6 d-flex justify-content-center align-items-center">
              <div class="login__register text-center">
                <h3>Don't Have An Account?</h3>
                <a href="/register" class="primary-btn">Register Now</a>
              </div>
            </div>

          </div>
          <div class="login__social">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <div class="login__social__links">
                  <span>or</span>
                  <ul>
                    <li><a href="/" class="facebook"><i class="fa fa-facebook"></i> Sign in With
                      Facebook</a></li>
                    <li><a href="/" class="google"><i class="fa fa-google"></i> Sign in With Google</a></li>
                    <li><a href="/" class="twitter"><i class="fa fa-twitter"></i> Sign in With Twitter</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
