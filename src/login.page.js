import { useNavigate } from 'react-router-dom'
import './login.page.css'
import React from 'react';
import { db } from './firebase-config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
export const LoginPage = () => {
    const navigate = useNavigate();
    const userCollectionRef = collection(db, "users");
    const [cred, setCred] = React.useState({});
    const [error, setError] = React.useState('');
    const login = async () => {
        try {
            getDocs(userCollectionRef).then(data => {
                const existingUser = data.docs.find(doc => doc.data().email == cred.email)
                if (existingUser) {
                    console.log(existingUser.password, cred.password)
                    if (existingUser.password == cred.password) {
                        localStorage.setItem('user', existingUser.data().email);
                        setError('')
                        navigate('/search');
                    } else {
                        setError("Email or password is invalid. Try again");
                    }
                } else {
                    console.log("no user");
                    addDoc(userCollectionRef, { email: cred.email, password: cred.password }).then(() => {
                        localStorage.setItem('user', cred.email);
                        navigate('/search');
                    }, () => {
                        setError("Error Login in")
                    }).catch(() => {
                        setError("Error Login in")
                    })
                }
            }, () => {
                setError("Error Login in")
            }).catch(() => {
                setError("Error Login in")
            });
        } catch (e) {
            setError("Error Login in")
        }
    }
    React.useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/search');
        }
    })
    return (
        <div className='login'>
            <div className='page'>
                <div className='login-wrapper'>
                    <h4>An account will be created for you if it doesn't already exist</h4>
                    {error && <h3 style={{ color: 'red' }}>{error}</h3>}
                    <div className='form-group row'>
                        <input className='input' type='text' placeholder='Email' onChange={(event) => {
                            setCred({ ...cred, email: event.currentTarget.value.trim() });
                        }} />
                    </div>
                    <div className='form-group row'>
                        <input className='input' type='password' placeholder='Password' onChange={(event) => {
                            setCred({ ...cred, password: event.currentTarget.value.trim() });
                        }} />
                    </div>
                    <div className='form-group row'>
                        <button disabled={!(cred.email && cred.password)} className='btn' type='button' onClick={login}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}