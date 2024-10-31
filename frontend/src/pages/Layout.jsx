import React from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ token }) => {
  const courseMatch = useMatch('/courses/:courseId');

  return (
    <div>
      {!courseMatch && token && <Navbar />}
      <Outlet />
      {!courseMatch && token && <Footer />}
    </div>
  );
};

export default Layout;
