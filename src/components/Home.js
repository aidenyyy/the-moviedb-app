import React from 'react';

import MovieGrid from './body/MovieGrid';
import LoadingPage from './body/LoadingPage';

//current url: '/'
//tells the MovieGrid to display movies with specified page and sort method
//Also displays the LoadingPage after user logged in while the loading state is set to true
import { useSelector } from 'react-redux';

const Home = () => {
  const loading = useSelector((state) => state.loading);

  const renderHomeContent = () => {
    return loading ? <LoadingPage /> : <MovieGrid pageName='home' />;
  };

  return renderHomeContent();
};

export default Home;
