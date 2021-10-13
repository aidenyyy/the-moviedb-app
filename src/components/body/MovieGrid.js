import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../state/actionCreators/actions';

import { List } from 'antd';

import MovieCard from './MovieCard';
import GridHeader from './GridHeader';
import * as api from '../../api';

//The MovieGrid component contains all MovieCard component of a page.
//Responsible for rendering movie page depends on user's current route.
//Shared across the home, favorite, and rated pages.
const MovieGrid = (props) => {
  const sortMethod = useSelector((state) => state.sortMethod);
  const page = useSelector((state) => state.page);
  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.liked);
  const ratedMovies = useSelector((state) => state.rated);

  const dispatch = useDispatch();

  const setMovies = (movies) => {
    dispatch(actions.setMoviesAction(movies));
  };

  const setPageTotal = (pageTotal) => {
    dispatch(actions.setPageTotal(pageTotal));
  };

  //Rerender the home page on sortMethod or page change with cache to local storage.
  useEffect(async () => {
    const key = sortMethod + page;
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setMovies(data.results);
      setPageTotal(data.total_pages);
    } else {
      const data = await api.fetchMovies(sortMethod, page);
      localStorage.setItem(key, JSON.stringify(data));
      setMovies(data.results);
      setPageTotal(data.total_pages);
    }
  }, [sortMethod, page]);

  return (
    <div style={{ margin: '20px' }}>
      <List
        header={props.pageName === 'home' ? <GridHeader {...props} /> : <></>}
        size='large'
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
          justify: 'center',
        }}
        dataSource={
          props.pageName === 'favorite'
            ? favoriteMovies
            : props.pageName === 'rated'
            ? ratedMovies
            : movies
        }
        renderItem={(movie) => (
          <List.Item>
            <MovieCard key={movie.id} movie={movie} {...props} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MovieGrid;
