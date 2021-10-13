import React from 'react';
import {
  requestToken,
  validate,
  getSessionId,
  getAccountDetails,
  fetchFavoriteMovies,
  fetchRatedMovies,
} from '../../api';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setUserAction,
  setLoadingAction,
  setFavoriteMoviesAction,
  setRatedMoviesAction,
} from '../../state/actionCreators/actions';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//The LoginPage handles log in operation
const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (username, password) => {
    const setUser = (userData) => {
      dispatch(setUserAction(userData));
    };

    const setLoading = (loading) => {
      dispatch(setLoadingAction(loading));
    };

    const setFavoriteMovies = (movies) => {
      dispatch(setFavoriteMoviesAction(movies));
    };

    const setRatedMovies = (movies) => {
      dispatch(setRatedMoviesAction(movies));
    };

    try {
      setLoading(true);
      const request_token = (await requestToken()).request_token;
      const validateResult = await validate(username, password, request_token);
      if (validateResult.success) {
        history.push('/');
        const session_id = (await getSessionId(request_token)).session_id;
        const account_details = await getAccountDetails(session_id);
        message.success(`Welcome back, ${account_details.username}`, 2);

        const userData = {
          username: account_details.username,
          id: account_details.id,
          session_id: session_id,
          request_token: request_token,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        const favoriteData = await fetchFavoriteMovies(
          account_details.id,
          session_id
        );
        setFavoriteMovies(favoriteData.results);
        const ratedData = await fetchRatedMovies(
          account_details.id,
          session_id
        );
        setRatedMovies(ratedData.results);
      } else {
        message.error(validateResult.status_message, 2);
      }
      setLoading(false);
    } catch (e) {
      message.error('Oops, something went wrong', 2);
      setLoading(false);
      throw e;
    }
  };

  const onFinish = async (values) => {
    await login(values.username, values.password);
  };

  const renderLogin = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Form
          style={{
            margin: '0',
            position: 'relative',
            top: '20%',
          }}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return <>{renderLogin()}</>;
};

export default LoginPage;
