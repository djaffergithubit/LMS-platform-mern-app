import React from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ token }) => {
  // Use `useMatch` inside the router context to check for a specific path
  const courseMatch = useMatch('/courses/:courseId');

  return (
    <div>
      {/* Conditionally render Navbar based on the route */}
      {!courseMatch && token && <Navbar />}
      <Outlet />
      {!courseMatch && token && <Footer />}
    </div>
  );
};

export default Layout;
