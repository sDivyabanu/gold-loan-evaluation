import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go to Home</a>
    </div>
  );
}

export default NotFound;
