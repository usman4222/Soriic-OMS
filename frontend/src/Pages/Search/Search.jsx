import React, { Fragment, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './Search.css';
import { useNavigate } from 'react-router-dom';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    let history = []

    if (keyword.trim()) {
      history.push(`/allrevenue/${keyword}`);
      navigate(`/allrevenue/${keyword}`)
    } else {
      navigate("/allrevenue");
    }
  };

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search a Product...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type='submit' value='Search' />
      </form>
    </Fragment>
  );
};

export default Search;
