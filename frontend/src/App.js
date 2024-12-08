import { Suspense, lazy } from 'react';
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
