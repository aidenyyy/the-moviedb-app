import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie, getPoster, rateMovie, fetchRatedMovies } from '../../api';
import { setRatedMoviesAction } from '../../state/actionCreators/actions';
import { Row, Col, Button, Select, Card, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { POSTER_URL } from '../../config';

//Movie detail page
//Responsible for rendering movie detail, as well as the rating operation
const Movie = () => {
  const movieId = useParams().movieId;

  const userData = useSelector((state) => state.userData);
  const ratedMovies = useSelector((state) => state.rated);

  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState('');
  const [inputRating, setInputRating] = useState('');
  const [currentRating, setCurrentRating] = useState('Not rated yet');
  const [companies, setCompanies] = useState([]);

  const dispatch = useDispatch();

  //Get current rating by comparing current movie that's being displayed with our
  //ratedMovies in our redux global state, set the rating to currentRating in our local state
  //if the movie exists in ratedMovies.
  //ratedMovies are fetched from theMovieDB api, this is a feature only allowed while logged in.
  const getCurrentRating = (movie) => {
    const findResult = ratedMovies.filter((ratedMovie) => {
      return ratedMovie.id === movie.id;
    });
    if (findResult.length > 0) {
      return findResult[0].rating;
    } else {
      return 'Not rated yet';
    }
  };
  //Finish

  //This is equivalent to componentDidMount, because this component is depended on the fetched
  //movie detail from theMovieDB api, instead of passing [] as the second argument, we need to pass
  //the actual movieId from '/movies/:movieId'
  useEffect(() => {
    fetchMovie(movieId).then((movie) => {
      setMovie(movie);
      setGenres(movie.genres);
      setPoster(getPoster(movie));
      setCompanies(movie.production_companies);
      if (Object.keys(userData).length > 0) {
        setCurrentRating(getCurrentRating(movie));
      }
    });
    //Simulating componentWillUnmount. Once the user is going to other pages, we update our ratedMovies
    //so that user will see updated ratings with no delay
    return async () => {
      const data = await fetchRatedMovies(userData.id, userData.session_id);
      setRatedMovies(data.results);
    };
  }, [movieId]);
  //Finish

  //Genre
  const Genre = () => {
    return (
      <Row justify='start' style={{ marginBottom: '0.5em' }}>
        {genres.map((genre) => {
          return (
            <Col
              key={genre.id}
              style={{ marginRight: '5px', marginBottom: '2px' }}
            >
              <Button type='primary' shape='round' size='small'>
                {genre.name}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };
  //Finish

  //Displaying vote_average
  const Rating = () => {
    return (
      <div style={{ display: 'flex', marginBottom: '0.5em' }}>
        <StarFilled
          style={{
            color: '#f7bd35',
            alignSelf: 'center',
            fontSize: '20px',
          }}
        />
        {movie.vote_average}
      </div>
    );
  };
  //Finish

  //Handling rating operation

  //Only displayed while user is logged in

  //When user select a rating and click the submit button, the selected value is set to the local state
  //and post to the api at the same time, the reason for using this double-state method is because
  //the ratedMovies in our global state will not get updated in process time, so that it is best to
  //keep a local state that is not asynchronous
  const setRatedMovies = (movies) => {
    dispatch(setRatedMoviesAction(movies));
  };

  const handleRating = async (rating) => {
    const result = await rateMovie(movie, userData.session_id, rating);
    if (result.success) {
      message.success('Rating success', 2);
      const data = await fetchRatedMovies(userData.id, userData.session_id);
      setRatedMovies(data.results);
      setCurrentRating(rating);
    } else {
      message.error('Oops, something went wrong', 2);
    }
  };

  const { Option } = Select;
  const YourRating = () => {
    return (
      <div>
        <p style={{ marginLeft: '1rem' }}>{currentRating}</p>
        <div style={{ display: 'flex', marginBottom: '0.5em' }}>
          <Select
            defaultValue={inputRating}
            style={{ width: '70px', textAlign: 'center' }}
            onChange={(e) => {
              setInputRating(e);
            }}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
            <Option value={6}>6</Option>
            <Option value={7}>7</Option>
            <Option value={8}>8</Option>
            <Option value={9}>9</Option>
            <Option value={10}>10</Option>
          </Select>
          <Button
            onClick={() => {
              inputRating
                ? handleRating(inputRating)
                : message.info('Select a rating', 2);
            }}
          >
            RATE IT
          </Button>
        </div>
      </div>
    );
  };
  //Finish

  //Production companies
  const ProductionCompanies = () => {
    return (
      <Row justify='start' gutter={16}>
        {companies.map((company) => {
          return (
            <Col span={4} key={company.id}>
              <Card
                size='small'
                hoverable={false}
                bodyStyle={{ padding: '0' }}
                style={{ width: '100%' }}
                cover={
                  <img
                    src={`${POSTER_URL}${company.logo_path}`}
                    alt=''
                    height='100%'
                  />
                }
              />
              <Card.Meta description={company.name} />
            </Col>
          );
        })}
      </Row>
    );
  };
  //Finish

  return (
    <div style={{ display: 'flex', margin: '50px', justifyContent: 'center' }}>
      <img src={poster} style={{ margin: '10px' }} />
      <div style={{ margin: '10px', width: '480px' }}>
        <h1>{movie.title}</h1>
        <h2>Release date:</h2>
        <h3>{movie.release_date}</h3>
        <h2>Overview:</h2>
        <h3>{movie.overview}</h3>
        <h2>Genres:</h2>
        <Genre />
        <h2>Average Rating:</h2>
        <Rating />
        {Object.keys(userData).length > 0 ? (
          <>
            <h2>Your Rating:</h2>
            <YourRating />
          </>
        ) : (
          <></>
        )}
        <h2>Production Companies:</h2>
        <ProductionCompanies />
      </div>
    </div>
  );
};

export default Movie;
