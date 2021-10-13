import React from 'react';
import { Button } from 'antd';

//Login button that redirects user to '/login'
//Login process is handled by the LoginPage component
const LoginButton = (props) => {
  return (
    <Button type={props.type} size={props.size} block>
      LOG IN
    </Button>
  );
};

export default LoginButton;
