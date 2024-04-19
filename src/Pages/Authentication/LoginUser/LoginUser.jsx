import React, { useContext, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../Database/firebase';
import UserContext from '../../../Context/User/UserContext';
import CategoryContext from '../../../Context/Category/CategoryContext';
import LoginLayout from './LoginLayout';
import '../../../Styles/Authentication/LoginUser.css';

const LoginUser = () => {
    const { setCurrentUser } = useContext(UserContext);
    const { navigate } = useContext(CategoryContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInformHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const signInHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
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

    const googleLoginHandler = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user);
            navigate('/profile');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`);
        }
    }

    return (
        <div className='loginUser-container'>
            <LoginLayout>
                <div className="email-login">
                    <h1 className='login-name'>Sign In</h1>
                    <div className='login-form'>
                        <form onSubmit={signInHandler}>
                            <input type='email' placeholder='Email' name='email' value={email} onChange={signInformHandler} required />
                            <br />
                            <input type='password' placeholder='Password' name='password' value={password} onChange={signInformHandler} />
                            <br />
                            <Button type='submit' className='signInButton'>SIGN IN</Button>
                        </form>
                    </div>
                    <div className='seprating-text'>
                        <h3>OR</h3>
                        <p>New to Infinite Square? <Button onClick={() => navigate('/register')}>Sign up now.</Button></p>
                    </div>
                    <div className='google-login'>
                        <Button variant="outlined" onClick={googleLoginHandler}><GoogleIcon />Sign In With Google</Button>
                    </div>
                </div>
            </LoginLayout>
        </div>
    )
}

export default LoginUser;
