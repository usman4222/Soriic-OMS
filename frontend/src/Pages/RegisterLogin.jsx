import React, { useState, useRef, useEffect } from 'react'
import './RegisterLogin.css'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, login, register } from '../actions/userAction'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'


const RegisterLogin = () => {

    const [trans, setTrans] = useState(false);
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { error, isAuthenticated } = useSelector((state) => state.user)
    const loginTab = useRef(null)
    const navigate = useNavigate();
    const registerTab = useRef(null)
    const [loignEmail, setLoginEmail] = useState("")
    const [loignPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = user

    const registerDataChange = (e) => {
        setUser(prevUser => {
            const updatedUser = { ...prevUser, [e.target.name]: e.target.value };
            return updatedUser;
        });
    };

    const regClick = () => {
        setTrans(true);
    };

    const logClick = () => {
        setTrans(false);
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loignEmail, loignPassword))
    }


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            enqueueSnackbar('Successfully Logged In', { variant: 'success' });
            navigate("/");
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);
    



    const registerSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            enqueueSnackbar('Password should be at least 8 characters long', { variant: 'error' });
            return;
        }

        if (name.length < 4) {
            enqueueSnackbar('Name should be at least 4 characters long', { variant: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        dispatch(register(formData));
    };


    return (
        <div className='main-form'>
            <div className='login'>
                <div className={`login`} onClick={logClick}>
                    <form ref={loginTab} onSubmit={loginSubmit}>
                        <h2 className='mt-2'
                        // className={trans ? 'scaleDown' : ''}
                        >Log In</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={loignEmail}
                            required
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={loignPassword}
                            required
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />

                        <div className='submitBtn'>
                            <button type='submit'>Log In</button>
                        </div>
                    </form>

                </div>
                <div className={`register`} onClick={regClick}>
                    {/* <form
                        ref={registerTab}
                        encType='multipart/form-data'
                        onSubmit={registerSubmit}
                    >
                        <h2>Register</h2>
                        <div className='nameInput'>
                            <input
                                type='text'
                                placeholder='Name'
                                value={user.name}
                                name='name'
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='emailInput'>
                            <input
                                type='email'
                                placeholder='Email'
                                value={user.email}
                                name='email'
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='passInput'>
                            <input
                                type='password'
                                placeholder='Password'
                                value={user.password}
                                name='password'
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='submitBtn'>
                            <button type='submit'>Register</button>
                        </div>
                    </form> */}
                </div>

            </div>
        </div>
    )
}

export default RegisterLogin
