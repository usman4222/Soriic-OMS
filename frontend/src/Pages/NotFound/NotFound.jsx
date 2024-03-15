import React, { Fragment } from 'react'
import { MdDashboard } from "react-icons/md";
import { Link } from 'react-router-dom'
import './NotFound.css'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader';
import { MdError } from "react-icons/md";


const NotFound = () => {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);


  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div className='pageNotFound'>
          {isAuthenticated ? <MdDashboard /> : <MdError />}
          {isAuthenticated ? <h2>Wellcome to DashBoard</h2> : <h2>Page Not Found</h2>}
          {isAuthenticated ? <Link to='/'>DashBoard</Link> : <Link to='/login'>DashBoard</Link>}
        </div>
      )}
    </Fragment>
  )
}

export default NotFound
