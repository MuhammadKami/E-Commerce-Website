import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(signupUser({ name, email, password }));
    }
  };

  useEffect(() => {
    // Redirect to home if user is logged in
    if (user && localStorage.getItem("token")) {
      navigate("/");
    }
  }, [user, navigate]);

    return (
        <div className="min-h-screen flex">
          {/* Left Section - Image */}
          <div className="w-1/2 bg-blue-100 flex items-center justify-center">
            <img
              src="./k.png"
              alt="Shopping illustration"
              className="max-w-full h-auto"
            />
          </div>
      
          {/* Right Section - Auth Form */}
          <div className="w-1/2 flex items-center justify-center bg-white">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-8">
              <h2 className="text-3xl font-lighter mb-6 ">{isLogin ? 'Login in to Exclusive' : 'Create an account'}</h2>
      
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 mb-4 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
      
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="w-full p-2 mb-4 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
      
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
      
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : isLogin ? 'Login ' : 'Create Account'}
              </button>
      
              <div className="my-4 text-center text-gray-500">or</div>
      
              <button className="w-full border py-2 flex items-center justify-center rounded hover:bg-gray-100">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
      
              <p className="text-sm text-center mt-4">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </form>
          </div>
        </div>
      );
};

export default Auth;
