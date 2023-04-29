
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        // validate password
        // if(!/(?=.*[A-Z])/.test(password)){
        //     setError('At least a UpperCase');
        //     return;
        // }
        // else if(!/(?=.*[a-z])/.test(password)){
        //     setError('At least a Lowercase');
        //     return;
        // }
        // else if(!/(?=.*[0-9])/.test(password)){
        //     setError('At least a Number');
        //     return;
        // }
        // else if(password.length<6){
        //     setError('At least 6 character');
        //     return;
        // }

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
        // create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('User Created Successfully')

        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }


    const handleEmailChange = (event) =>{
        // console.log(event.target.value);
        // setEmail(event.target.value)
    }

    const handlePasswordBlur = (event) =>{
        // console.log(event.target.value);
    }
    return (
        <div>
            <h3> Register Here</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='You Email'  required/>
                <br />
                <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>   
                <input type="submit" value="Register" />
            </form>
            <p><small>Already Registered? Please <Link to='/login' >Login</Link> </small></p> 
        </div>
    );
};

export default Register;