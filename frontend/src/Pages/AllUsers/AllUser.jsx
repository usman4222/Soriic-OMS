import React, { useEffect, useState } from 'react'
import './AllUser.css'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { getAllUsers, clearErrors, } from '../../actions/addUserAction'
import { deleteUser } from '../../actions/deleteUser'
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import Loader from '../../components/Loader/Loader';
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";


const AllUser = () => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { loading, error, users } = useSelector((state) => state.allUser)
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.delUser)
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('User deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers(keyword));
    }, [enqueueSnackbar, error, dispatch, deleteError, isDeleted, message, keyword]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            setKeyword(`/allemployees/${keyword}`);
        } else {
            navigate("/allemployees");
        }
    };

    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "fatherName",
            headerName: "F-Name",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "phone",
            headerName: "Phone",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "designation",
            headerName: "Designation",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 10,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor" : "redColor"
            }
        }
    ]

    const renderActionButton = (id) => (
        <Fragment>
            <Link to={`/updateuser/${id}`} className='edit'>
                <MdEdit />
            </Link>
            <button onClick={() => deleteUserHandler(id)}>
                <MdDeleteForever />
            </button>
        </Fragment>
    );

    const rows = users.map((item, index) => ({
        index: index + 1,
        id: item._id,
        name: item.name,
        role: item.role,
        fatherName: item.fatherName,
        designation: item.designation,
        phone: item.phone,
        address: item.address,
        action: renderActionButton(item._id),
    }));


    return (
        <Fragment>
                <div className='main' method="GET">
                    <div className='row w-full main1-r1'>
                        <div className='col-lg-2 main1-r1-b1'>
                            <Sidebar />
                        </div>
                        <div className='col-lg-10 main1-r1-b2'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <Header />
                                </div>
                            </div>
                            <div className='dashboard'>
                                <div className='productsListContainer'>
                                    <h1 className='productListHeading'>All Employees</h1>
                                    <div>
                                        <form className='searchBox' onSubmit={searchSubmitHandler}>
                                            <input
                                                type='text'
                                                placeholder='Search a Employee by Name...'
                                                onChange={(e) => setKeyword(e.target.value)}
                                                required
                                            />
                                            <input type='submit' value='Search' />
                                        </form>
                                    </div>
                                    {rows.length > 0 ? (
                                        <table className='table '>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center', paddingLeft: 30}}>Index</th>
                                                    <th style={{ textAlign: 'center' }}>Name</th>
                                                    <th style={{ textAlign: 'center' }}>F.Name</th>
                                                    <th style={{ textAlign: 'center' }}>Phone</th>
                                                    <th style={{ textAlign: 'center' }}>Address</th>
                                                    <th style={{ textAlign: 'center' }}>Designation</th>
                                                    <th style={{ textAlign: 'center' }}>Role</th>
                                                    <th style={{ textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((item, index) => (
                                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                                        <td style={{ textAlign: 'center' }}>{item.index}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.name}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.fatherName}</td>
                                                        <td style={{ textAlign: 'center' }}>0{item.phone}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.address}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.designation}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.role}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.action}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p style={{ textAlign: 'center' }}>No Employees data available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}



export default AllUser
