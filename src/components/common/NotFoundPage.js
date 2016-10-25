import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div>
      <h4>
        404 Page Not Found, Human
      </h4>
      <img src={require("../../../assets/images/daleks.png")} alt="Exterminate..." />
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;