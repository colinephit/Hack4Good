import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [curState, setCurState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
    
        let apiUrl = "http://localhost:4000/api/user/login";
        if (curState === "Sign Up") {
            apiUrl = "http://localhost:4000/api/user/register";
        }
    
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from localStorage if required
            const response = await axios.post(apiUrl, data,{
                headers: {Authorization: `Bearer ${token}` } 
            });
            console.log("Response:", response.data);
    
            if (response.data.success) {
                // Save token to localStorage
                localStorage.setItem(token, response.data.token);
    
                // Redirect based on role
                if (response.data.role === "admin") {
                    window.location.href = "/admin"; // Redirect to admin panel
                } else {
                    window.location.href = "/"
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {curState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{curState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {curState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup

