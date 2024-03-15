import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors } from '../../actions/addUserAction';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../../actions/updateUser';
import { UPDATE_USER_RESET } from '../../constants/updateUser';
import Header from '../../components/Header';
import Sidebar from '../Sidebar';
import Loader from '../../components/Loader/Loader';

const UpdateUser = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { error: updateError, isUpdated } = useSelector((state) => state.updateUser)
    const { user, loading } = useSelector((state) => state.getUser)


    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const [role, setRole] = useState("");
    const [designation, setDesignation] = useState("");

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

    const userId = id;

    useEffect(() => {
        if (user && user._id === userId) {
            setName(user.name)
            setFatherName(user.fatherName)
            setPhone(user.phone)
            setAddress(user.address)
            setRole(user.role)
            setDesignation(user.designation)
        } else {
            dispatch(getUserDetails(userId))
        }

        if (updateError) {
            enqueueSnackbar(updateError, { variant: 'success' });
            dispatch(clearErrors())
        }
        if (isUpdated) {
            enqueueSnackbar("Employee Updated Successfully", { variant: 'success' });
            navigate('/allemployees')
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, enqueueSnackbar, updateError, isUpdated, userId, user])



    const updateUserHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("fatherName", fatherName)
        myForm.set("address", address)
        myForm.set("phone", phone)
        myForm.set("role", role)
        myForm.set("designation", designation)
        dispatch(updateUserDetails(userId, myForm))

    }

    return (
        <Fragment>
            {loading ? <Loader /> : (<div className='main'>
                <div className='row w-full'>
                    <div className='col-lg-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='main-form'>
                            <div className='addUser'>
                                <form
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateUserHandler}
                                >
                                    <h2 >Update Employee</h2>
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
                                    <select onChange={(e) => setRole(e.target.value)}>
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
                                        <button type='submit'>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Fragment>
    );
};

export default UpdateUser;


