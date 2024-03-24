import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getAllUsers, clearErrors } from '../../actions/addUserAction';
import { deleteUser } from '../../actions/deleteUser';
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';
import Loader from '../../components/Loader/Loader';

const Attendance = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, users } = useSelector((state) => state.allUser);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(getAllUsers(keyword));
  }, [error, dispatch, enqueueSnackbar, keyword]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      setKeyword(`/attendance/${keyword}`);
    } else {
      navigate("/attendance");
    }
  };

  const columns = [
    {
      field: "index",
      headerName: "Index",
      minWidth: 10,
      flex: 0.4,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 10,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 10,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: 'Attendance',
      headerName: 'Employee Attendance',
      minWidth: 10,
      flex: 0.6,
      renderCell: (params) => (
        <Link to={`/attendance/${params.getValue(params.id, "id")}`}>
          <button
            variant="contained"
            style={{
              backgroundColor: '#344854',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              transition: 'background-color 0.3s ease',
              marginTop: '-20px',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            }}
          >
            Mark Attendance
          </button>
        </Link>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/attendance/view/${params.getValue(params.id, "id")}`}>
          <button
            variant="contained"
            className='att-btn'
            style={{
              backgroundColor: '#344854',
              color: '#ffffff',
              padding: '10px ',
              borderRadius: '5px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              transition: 'background-color 0.3s ease',
              marginTop: '-20px',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            }}
          >
            View Attendance
          </button>
        </Link>
      ),
    },
  ];

  const rows = users.map((item, index) => ({
    id: item._id,
    index: index + 1,
    name: item.name,
    role: item.role,
    designation: item.designation,
  }));

  return (
    <Fragment>
        <div className='main'>
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
              <div className='dashboard'>
                <div className='productsListContainer'>
                  <h1 className='productListHeading'>Employee Attendance</h1>
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
                    <table className='table'>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center', paddingLeft: 30 }}>Index</th>
                          <th style={{ textAlign: 'center' }}>Name</th>
                          <th style={{ textAlign: 'center' }}>Designation</th>
                          <th style={{ textAlign: 'center' }}>Role</th>
                          <th style={{ textAlign: 'center' }}>Attendance</th>
                          <th style={{ textAlign: 'center' }}>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((item, index) => (
                          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                            <td style={{ textAlign: 'center' }}>{item.index}</td>
                            <td style={{ textAlign: 'center' }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>{item.designation}</td>
                            <td style={{ textAlign: 'center' }}>{item.role}</td>
                            <td style={{ textAlign: 'center' }}>
                              <Link to={`/attendance/${item.id}`}>
                                <button
                                  variant="contained"
                                  style={{
                                    backgroundColor: '#344854',
                                    color: '#ffffff',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  Mark Attendance
                                </button>
                              </Link>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <Link to={`/attendance/view/${item.id}`}>
                                <button
                                  variant="contained"
                                  className='att-btn'
                                  style={{
                                    backgroundColor: '#344854',
                                    color: '#ffffff',
                                    padding: '10px ',
                                    borderRadius: '5px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  View Attendance
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ textAlign: 'center' }}>No Attendance data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default Attendance;
