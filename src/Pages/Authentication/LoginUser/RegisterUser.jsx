import React, { useContext, useState } from 'react';
import LoginLayout from './LoginLayout';
import { Button } from '@mui/material';
import CategoryContext from '../../../Context/Category/CategoryContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../Database/firebase';
import UserContext from '../../../Context/User/UserContext';
import '../../../Styles/Authentication/RegisterUser.css';

const RegisterUser = () => {
    const { navigate } = useContext(CategoryContext);
    const { setCurrentUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpformHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCurrentUser(user);
                navigate('/profile');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`${errorCode}: ${errorMessage}`);
            });
    }

    return (
        <div>
            <LoginLayout>
                <div className="sign-in-container">
                    <div className="sign-in-button">
                        <Button onClick={() => navigate('/login')}>
                            Sign In
                        </Button>
                    </div>
                    <h1 className='sign-up-heading'>Create Account</h1>
                    <div className='sign-up-form'>
                        <form onSubmit={signUpHandler}>
                            <input type='text' placeholder='Name' name='name' value={name} onChange={signUpformHandler} required />
                            <br />
                            <input type='email' placeholder='Email' name='email' value={email} onChange={signUpformHandler} required />
                            <br />
                            <input type='password' placeholder='Password' name='password' value={password} onChange={signUpformHandler} required minLength={6} />
                            <br />
                            <Button type='submit'>SIGN UP</Button>
                        </form>
                    </div>
                </div>
            </LoginLayout>
        </div>
    )
}

export default RegisterUser;
