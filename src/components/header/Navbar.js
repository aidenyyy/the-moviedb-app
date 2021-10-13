import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

//The navbar contains 4 elements:
//the Logo, HOME button, FAVORITE button, RATED button on the left,
//the LOG IN button on the right.
//The HOME, FAVORITE, RATED button redirects user to corresponding routes,
//and the MovieGrid renders movies depending on the routes.
const Navbar = () => {
  const userData = useSelector((state) => state.userData);
  const size = 'large';

  return (
    <div className='navBar' style={{ backgroundColor: '#1890ff' }}>
      <Row justify='start' align='middle'>
        <Col span={3}>
          <img
            className='logo'
            src='../../assets/logo.de1a664e.svg'
            style={{ height: '80px', margin: '10px' }}
          />
        </Col>
        <Col span={2}>
          <Link to='/'>
            <Button type='primary' size={size} block>
              HOME
            </Button>
          </Link>
        </Col>
        <Col span={2}>
          <Link
            to={Object.keys(userData).length === 0 ? '/login' : '/favorite'}
          >
            <Button type='primary' size={size} block>
              FAVORITE
            </Button>
          </Link>
        </Col>
        <Col span={2}>
          <Link to={Object.keys(userData).length === 0 ? '/login' : '/rated'}>
            <Button type='primary' size={size} block>
              RATED
            </Button>
          </Link>
        </Col>
        <Col span={13}></Col>
        <Col span={2}>
          <Link to={Object.keys(userData).length === 0 ? '/login' : '/'}>
            {Object.keys(userData).length === 0 ? (
              <LoginButton type='primary' size={size} />
            ) : (
              <LogoutButton
                type='primary'
                size={size}
                username={userData.username}
              />
            )}
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
