import React from 'react';
import { useSelector } from 'react-redux';
import MovieGrid from './body/MovieGrid';

//current url: '/rated'
//tells the MovieGrid to display rated movies
const Rated = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <>
      {Object.keys(userData).length === 0 ? (
        <div>Error: you must log in.</div>
      ) : (
        <MovieGrid pageName={'rated'} />
      )}
    </>
  );
};

export default Rated;
