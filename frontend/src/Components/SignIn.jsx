import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifyError, notifySuccess, notifyWarn } from '../Utils/Toasts';
import Loading from '../Utils/Loading';
import { allAPIs } from '../Utils/allAPIs';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/AuthContext';

const SignIn = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmailOrMobile = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    return emailRegex.test(input) || mobileRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrMobile || !password) {
      notifyWarn('Please fill in all fields');
      return;
    }
    if (!validateEmailOrMobile(emailOrMobile)) {
      notifyWarn('Please enter a valid email or 10-digit mobile number');
      return;
    }
    const payload = {
      identifier: emailOrMobile,
      password: password,
    };

    setLoading(true);

    try {
      const response = await allAPIs.signIn(payload);
      if (response.status === 200) {
        login(response.data.token);
        notifySuccess('Logged in successfully!');
        navigate('/'); 
      } else {
        notifyError('Unexpected response from the server.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notifyError('Invalid credentials. Please try again.');
      } else {
        notifyError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full h-[91vh] rounded-lg shadow-lg">
        <div className="hidden md:grid grid-rows-3 grid-cols-3 gap-10 w-full px-20 py-16 bg-cover bg-center" style={{ backgroundImage: 'url(./banner.png)' }}>
          <div className="flex flex-col bg-neutral-100 w-full rounded-lg shadow-lg text-center relative col-start-3 row-start-1">
            <Eye size={34} className="bg-yellow-300 rounded-full p-2 absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-20" />
            <h2 className="text-lg font-semibold p-4 bg-custom-blue text-neutral-100 rounded-bl-3xl rounded-br-3xl">
              Businesses on the <br /> Platform
            </h2>
            <span className="text-lg font-bold m-4">84,160</span>
          </div>
          <div className="flex flex-col bg-neutral-100 w-full rounded-lg shadow-lg text-center relative col-start-2 row-start-2">
            <Eye size={34} className="bg-yellow-300 rounded-full p-2 absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-20" />
            <h2 className="text-lg font-semibold p-4 bg-custom-lightblue text-neutral-100 rounded-bl-3xl rounded-br-3xl">
              Number of <br /> Invoices
            </h2>
            <span className="text-lg font-bold m-4">10,55,255</span>
          </div>
          <div className="flex flex-col bg-neutral-100 w-full rounded-lg shadow-lg text-center relative col-start-1 row-start-3">
            <Eye size={34} className="bg-yellow-300 rounded-full p-2 absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-20" />
            <h2 className="text-lg font-semibold p-4 bg-custom-lightblue text-neutral-100 rounded-bl-3xl rounded-br-3xl">
              Value of <br /> Invoices
            </h2>
            <span className="text-lg font-bold m-4">6,155 Cr</span>
          </div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center space-y-4">
          <div className="rounded-lg shadow-lg overflow-hidden text-center w-full md:w-[30vw]">
            <h2 className="text-lg font-semibold mb-4 p-2 bg-custom-blue text-neutral-100">
              Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 p-8">
              {loading && <Loading />}
              <div className="w-full">
                <label htmlFor="emailOrMobile" className="block text-left text-neutral-700">Email/Mobile</label>
                <input
                  type="text"
                  id="emailOrMobile"
                  placeholder="Email/Mobile"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  required
                />
              </div>
              <div className="w-full relative">
                <label htmlFor="password" className="block text-left text-neutral-700">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <button
                type="submit"
                className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue"
              >
                Sign In
              </button>
            </form>
            <p className="m-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-custom-blue">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
