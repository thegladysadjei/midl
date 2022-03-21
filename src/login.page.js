import { useNavigate } from 'react-router-dom'
import './login.page.css'
export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className='login'>
            <div className='page'>
                <div className='login-wrapper'>
                    <h4>An account will be created for you if it doesn't already exist</h4>
                    <div className='form-group row'>
                        <input className='input' type='text' placeholder='Email' />
                    </div>
                    <div className='form-group row'>
                        <input className='input' type='password' placeholder='Password' />
                    </div>
                    <div className='form-group row'>
                        <button className='btn' type='button' onClick={() => {
                            navigate('/search')
                        }}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}