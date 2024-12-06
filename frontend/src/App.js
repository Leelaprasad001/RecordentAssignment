import { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainerStyled } from "./Utils/Toasts";

const Loading = lazy(() => import("./Utils/Loading"));
const Header = lazy(() => import("./Components/Header"));
const Main = lazy(() => import("./Components/Main"));
const SignIn = lazy(() => import("./Components/SignIn"));
const SignUp = lazy(() => import("./Components/SignUp"));

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Header />
        <ToastContainerStyled />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />       
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;