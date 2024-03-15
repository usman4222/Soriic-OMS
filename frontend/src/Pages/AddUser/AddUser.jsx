import React, { Fragment, useEffect, useState } from 'react'
import './AddUser.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack'
import { ADD_USER_RESET } from '../../constants/addUserContant';
import { addNewUser, clearErrors } from '../../actions/addUserAction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';
import Loader from '../../components/Loader/Loader';

const AddUser = () => {

    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [role, setRole] = useState("");
    const [designation, setDesignation] = useState("");
    const { loading, error, success } = useSelector((state) => state.newUser)

    const roleCategories = [
        "Employee",
        "Intern"
    ]

    const skillCategories = [
        "Web Deveploper",
        "Mobile App Developer",
        "WorldPress Developer",
        "SEO",
        "HR Manager",
        "Project Manager",
        "Video Editor",
        "Content Writer",
        "Digital Marketer"
    ]

    const addUserHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("fatherName", fatherName);
        myForm.set("address", address);
        myForm.set("phone", phone);
        myForm.set("role", role);
        myForm.set("designation", designation);
        dispatch(addNewUser(myForm));
    };





    useEffect(() => {
        if (error) {
            alert.error(error)
            enqueueSnackbar(error, { variant: 'success' });
            dispatch(clearErrors())
        }
        if (success) {
            enqueueSnackbar('User created Successfully', { variant: 'success' });
            navigate('/allemployees')
            dispatch({ type: ADD_USER_RESET })
        }
    }, [dispatch, error, success])


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className='main'>
                    <div className='row w-full main1-r1'>
                        <div className='col-lg-2 main1-r1-b1'>
                            <Sidebar />
                        </div>
                        <div className='col-lg-10 main1-r1-b1'>
                            <div className='row main1-r2'>
                                <Header />
                            </div>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='main-form'>
                                        <div className='addUser'>
                                            <form
                                                className='createProductForm'
                                                encType='multipart/form-data'
                                                onSubmit={addUserHandler}
                                            >
                                                <h2 >Add New Employee</h2>
                                                <input
                                                    type='text'
                                                    placeholder='Name'
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <input
                                                    type='text'
                                                    placeholder='Father Name'
                                                    required
                                                    value={fatherName}
                                                    onChange={(e) => setFatherName(e.target.value)}
                                                />
                                                <input
                                                    type='text'
                                                    placeholder='Address'
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <input
                                                    type='text'
                                                    placeholder='Phone'
                                                    pattern='[0-9]*'
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <select className='rol' onChange={(e) => setRole(e.target.value)}>
                                                    <option value="">Choose Role</option>
                                                    {roleCategories.map((cate) => (
                                                        <option key={cate} value={cate}>
                                                            {cate}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select onChange={(e) => setDesignation(e.target.value)}>
                                                    <option value="">Choose Desigination</option>
                                                    {skillCategories.map((cate) => (
                                                        <option key={cate} value={cate}>
                                                            {cate}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className='submitBtn'>
                                                    <button type='submit'>Add</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default AddUser;


