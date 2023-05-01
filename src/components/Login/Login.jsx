import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');
        // validation
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please at least two uppercase');
            return;
        }
        else if(!/(?=.*[a-z].*[a-z])/.test(password)){
            setError('Please at least two lowercase');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please at least two Number');
            return;
        }
        else if(!/(?=.*[!@#$%])/.test(password)){
            setError('Please add a special character');
            return;
        }
        else if(password.length<6){
            setError('Please enter six digit password');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess('user login successfully')
            setError('');
        })
        .catch(error => {
            setError(error.message)
        })

    }
    const handleResetPassword = event => {
        const email = emailRef.current.value
        if(!email){
            alert('Please provide your email address to reset password  ')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('Please check Your Email');
        })
        .catch(error => {
            console.log(error);
            setError(error.message)
        })
    }
    return (
        <div>
            <form onSubmit={handleLogin} className="container mt-5">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        ref={emailRef}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            <p><small>forget password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset</button></small></p>
            <p><small>New to this website? Please <Link to='/register' >Register</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;