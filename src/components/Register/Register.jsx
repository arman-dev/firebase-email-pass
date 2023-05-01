
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
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
        const name = event.target.name.value;
        console.log(email, password, name);

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
            setSuccess('User Created Successfully');
            emailVerification(result.user);
            updateUserData(result.user, name);

        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }

    const emailVerification = (user) => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result);
            alert("Please Verify you email address");
        })
    }

    // Update
    const updateUserData = (user, name) =>{
        updateProfile(user , {
            displayName: name 
        })
        .then(() =>{
            console.log("User name Updated");
        })
        .catch(error =>{
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
                <input className='m-2'  type="text" name="name" id="name" placeholder='You Name'  required/>
                <br />
                <input className='m-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='You Email'  required/>
                <br />
                <input className='m-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required />
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