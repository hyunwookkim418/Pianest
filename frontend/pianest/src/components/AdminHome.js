import React from 'react';
import { Link } from 'react-router-dom';


const AdminHomePage = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="main-content">
        <div className="content-center">
          <h1>Welcome, Admin!</h1>
          <p>This is the Admin Home Page. You can manage events, users, etc. from here.</p>
        </div>
      </div>


      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/events">Events</Link>
          </li>
          {/* Add more sidebar links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminHomePage;
