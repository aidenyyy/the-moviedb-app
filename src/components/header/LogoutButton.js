import React from 'react';
import { Popconfirm, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUserAction,
  setFavoriteMoviesAction,
  setRatedMoviesAction,
} from '../../state/actionCreators/actions';
import { logOut } from '../../api';

//Logout component that handles logout operation, redirect user back to '/' after completion.
const LogoutButton = (props) => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const clearUser = () => {
    dispatch(setUserAction({}));
  };

  const clearFavoriteMovies = () => {
    dispatch(setFavoriteMoviesAction({}));
  };

  const clearRatedMovies = () => {
    dispatch(setRatedMoviesAction({}));
  };

  const logout = async () => {
    const result = await logOut(userData.session_id);
    if (result.success) {
      localStorage.removeItem('user');
      message.success('Logged out', 2);
    } else {
      message.error('Oops, something went wrong', 2);
    }
    clearUser();
    clearFavoriteMovies();
    clearRatedMovies();
  };

  return (
    <Popconfirm title='Logout' onConfirm={logout} okText='Yes' cancelText='No'>
      <Button type={props.type} size={props.size} block>
        {props.username}
      </Button>
    </Popconfirm>
  );
};

export default LogoutButton;
