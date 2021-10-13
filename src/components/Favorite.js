import React from 'react';
import { useSelector } from 'react-redux';
import MovieGrid from './body/MovieGrid';

//current url: '/favorite'
//tells the MovieGrid to display favorite movies
const Favorite = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <>
      {Object.keys(userData).length === 0 ? (
        <div>Error: you must log in.</div>
      ) : (
        <MovieGrid pageName={'favorite'} />
      )}
    </>
  );
};

export default Favorite;
