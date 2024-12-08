import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifyError, notifySuccess, notifyWarn } from '../Utils/Toasts';
import Loading from '../Utils/Loading';
import { allAPIs } from '../Utils/allAPIs';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      notifyWarn('Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      notifyWarn('Please enter a valid email address');
      return;
    }
    if (!validatePhone(phone)) {
      notifyWarn('Please enter a valid 10-digit Phone number');
      return;
    }
    if (password !== confirmPassword) {
      notifyWarn('Passwords do not match');
      return;
    }
    
    const payload = { name, email, phone, password };

    setLoading(true);

    try {
      const response = await allAPIs.signUp(payload);
      if (response.status === 201) {
        notifySuccess('Account created successfully!');
        navigate('/signin'); 
      } else {
        notifyError('Unexpected response from the server.');
      }
    } catch (error) {
      notifyError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full h-full rounded-lg shadow-lg">
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
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2 p-8">
              {loading && <Loading />}
              <div className="w-full">
                <label htmlFor="fullname" className="block text-left text-neutral-700">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block text-left text-neutral-700">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="block text-left text-neutral-700">Phone No.</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <div className="w-full">
                <label htmlFor="confirmPassword" className="block text-left text-neutral-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue"
              >
                Sign Up
              </button>
            </form>
            <p className="mb-1">
              Already have an account?{' '}
              <Link to="/signin" className="text-custom-blue">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
