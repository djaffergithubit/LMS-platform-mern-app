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
import './index.css';
import useAuth from './hooks/useAuth';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectToken);
  useAuth(); 

  return token ? children : <Navigate to="/log-in" />;
};

const App = () => {
  const token = useSelector(selectToken);

  const router = createBrowserRouter([
    {
      element: <Layout token={token} />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/courses",
          element: (
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          ),
        },
        {
          path: "/courses/:courseId",
          element: <SingleCourse />, // No token check, can be accessed publicly
        },
        {
          path: "/user-account/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-account/teacher",
          element: (
            <ProtectedRoute>
              <Teacher />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-account/teacher/new-course",
          element: (
            <ProtectedRoute>
              <CreateTitleCourse />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-account/teacher/new-course/:courseId",
          element: (
            <ProtectedRoute>
              <CourseSetup />
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-account/teacher/single-chapter/:chapterId",
          element: (
            <ProtectedRoute>
              <ChapterSetup />
            </ProtectedRoute>
          ),
        },

        {
          path: '/404',
          element: <NotFoundPage />
        },

        {
          path: "*",
          element: <Navigate to="/404" />,
        }
      ],
    },
    {
      path: "/log-in",
      element: !token ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: "/sign-up",
      element: !token ? <SignInPage /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
