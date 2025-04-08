import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginSignup = ({ onLoginSuccess }) => {
const [formData, setFormData] = useState({
email: '',
password: '',
name: ''
});
const [isLogin, setIsLogin] = useState(true);
const [error, setError] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [users, setUsers] = useState([]);
const [showPassword, setShowPassword] = useState(false);

// Load users from localStorage on component mount
useEffect(() => {
const storedUsers = localStorage.getItem('users');
if (storedUsers) {
setUsers(JSON.parse(storedUsers));
}
}, []);

// Save users to localStorage whenever it changes
useEffect(() => {
localStorage.setItem('users', JSON.stringify(users));
}, [users]);

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({
...prev,
[name]: value
}));
};

const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};

const validateForm = () => {
if (!formData.email || !formData.password) {
setError('Email and password are required');
return false;
}

if (!isLogin && !formData.name) {
setError('Name is required for signup');
return false;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
setError('Please enter a valid email address');
return false;
}

if (formData.password.length < 6) {
setError('Password must be at least 6 characters');
return false;
}

return true;
};

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

if (!validateForm()) return;

setIsSubmitting(true);

try {
if (isLogin) {
// Check against registered users
const user = users.find(u =>
u.email === formData.email &&
u.password === formData.password
);

if (user) {
toast.success('Login successful!');
onLoginSuccess(user.name);
} else {
setError('Invalid credentials');
toast.error('Invalid email or password');
}
} else {
// Check if email already exists
const emailExists = users.some(user => user.email === formData.email);
if (emailExists) {
setError('Email already registered');
toast.warning('This email is already registered');
return;
}

// Register new user
const newUser = {
name: formData.name,
email: formData.email,
password: formData.password
};

setUsers(prev => [...prev, newUser]);
toast.success('Account created successfully! Please login with your credentials');

// Reset form and switch to login
setFormData({
email: formData.email, // Keep email filled for convenience
password: '',
name: ''
});
setIsLogin(true);
}
} catch (err) {
setError('An unexpected error occurred. Please try again.');
toast.error('An error occurred. Please try again.');
console.error('Authentication error:', err);
} finally {
setIsSubmitting(false);
}
};

const toggleAuthMode = () => {
setIsLogin(!isLogin);
setError('');
setFormData(prev => ({
...prev,
password: '', // Clear password when switching modes
name: !isLogin ? '' : prev.name // Clear name only when switching to login
}));
};

return (
<>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<div
className="fixed inset-0 bg-gradient-to-r from-[#0a3c20] via-[#0a632b] to-[#0a3c20] opacity-95 flex justify-center items-center z-50 p-4"
role="dialog"
aria-modal="true"
aria-labelledby="auth-modal-title"
>
<div className="bg-gray-100 p-8 rounded-xl shadow-md w-full max-w-md font-poppins">
      <h2 id="auth-modal-title" className="text-2xl mb-6 text-center text-gray-800 font-semibold">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 pr-10"
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              minLength="6"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters.
          </p>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            isLogin ? 'Log In' : 'Sign Up'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <button
          onClick={toggleAuthMode}
          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
          aria-label={isLogin ? 'Switch to sign up' : 'Switch to log in'}
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
</div>
</>
);
};

export default LoginSignup;
