import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteMoviesAction } from '../../state/actionCreators/actions';
import { Card, Row, Col, message } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { fetchFavoriteMovies, getPoster, setFavorite } from '../../api';

//Movie card components are responsible for rendering each card,
//as well as their title (redirect user to /movie/:movieId),
//and handling like.
const MovieCard = (props) => {
  const movie = props.movie;
  const likedMovies = useSelector((state) => state.liked);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const { Meta } = Card;

  //Rating display
  const Rating = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StarFilled
          style={{ color: '#f7bd35', alignSelf: 'center', fontSize: '20px' }}
        />
        {props.pageName === 'rated' ? (
          <>
            {movie.vote_average}/{movie.rating}
          </>
        ) : (
          <>{movie.vote_average}</>
        )}
      </div>
    );
  };
  //Finish
  //Rating feature implemented in /movie/Movie.js

  //Handle click like button
  const setFavoriteMovies = (movies) => {
    dispatch(setFavoriteMoviesAction(movies));
  };

  const handleLike = async (like) => {
    const result = await setFavorite(
      movie,
      userData.id,
      userData.session_id,
      like
    );
    if (result.success) {
      message.success('Liked success', 2);
      const data = await fetchFavoriteMovies(userData.id, userData.session_id);
      setFavoriteMovies(data.results);
    } else {
      message.error('Oops, something went wrong', 2);
    }
  };
  //Finish

  //Like button
  const Favorite = () => {
    if (Object.keys(userData).length > 0) {
      if (
        likedMovies.some((likedMovie) => {
          return likedMovie.id === movie.id;
        })
      ) {
        return (
          <HeartFilled
            style={{ color: '#ff0016', fontSize: '20px' }}
            onClick={() => {
              handleLike(false);
            }}
          />
        );
      } else {
        return (
          <HeartOutlined
            style={{ fontSize: '20px' }}
            onClick={() => {
              handleLike(true);
            }}
          />
        );
      }
    } else {
      return <HeartOutlined style={{ fontSize: '20px' }} />;
    }
  };
  //Finish

  //Wraping rating and like icons
  const CardDescription = () => {
    return (
      <Row justify='center'>
        <Col span={4}>
          <Rating />
        </Col>
        <Col span={16} />
        <Col span={4} style={{ textAlign: 'center' }}>
          <Favorite />
        </Col>
      </Row>
    );
  };
  //Finish

  return (
    <Card
      hoverable
      style={{ width: 360 }}
      cover={<img src={getPoster(movie)} alt='' />}
    >
      <Meta
        title={
          <Link to={`/movies/${movie.id}`}>
            <p style={{ textAlign: 'center', margin: '0', color: 'black' }}>
              {movie.title}
            </p>
          </Link>
        }
        description={CardDescription()}
      />
    </Card>
  );
};

export default MovieCard;
