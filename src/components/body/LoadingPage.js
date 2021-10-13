import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

//Loading page component, rendered by the App component when logging in.
//After routed back to '/', if the loading state is set to true, route '/' will load
//this page instead of the Home component.
const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingOutlined
        style={{ marginTop: '20rem', fontSize: '5rem', color: '#0086f9' }}
      />
    </div>
  );
};

export default LoadingPage;
