import React,{ useState ,useContext} from 'react'
import './style.css'

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';



const signUpInital = {
    email : '',
    username : '',
    password : ''
}
const loginInital = {
    username : '',
    password : ''
}

const Login = ({isUserAuthenticated}) => {
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signUpInital);
    const [login, setLogin] = useState(loginInital);
    const [error, showError] = useState('');
    
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext); 

    ////////////////////////////////////////////////////////////////
    const onInputChange = (e) => {
        console.log({...signup,[e.target.name] : e.target.value});
        setSignup({...signup,[e.target.name] : e.target.value});
    }

    const onValueChange = (e) => {
        console.log({...login,[e.target.name] : e.target.value});
        setLogin({...login,[e.target.name] : e.target.value});
    }
    /////////////////////////////////////////////////////////////////
    const toggleSignUp = () => {
        toggleAccount('signup');
    };

    const toggleLogin = () => {
        toggleAccount('login');
    };
    /////////////////////////////////////////////////////////////////

    const signupUser = async () => {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError('');
                setSignup(signUpInital);
                toggleAccount('login');

            } else {
                showError('Something went wrong! please try again later');
            }
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ email: response.data.email, username: response.data.username });
            isUserAuthenticated(true)
            setLogin(loginInital);
            navigate('/Home');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    return (
        <div className='full-width-container'>
            {
                account === "login" ? 
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="row border rounded-5 p-3 bg-white shadow box-area">
                        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: "#103cbe"}}>
                            <div className="featured-image mb-3">
                                <img src="https://tribulant.com/blog/wp-content/uploads/2017/09/Promote-a-blogging-site-768x461.jpg" alt="..." style={{width: "250px"}}/>
                            </div>
                            <p className="text-white fs-2" style={{fontFamily: "Courier New, Courier, monospace", fontWeight: 600}}>Be Verified</p>
                            <small className="text-white text-wrap text-center" style={{width: "17rem", fontFamily: "Courier New, Courier, monospace"}}>Join experienced Designers on this platform.</small>
                        </div> 
                        <div className="col-md-6 right-box">
                            <div className="row align-items-center">
                                <div className="header-text mb-4">
                                    <h2>Hello, Again</h2>
                                    <p>We are happy to have you back.</p>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-lg bg-light fs-6" onChange={(e) => onValueChange(e)} name = 'username' placeholder="Username"/>
                                </div>
                                <div className="input-group mb-1">
                                    <input type="password" className="form-control form-control-lg bg-light fs-6" onChange={(e) => onValueChange(e)} name = 'password' placeholder="Password"/>
                                </div>
                                <div className="input-group mb-5 d-flex justify-content-between">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                                        <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                                    </div>
                                    <div>
                                        {error && <p><small>{error}</small></p>}
                                    </div>
                                    <div className="forgot">
                                        <small><a href="/">Forgot Password?</a></small>
                                    </div>
                                </div>
                                <div className="input-group mb-3" onClick={loginUser}>
                                    <button className="btn btn-lg btn-primary w-100 fs-6"><a style={{textDecoration : 'none' , color : 'inherit'}} href='/Home'>Login</a></button>
                                </div>
                                <div className="row">
                                    <small>Don't have an account? <span onClick={toggleSignUp} style={{color: 'blue', cursor: 'pointer'}}>Sign Up</span></small>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                :
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="row border rounded-5 p-3 bg-white shadow box-area">
                        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: "#103cbe"}}>
                            <div className="featured-image mb-3">
                                <img src="https://tribulant.com/blog/wp-content/uploads/2017/09/Promote-a-blogging-site-768x461.jpg" alt="..." style={{width: "250px"}}/>
                            </div>
                            <p className="text-white fs-2" style={{fontFamily: "Courier New, Courier, monospace", fontWeight: 600}}>Be Verified</p>
                            <small className="text-white text-wrap text-center" style={{width: "17rem", fontFamily: "Courier New, Courier, monospace"}}>Join experienced Designers on this platform.</small>
                        </div> 
                        <div className="col-md-6 right-box">
                            <div className="row align-items-center">
                                <div className="header-text mb-4">
                                    <h2>Hello</h2>
                                    <p>We are happy to invite you to our community.</p>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-lg bg-light fs-6" onChange={(e) => onInputChange(e)} name = 'email' placeholder="Email address"/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-lg bg-light fs-6" onChange={(e) => onInputChange(e)} name = 'username' placeholder="Username"/>
                                </div>
                                <div className="input-group mb-1">
                                    <input type="password" className="form-control form-control-lg bg-light fs-6" onChange={(e) => onInputChange(e)} name = 'password' placeholder="Password"/>
                                </div>
                                <div className="input-group mb-5 d-flex justify-content-between">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                                        <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                                    </div>
                                </div>
                                <div>
                                    {error && <p><small>{error}</small></p>}
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-lg btn-primary w-100 fs-6" onClick={toggleLogin}>Already have an Account</button>
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-lg btn-light w-100 fs-6" onClick={signupUser}>
                                        <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png" alt="..." style={{width:"20px"}} className="me-2"/>
                                        <a href='/Home'><small>Sign Up</small></a>
                                    </button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;
