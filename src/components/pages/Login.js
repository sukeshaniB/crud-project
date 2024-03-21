import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../Layout';
import Home from './Home';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('11');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const instance = axios.create({
        baseURL: 'https://dummyjson.com/',
    });

    const handleSave = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsSaving(true);
        var em = email === 'admin' ? 'kminchelle' : email;
        var pas = password === '11' ? '0lelplR' : password;

        instance.post('/auth/login', {
            username: em,
            password: pas
        })
            .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsLoggedIn(true); // Set isLoggedIn to true after successful login
                setIsSaving(false);
                setEmail('');
                setPassword('');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false);
            });
    };

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false); // Set isLoggedIn to false upon logout
        navigate("/"); // Redirect to sign-in page
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        {isLoggedIn ? (
                            <Home />
                        ) : (
                            <div className="card border-0 shadow rounded-3 my-5">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input
                                                value={email}
                                                onChange={(event) => { setEmail(event.target.value) }}
                                                type="email"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                            />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                value={password}
                                                onChange={(event) => { setPassword(event.target.value) }}
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                disabled={isSaving}
                                                onClick={handleSave}
                                                type="submit"
                                                className="btn btn-primary btn-login text-uppercase fw-bold" >
                                                Sign in
                                            </button>
                                        </div>
                                        <hr className="my-4"></hr>

                                        <div className="d-grid">
                                            <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/signup">Create new account </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoggedIn && (
                <div className="card-header">
                    <button onClick={Logout} className="btn btn-outline-danger float-end"> Logout </button>
                </div>
            )}
        </Layout>
    );
}

export default Login;
