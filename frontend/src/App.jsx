// import React, { useEffect } from 'react'
// import { createBrowserRouter, Navigate, RouterProvider, useMatch } from 'react-router-dom'
// import Home from './pages/Home.jsx'
// import Navbar from './components/Navbar.jsx'
// import Courses from './pages/Courses.jsx'
// import SingleCourse from './pages/SingleCourse.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import Footer from './components/Footer.jsx'
// import Teacher from './pages/Teacher/Teacher.jsx'
// import CreateTitleCourse from './pages/Teacher/CreateTitleCourse.jsx'
// import CourseSetup from './pages/Teacher/CourseSetup.jsx'
// import SignInPage from './pages/SignInPage.jsx'
// import ChapterSetup from './pages/Teacher/ChapterSetup.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import { useSelector } from 'react-redux'
// import { selectToken } from './states/authTokenSlice.js'

// const App = () => {
//     const token = useSelector(selectToken);
//     const courseMatch = useMatch('/courses/:courseId')
//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: token ? <Home /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/courses",
//         element: token ? <Courses /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/sign-in",
//         element: !token ? <SignInPage /> : <Navigate to='/' />,
//       },
//       {
//         path: "/log-in",
//         element: !token ? <LoginPage /> : <Navigate to='/' />,
//       },
//       {
//         path: "/courses/:courseId",
//         element: <SingleCourse />
//       },
//       {
//         path: "/user-account/dashboard",
//         element: token ? <Dashboard /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/user-account/teacher",
//         element: token ? <Teacher /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/user-account/teacher/new-course",
//         element: token ? <CreateTitleCourse /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/user-account/teacher/new-course/:courseId",
//         element: token ? <CourseSetup /> : <Navigate to='/log-in' />,
//       },
//       {
//         path: "/user-account/teacher/single-chapter/:chapterId",
//         element: token ? <ChapterSetup /> : <Navigate to='/log-in' />,
//       },
//     ]);
  
//     // get the current path
//     const currentPath = window.location.pathname;
//     console.log(currentPath);
  
//     return (
//       <div className=' bg-white'>
//         {!courseMatch && token  && <Navbar />}
//         <RouterProvider router={router} />
//         {!courseMatch && token && <Footer />}
//       </div>
//     );
//   }

//   export default App


import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Courses from './pages/Courses';
import SingleCourse from './pages/SingleCourse';
import Dashboard from './pages/Dashboard';
import Teacher from './pages/Teacher/Teacher';
import CreateTitleCourse from './pages/Teacher/CreateTitleCourse';
import CourseSetup from './pages/Teacher/CourseSetup';
import SignInPage from './pages/SignInPage';
import ChapterSetup from './pages/Teacher/ChapterSetup';
import LoginPage from './pages/LoginPage';
import { selectToken } from './states/authTokenSlice';
import Layout from './pages/Layout';

const App = () => {
  const token = useSelector(selectToken);

  const router = createBrowserRouter([
    {
      element: <Layout token={token} />, // Use Layout for routes with Navbar/Footer
      children: [
        {
          path: "/",
          element: token ? <Home /> : <Navigate to='/log-in' />,
        },
        {
          path: "/courses",
          element: token ? <Courses /> : <Navigate to='/log-in' />,
        },
        {
          path: "/courses/:courseId",
          element: <SingleCourse />
        },
        {
          path: "/user-account/dashboard",
          element: token ? <Dashboard /> : <Navigate to='/log-in' />,
        },
        {
          path: "/user-account/teacher",
          element: token ? <Teacher /> : <Navigate to='/log-in' />,
        },
        {
          path: "/user-account/teacher/new-course",
          element: token ? <CreateTitleCourse /> : <Navigate to='/log-in' />,
        },
        {
          path: "/user-account/teacher/new-course/:courseId",
          element: token ? <CourseSetup /> : <Navigate to='/log-in' />,
        },
        {
          path: "/user-account/teacher/single-chapter/:chapterId",
          element: token ? <ChapterSetup /> : <Navigate to='/log-in' />,
        },
      ]
    },
    {
      path: "/sign-in",
      element: !token ? <SignInPage /> : <Navigate to='/' />,
    },
    {
      path: "/log-in",
      element: !token ? <LoginPage /> : <Navigate to='/' />,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
