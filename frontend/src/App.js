// App.js

import { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainerStyled } from './Utils/Toasts';
import { AuthProvider, useAuth } from './Utils/AuthContext';

const Loading = lazy(() => import('./Utils/Loading'));
const Header = lazy(() => import('./Components/Header'));
const Main = lazy(() => import('./Components/Main'));
const SignIn = lazy(() => import('./Components/SignIn'));
const SignUp = lazy(() => import('./Components/SignUp'));

const App = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const testCors = async () => {
      try {
        const response = await fetch(
          'https://www.api-dev.recordent.com/RecordentSummary?reqData=ch1buu5RqawVS3c8ckSuS2uRx2fbV3k0xBs1VxBX3PE%253D',
          {
            method: 'GET',
            credentials: 'include'
          }
        );

        console.log('API STATUS:', response.status);
        console.log('CORS Allowed ✅');

        const data = await response.json();
        console.log('API RESPONSE:', data);

      } catch (error) {
        console.error('CORS Blocked ❌');
        console.error(error);
      }
    };

    testCors();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <ToastContainerStyled />

      <Routes>
        <Route path="/" element={auth ? <Main /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!auth ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};

const WrappedApp = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default WrappedApp;
