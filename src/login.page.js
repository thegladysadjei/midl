import { useNavigate } from 'react-router-dom'
import './login.page.css'
import React from 'react';
export const LoginPage = () => {
    const navigate = useNavigate();
    const [cred, setCred] = React.useState({});
    const login = () => {
        //save to DB
        //if successful sabe email to localStorage
        // localStorage.setItem('user', cred.email);
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
                        <button disabled={!(cred.email && cred.password)} className='btn' type='button' onClick={() => {
                            navigate('/search')
                        }}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}