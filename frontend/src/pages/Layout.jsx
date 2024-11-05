import React from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ token }) => {
  
  const courseMatch = useMatch('/courses/:courseId');
  const currentPath = useLocation().pathname;

  return (
    <div>
      {!courseMatch && token && currentPath !== '/404' && <Navbar />}
      <Outlet />
      {!courseMatch && token && currentPath !== '/404' && <Footer />}
    </div>
  );
};

export default Layout;
